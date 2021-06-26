# pg-migrate

`pg-migrate` is a tool that manages databases' schema & data with SQL scripts.

![npm (scoped)](https://img.shields.io/npm/v/@tqt/pg-migrate)
![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)
![Eslint](https://badgen.net/badge/eslint/airbnb/ff5a5f?icon=airbnb)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
![GitHub](https://img.shields.io/github/license/thinhtran3588/pg-migrate)
![GitHub repo size](https://img.shields.io/github/repo-size/thinhtran3588/pg-migrate)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/thinhtran3588/pg-migrate)

**main:**
![CI-main](https://github.com/thinhtran3588/pg-migrate/workflows/CI-main/badge.svg)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=thinhtran3588_pg-migrate&metric=coverage)](https://sonarcloud.io/dashboard?id=thinhtran3588_pg-migrate)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=thinhtran3588_pg-migrate&metric=alert_status)](https://sonarcloud.io/dashboard?id=thinhtran3588_pg-migrate)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=thinhtran3588_pg-migrate&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=thinhtran3588_pg-migrate)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=thinhtran3588_pg-migrate&metric=security_rating)](https://sonarcloud.io/dashboard?id=thinhtran3588_pg-migrate)

**develop:**
![CI-develop](https://github.com/thinhtran3588/pg-migrate/workflows/CI-develop/badge.svg?branch=develop)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?branch=develop&project=thinhtran3588_pg-migrate&metric=coverage)](https://sonarcloud.io/dashboard?id=thinhtran3588_pg-migrate&branch=develop)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=thinhtran3588_pg-migrate&branch=develop&metric=alert_status)](https://sonarcloud.io/dashboard?id=thinhtran3588_pg-migrate&branch=develop)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=thinhtran3588_pg-migrate&branch=develop&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=thinhtran3588_pg-migrate&branch=develop)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=thinhtran3588_pg-migrate&branch=develop&metric=security_rating)](https://sonarcloud.io/dashboard?id=thinhtran3588_pg-migrate&branch=develop)

## 1. Use pg-migrate as a global command

```bash
npm install -g @tqt/pg-migrate
```

You need to have a migration folder structured as below. You can name it whatever you want however its 2 sub-folders `up` and `down` are required. Put your main scripts in the `up` folder and name them in the alphabetical order (the order you want it to run). In case you want to downgrade, you need to place their counterparts in the `down` folder with the same name.

```bash
- migration-folder
  - up
    - 001-add-sample-1.sql
    - 002-add-sample-2.sql
    - 003-add-sample-3.sql
  - down
    - 001-add-sample-1.sql
    - 002-add-sample-2.sql
    - 003-add-sample-3.sql
```

Then run the script with the `up` command

```bash
pg-migrate up --migration-folder your-migration-folder --host host-name --database database-name --port port --user user-name --password password
```

For example

```bash
pg-migrate up --migration-folder ./db-migration --host localhost --database sample --port 5432 --user postgres --password postgres
```

After the command executes, a table named `migration` is created in your current database with all executed scripts.

| id  | version          |     createdAt |
| :-- | :--------------- | ------------: |
| 0   | 001-add-sample-1 | 1622278220790 |
| 1   | 002-add-sample-2 | 1622279735989 |
| 2   | 003-add-sample-3 | 1622279766950 |

In case you want to migrate to a specific version but not the latest one, run

```bash
pg-migrate up 002-add-sample-2 --migration-folder ./db-migration --host localhost --database sample --port 5432 --user postgres --password postgres
```

To downgrade to a specific version, run the script with the `down` command

```bash
pg-migrate down 002-add-sample-2 --migration-folder ./db-migration --host localhost --database sample --port 5432 --user postgres --password postgres
```

Instead of using parameters, you can use environment variables. You also may use a connection string. Here is the list of all parameters:

| param              | alternative environment variable | sample                                                           |
| :----------------- | :------------------------------- | :--------------------------------------------------------------- |
| --migration-folder | POSTGRES_MIGRATION_FOLDER        | ./db-migration                                                   |
| --host             | POSTGRES_HOST                    | localhost                                                        |
| --port             | "003-add-sample-3"               | 5432                                                             |
| --database         | POSTGRES_DATABASE                | postgres                                                         |
| --user             | POSTGRES_USER                    | user                                                             |
| --password         | POSTGRES_PASSWORD                | password                                                         |
| --ssl              | POSTGRES_SSL                     | true                                                             |
| --connectionString | POSTGRES_CONNECTION_STRING       | postgresql://dbuser:secretpassword@database.server.com:3211/mydb |

## 2. Use pg-migrate as a local command

Install the package as a dep dependency in your project

```bash
npm install --save-dev @tqt/pg-migrate
```

or using yarn

```bash
yarn add -D @tqt/pg-migrate
```

Then run

```bash
npx pg-migrate up --migration-folder your-migration-folder --host host-name --database database-name --port port --user user-name --password password
```

## 3: Run it in your code

Install the package as a dep dependency in your project

```bash
npm install --save-dev @tqt/pg-migrate
```

or using yarn

```bash
yarn add -D @tqt/pg-migrate
```

Then import and run it in your code

```typescript
import {migrate} from '@tqt/pg-migrate';

migrate({
  migrationFolder: './db-migration',
  mode: 'up',
  poolConfig: {
    host: 'host',
    database: 'database',
    port: 5432,
    user: 'user',
    password: 'password',
    ssl: true,
  },
});
```
