import type { ExtendedPoolConfig } from '@rainbunny/pg-extensions';
export declare const getPoolConfig: (params: {
    [name: string]: string;
}) => ExtendedPoolConfig | undefined;
