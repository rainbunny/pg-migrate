#!/usr/bin/env node

import {getMigrationFolder} from './get-migration-folder';
import {getMode} from './get-mode';
import {getPoolConfig} from './get-pool-config';
import {getScriptParams} from './get-script-params';
import {getTargetVersion} from './get-target-version';
import {migrateDatabase} from './migrate-database';

const mode = getMode();
const targetVersion = getTargetVersion();
const {params} = getScriptParams();
const migrationFolder = getMigrationFolder(params);
const poolConfig = getPoolConfig(params);

migrateDatabase({
  mode,
  poolConfig,
  migrationFolder,
  targetVersion,
});
