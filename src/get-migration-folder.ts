import fs from 'fs';

export const getMigrationFolder = (params: {[name: string]: string}): string => {
  const migrationFolder = params['migration-folder'] || process.env.POSTGRES_MIGRATION_FOLDER;
  if (!migrationFolder) {
    throw new Error('Migration folder is required!');
  }
  if (!fs.existsSync(migrationFolder)) {
    throw new Error('Migration folder does not exist!');
  }
  return migrationFolder;
};
