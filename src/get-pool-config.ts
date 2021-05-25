import type {PoolConfig} from 'pg';
import {getValue} from './get-value';

export const getPoolConfig = (params: {[name: string]: string}): PoolConfig | undefined => {
  const poolConfig = {
    host: getValue(params.host, process.env.POSTGRES_HOST),
    database: getValue(params.database, process.env.POSTGRES_DATABASE),
    port: +getValue(params.port, process.env.POSTGRES_PORT),
    user: getValue(params.user, process.env.POSTGRES_USER),
    password: getValue(params.password, process.env.POSTGRES_PASSWORD),
    ssl: 'true'.localeCompare(getValue(params.ssl, process.env.POSTGRES_SSL), undefined, {sensitivity: 'base'}) === 0,
    connectionString: getValue(params.connectionString, process.env.POSTGRES_CONNECTION_STRING),
  };
  if (!poolConfig.connectionString) {
    if (!poolConfig.host) {
      throw new Error('Host is required!');
    }

    if (!poolConfig.database) {
      throw new Error('Database is required!');
    }

    if (!Number.isInteger(poolConfig.port)) {
      throw new Error('Port is required!');
    }

    if (!poolConfig.user) {
      throw new Error('User is required!');
    }

    if (!poolConfig.password) {
      throw new Error('Password is required!');
    }
  }
  return poolConfig;
};
