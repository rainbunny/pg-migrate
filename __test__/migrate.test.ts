import {migrate} from '@lib/migrate';
import {Pool, PoolClient} from 'pg';
import fs from 'fs';

describe('migrate', () => {
  const mockClient = (client: PoolClient, hasCurrentVersion = true): PoolClient => {
    (client.query as unknown as jest.Mock).mockClear();
    (client.release as unknown as jest.Mock).mockClear();
    (client.query as unknown as jest.Mock).mockResolvedValue(undefined);
    (client.query as unknown as jest.Mock).mockResolvedValue(undefined);
    (client.query as unknown as jest.Mock).mockResolvedValue({
      rows: hasCurrentVersion ? [{id: 1, version: '001-add-auth'}] : [],
    });
    return client;
  };

  beforeEach(() => {
    (fs.readdirSync as unknown as jest.Mock).mockClear();
    (fs.readFileSync as unknown as jest.Mock).mockClear();
    (fs.readdirSync as unknown as jest.Mock).mockReturnValue([
      '000.sql',
      '001-add-auth.sql',
      '002-add-book.sql',
      '003-add-author.sql',
    ]);
    (fs.readFileSync as unknown as jest.Mock).mockReturnValue(['SELECT * FROM app_user']);
  });

  it('migrates up successfully', (done) => {
    process.argv = ['node', 'migrate', 'up'];
    new Pool()
      .connect()
      .then(mockClient)
      .then((client) =>
        migrate({
          migrationFolder: './db-migration',
          mode: 'up',
          poolConfig: {},
          targetVersion: '002-add-book',
        }).then(() => client),
      )
      .then((client) => {
        // run start transaction
        expect(client.query).toHaveBeenNthCalledWith(1, 'BEGIN');
        // run only 1 migration script
        expect(fs.readFileSync).toHaveBeenCalledTimes(1);
        // run commit transaction
        expect(client.query).toHaveBeenNthCalledWith(6, 'COMMIT');
        expect(client.query).toHaveBeenCalledTimes(6);
        // release client after completing transaction
        expect(client.release).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('migrates up successfully for the first time', (done) => {
    process.argv = ['node', 'migrate', 'up'];
    new Pool()
      .connect()
      .then((client) => mockClient(client, false))
      .then((client) =>
        migrate({
          migrationFolder: './db-migration',
          mode: 'up',
          poolConfig: {},
        }).then(() => client),
      )
      .then((client) => {
        // run start transaction
        expect(client.query).toHaveBeenNthCalledWith(1, 'BEGIN');
        // run only 1 migration script
        expect(fs.readFileSync).toHaveBeenCalledTimes(4);
        // run commit transaction
        expect(client.query).toHaveBeenNthCalledWith(12, 'COMMIT');
        expect(client.query).toHaveBeenCalledTimes(12);
        // release client after completing transaction
        expect(client.release).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('throws exception if the target version is incorrect', (done) => {
    const targetVersion = '002-test';
    process.argv = ['node', 'migrate', 'up', targetVersion];
    new Pool()
      .connect()
      .then(mockClient)
      .then((client) =>
        migrate({
          migrationFolder: './db-migration',
          mode: 'up',
          poolConfig: {},
          targetVersion,
        }).catch((err) => {
          // run start transaction
          expect(client.query).toHaveBeenNthCalledWith(1, 'BEGIN');
          // run rollback transaction
          expect(client.query).toHaveBeenNthCalledWith(4, 'ROLLBACK');
          expect(client.release).toHaveBeenCalledTimes(1);
          expect(err.message).toBe(`Invalid target version: ${targetVersion}`);
          done();
        }),
      );
  });

  it('runs script in down mode successfully', (done) => {
    process.argv = ['node', 'migrate', 'down'];
    new Pool()
      .connect()
      .then(mockClient)
      .then((client) =>
        migrate({
          migrationFolder: './db-migration',
          mode: 'down',
          poolConfig: {},
          targetVersion: '000',
        }).then(() => client),
      )
      .then((client) => {
        // run start transaction
        expect(client.query).toHaveBeenNthCalledWith(1, 'BEGIN');
        // run only 1 migration script
        expect(fs.readFileSync).toHaveBeenCalledTimes(1);
        // run commit transaction
        expect(client.query).toHaveBeenNthCalledWith(6, 'COMMIT');
        expect(client.query).toHaveBeenCalledTimes(6);
        // release client after completing transaction
        expect(client.release).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('throws exception if the target version is missing when migrating down', (done) => {
    process.argv = ['node', 'migrate', 'down'];
    new Pool()
      .connect()
      .then(mockClient)
      .then((client) =>
        migrate({
          migrationFolder: './db-migration',
          mode: 'down',
          poolConfig: {},
        }).catch((err) => {
          // run start transaction
          expect(client.query).toHaveBeenNthCalledWith(1, 'BEGIN');
          // run rollback transaction
          expect(client.query).toHaveBeenNthCalledWith(4, 'ROLLBACK');
          expect(client.release).toHaveBeenCalledTimes(1);
          expect(err.message).toBe(`Target version is required!`);
          done();
        }),
      );
  });
});

export {};
