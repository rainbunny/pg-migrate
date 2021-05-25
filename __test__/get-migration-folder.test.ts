import fs from 'fs';
import {getMigrationFolder} from '@lib/get-migration-folder';

describe('getMigrationFolder', () => {
  it('returns correct value from arguments', () => {
    const params = {
      'migration-folder': './db-migration',
    };
    fs.existsSync = jest.fn().mockReturnValue(true);
    expect(getMigrationFolder(params)).toMatchInlineSnapshot(`"./db-migration"`);
  });

  it('returns correct value from environment variable', () => {
    const params = {};
    process.env.POSTGRES_MIGRATION_FOLDER = './db-migration';
    fs.existsSync = jest.fn().mockReturnValue(true);
    expect(getMigrationFolder(params)).toMatchInlineSnapshot(`"./db-migration"`);
  });

  it('throws error if migration folder is blank', () => {
    const params = {};
    process.env.POSTGRES_MIGRATION_FOLDER = '';
    expect(() => getMigrationFolder(params)).toThrow('Migration folder is required!');
  });

  it('throws error if migration folder does not exist', () => {
    const params = {};
    process.env.POSTGRES_MIGRATION_FOLDER = './db-migration';
    fs.existsSync = jest.fn().mockReturnValue(false);
    expect(() => getMigrationFolder(params)).toThrow('Migration folder does not exist!');
  });
});

export {};
