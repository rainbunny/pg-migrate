import { ExtendedPoolConfig } from '@rainbunny/pg-extensions';
export interface MigrateDatabaseParams {
    mode: 'up' | 'down';
    targetVersion?: string;
    migrationFolder: string;
    poolConfig: ExtendedPoolConfig;
}
export declare const migrateDatabase: (params: MigrateDatabaseParams) => void;
