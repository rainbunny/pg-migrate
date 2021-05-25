/* eslint-disable no-console */
import fs from 'fs';
import {Pool, PoolClient, PoolConfig, QueryResult} from 'pg';

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
  INSERT INTO migration(id, version) VALUES($1, $2);
`;

const deleteVersionQuery = `
  DELETE FROM migration WHERE version = $1;
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
  client: PoolClient;
  migrationFolder: string;
}): Promise<void> => {
  const versionFilePaths = fs.readdirSync(`${migrationFolder}/${mode}`);
  if (targetVersion && !versionFilePaths.includes(`${targetVersion}.sql`)) {
    return Promise.reject(new Error(`Invalid target version: ${targetVersion}`));
  }
  let currentId = currentVersion ? currentVersion.id : -1;
  const currentVer = currentVersion?.version;
  const currentVersionIndex = versionFilePaths.indexOf(`${currentVer}.sql`);
  const targetVersionIndex = versionFilePaths.indexOf(`${targetVersion}.sql`);

  let executor = Promise.resolve();
  if (mode === 'up') {
    versionFilePaths
      .filter((_versionFilePath, index) => {
        console.log(_versionFilePath, index, currentVersionIndex, targetVersion);
        return index > currentVersionIndex && (!targetVersion || index <= targetVersionIndex);
      })
      .forEach((versionFilePath) => {
        executor = executor
          .then(() => console.log(`Migrating up ${versionFilePath}...`))
          .then(() => client.query(fs.readFileSync(`${migrationFolder}/${mode}/${versionFilePath}`, 'utf8')))
          .then(() => {
            currentId += 1;
            return client.query(insertVersionQuery, [currentId, versionFilePath.split('.')[0]]);
          })
          .then(() => {
            // do nothing
          });
      });
    return executor;
  }

  console.log(targetVersion);
  if (!targetVersion) {
    return Promise.reject(new Error(`Target version is required!`));
  }

  versionFilePaths
    .filter((_versionFilePath, index) => (!targetVersion || index > targetVersionIndex) && index <= currentVersionIndex)
    .reverse()
    .forEach((versionFilePath) => {
      executor = executor
        .then(() => console.log(`Migrating down ${versionFilePath}...`))
        .then(() => client.query(fs.readFileSync(`${migrationFolder}/${mode}/${versionFilePath}`, 'utf8')))
        .then(() => client.query(deleteVersionQuery, [versionFilePath.split('.')[0]]))
        .then(() => {
          // do nothing
        });
    });
  return executor;
};

export interface MigrateDatabaseParams {
  mode: 'up' | 'down';
  targetVersion?: string;
  migrationFolder: string;
  poolConfig: PoolConfig;
}

export const migrate = ({mode, targetVersion, migrationFolder, poolConfig}: MigrateDatabaseParams): Promise<void> =>
  new Pool(poolConfig).connect().then((client) =>
    Promise.resolve()
      .then(() => client.query('BEGIN'))
      .then(() => client.query(createMigrationTableQuery))
      .then(() => client.query(getLatestVersionQuery))
      .then((result: QueryResult<{id: number; version: string}>) =>
        result.rows.length === 0 ? undefined : result.rows[0],
      )
      .then((currentVersion) =>
        performMigration({
          mode,
          targetVersion,
          currentVersion,
          client,
          migrationFolder,
        }),
      )
      .then(() => client.query('COMMIT'))
      .catch((err) => client.query('ROLLBACK').then(() => Promise.reject(err)))
      .finally(() => client.release())
      .then(() => {
        // do nothing
      }),
  );
