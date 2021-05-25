import {getPoolConfig} from '@lib/get-pool-config';

describe('getPoolConfig', () => {
  it('returns config from params', () => {
    const params = {
      user: 'thinhtran',
      host: 'test.com',
      port: '1234',
      database: 'test',
      password: 'a12gasa',
      ssl: 'true',
    };
    expect(getPoolConfig(params)).toMatchInlineSnapshot(`
      Object {
        "connectionString": undefined,
        "database": "test",
        "host": "test.com",
        "password": "a12gasa",
        "port": 1234,
        "ssl": true,
        "user": "thinhtran",
      }
    `);
  });

  it('returns config from environment variables', () => {
    process.env.POSTGRES_HOST = 'test.com';
    process.env.POSTGRES_DATABASE = 'test';
    process.env.POSTGRES_PORT = '1234';
    process.env.POSTGRES_USER = 'thinhtran';
    process.env.POSTGRES_PASSWORD = 'a12gasa';
    process.env.POSTGRES_SSL = 'false';
    process.env.POSTGRES_CONNECTION_STRING = 'postgres-connection-string';
    expect(getPoolConfig({})).toMatchInlineSnapshot(`
      Object {
        "connectionString": "postgres-connection-string",
        "database": "test",
        "host": "test.com",
        "password": "a12gasa",
        "port": 1234,
        "ssl": false,
        "user": "thinhtran",
      }
    `);
  });

  it('returns config if port is not specified', () => {
    process.env.POSTGRES_HOST = 'test.com';
    process.env.POSTGRES_DATABASE = 'test';
    process.env.POSTGRES_PORT = undefined;
    process.env.POSTGRES_USER = 'thinhtran';
    process.env.POSTGRES_PASSWORD = 'a12gasa';
    process.env.POSTGRES_SSL = 'false';
    process.env.POSTGRES_CONNECTION_STRING = 'postgres-connection-string';
    expect(getPoolConfig({})).toMatchInlineSnapshot(`
      Object {
        "connectionString": "postgres-connection-string",
        "database": "test",
        "host": "test.com",
        "password": "a12gasa",
        "port": NaN,
        "ssl": false,
        "user": "thinhtran",
      }
    `);
  });

  it('throws error if host is required', () => {
    process.env.POSTGRES_HOST = '';
    process.env.POSTGRES_DATABASE = 'test';
    process.env.POSTGRES_PORT = '1234';
    process.env.POSTGRES_USER = 'thinhtran';
    process.env.POSTGRES_PASSWORD = 'a12gasa';
    process.env.POSTGRES_SSL = 'false';
    process.env.POSTGRES_CONNECTION_STRING = '';
    expect(() => getPoolConfig({})).toThrow('Host is required!');
  });

  it('throws error if database is required', () => {
    process.env.POSTGRES_HOST = 'test.com';
    process.env.POSTGRES_DATABASE = '';
    process.env.POSTGRES_PORT = '1234';
    process.env.POSTGRES_USER = 'thinhtran';
    process.env.POSTGRES_PASSWORD = 'a12gasa';
    process.env.POSTGRES_SSL = 'false';
    process.env.POSTGRES_CONNECTION_STRING = '';
    expect(() => getPoolConfig({})).toThrow('Database is required!');
  });

  it('throws error if port is required', () => {
    process.env.POSTGRES_HOST = 'test.com';
    process.env.POSTGRES_DATABASE = 'test';
    process.env.POSTGRES_PORT = undefined;
    process.env.POSTGRES_USER = 'thinhtran';
    process.env.POSTGRES_PASSWORD = 'a12gasa';
    process.env.POSTGRES_SSL = 'false';
    process.env.POSTGRES_CONNECTION_STRING = '';
    expect(() => getPoolConfig({})).toThrow('Port is required!');
  });

  it('throws error if user is required', () => {
    process.env.POSTGRES_HOST = 'test.com';
    process.env.POSTGRES_DATABASE = 'test';
    process.env.POSTGRES_PORT = '1234';
    process.env.POSTGRES_USER = '';
    process.env.POSTGRES_PASSWORD = 'a12gasa';
    process.env.POSTGRES_SSL = 'false';
    process.env.POSTGRES_CONNECTION_STRING = '';
    expect(() => getPoolConfig({})).toThrow('User is required!');
  });

  it('throws error if password is required', () => {
    process.env.POSTGRES_HOST = 'test.com';
    process.env.POSTGRES_DATABASE = 'test';
    process.env.POSTGRES_PORT = '1234';
    process.env.POSTGRES_USER = 'thinhtran';
    process.env.POSTGRES_PASSWORD = '';
    process.env.POSTGRES_SSL = 'false';
    process.env.POSTGRES_CONNECTION_STRING = '';
    expect(() => getPoolConfig({})).toThrow('Password is required!');
  });
});

export {};
