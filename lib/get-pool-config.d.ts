import type { PoolConfig } from 'pg';
export declare const getPoolConfig: (params: {
    [name: string]: string;
}) => PoolConfig | undefined;
