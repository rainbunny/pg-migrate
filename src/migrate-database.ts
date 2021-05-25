/* eslint-disable no-console */

import {getMigrationFolder} from './get-migration-folder';
import {getMode} from './get-mode';
import {getPoolConfig} from './get-pool-config';
import {getScriptParams} from './get-script-params';
import {getTargetVersion} from './get-target-version';
import {migrate} from './migrate';

const mode = getMode();
const targetVersion = getTargetVersion();
const {params} = getScriptParams();
const migrationFolder = getMigrationFolder(params);
const poolConfig = getPoolConfig(params);

migrate({
  mode,
  poolConfig,
  migrationFolder,
  targetVersion,
})
  .then(() => console.log('Migration completed.'))
  .catch((e) => console.error(e));
