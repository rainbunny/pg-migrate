/* eslint-disable no-console */

import {ExtendedPoolConfig, RxExtendedPoolClient, RxPool} from '@rainbunny/pg-extensions';
import fs from 'fs';
import {Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

const createMigrationTableQuery = `
  CREATE TABLE IF NOT EXISTS migration(
      id INT PRIMARY KEY,
      version VARCHAR(4000) NOT NULL,
      createdAt BIGINT NOT NULL DEFAULT(
          extract(
              epoch
              from now()
          ) * 1000
      ) 
  );
`;

const getLatestVersionQuery = `
  SELECT id, version
  FROM migration
  ORDER BY id DESC
  LIMIT 1;
`;

const insertVersionQuery = `
  INSERT INTO migration(id, version) VALUES(:id, :version);
`;

const deleteVersionQuery = `
  DELETE FROM migration WHERE version = :version;
`;

const performMigration = ({
  currentVersion,
  mode,
  targetVersion,
  client,
  migrationFolder,
}: {
  currentVersion: {
    id: number;
    version: string;
  };
  mode: string;
  targetVersion: string;
  client: RxExtendedPoolClient;
  migrationFolder: string;
}): Observable<void> => {
  const versionFilePaths = fs.readdirSync(`${migrationFolder}/${mode}`);
  if (targetVersion && !versionFilePaths.includes(`${targetVersion}.sql`)) {
    throw new Error(`Invalid target version: ${targetVersion}`);
  }
  let currentId = currentVersion ? currentVersion.id : -1;
  const currentVer = currentVersion?.version;
  const currentVersionIndex = versionFilePaths.indexOf(`${currentVer}.sql`);
  const targetVersionIndex = versionFilePaths.indexOf(`${targetVersion}.sql`);

  let executor = of(undefined as void);
  if (mode === 'up') {
    versionFilePaths
      .filter(
        (_versionFilePath, index) => index > currentVersionIndex && (!targetVersion || index <= targetVersionIndex),
      )
      .forEach((versionFilePath) => {
        executor = executor.pipe(
          tap(() => console.log(`Migrating up ${versionFilePath}...`)),
          switchMap(() =>
            client.executeQuery({queryText: fs.readFileSync(`${migrationFolder}/${mode}/${versionFilePath}`, 'utf8')}),
          ),
          switchMap(() => {
            currentId += 1;
            return client
              .executeQuery({
                queryText: insertVersionQuery,
                params: {id: currentId, version: versionFilePath.split('.')[0]},
              })
              .pipe(
                map(() => {
                  // do nothing
                }),
              );
          }),
        );
      });
    return executor;
  }

  if (!targetVersion) {
    throw new Error(`Target version is required!`);
  }

  versionFilePaths
    .filter((_versionFilePath, index) => (!targetVersion || index > targetVersionIndex) && index <= currentVersionIndex)
    .reverse()
    .forEach((versionFilePath) => {
      executor = executor.pipe(
        tap(() => console.log(`Migrating down ${versionFilePath}...`)),
        switchMap(() =>
          client.executeQuery({queryText: fs.readFileSync(`${migrationFolder}/${mode}/${versionFilePath}`, 'utf8')}),
        ),
        switchMap(() =>
          client
            .executeQuery({
              queryText: deleteVersionQuery,
              params: {version: versionFilePath.split('.')[0]},
            })
            .pipe(
              map(() => {
                // do nothing
              }),
            ),
        ),
      );
    });
  return executor;
};

export interface MigrateDatabaseParams {
  mode: 'up' | 'down';
  targetVersion?: string;
  migrationFolder: string;
  poolConfig: ExtendedPoolConfig;
}

export const migrateDatabase = (params: MigrateDatabaseParams): void => {
  const {mode, targetVersion, migrationFolder, poolConfig} = params;

  new RxPool(poolConfig)
    .executeTransaction((client) =>
      of({}).pipe(
        switchMap(() => client.executeQuery({queryText: createMigrationTableQuery})),
        switchMap(() => client.executeQuery({queryText: getLatestVersionQuery})),
        map((latestVersion: {id: number; version: string}[]) =>
          latestVersion.length === 0 ? undefined : latestVersion[0],
        ),
        switchMap((currentVersion) =>
          performMigration({
            mode,
            targetVersion,
            currentVersion,
            client,
            migrationFolder,
          }),
        ),
      ),
    )
    .subscribe({
      complete: () => {
        console.log('Migration completed.');
      },
      error: (e) => console.error(e),
    });
};
