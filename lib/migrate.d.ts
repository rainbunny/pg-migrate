import { PoolConfig } from 'pg';
export interface MigrateDatabaseParams {
    mode: 'up' | 'down';
    targetVersion?: string;
    migrationFolder: string;
    poolConfig: PoolConfig;
}
export declare const migrate: ({ mode, targetVersion, migrationFolder, poolConfig }: MigrateDatabaseParams) => Promise<void>;
