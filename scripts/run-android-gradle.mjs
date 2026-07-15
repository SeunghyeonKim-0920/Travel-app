import { spawnSync } from 'node:child_process';
import path from 'node:path';

const task = process.argv[2];
if (!/^(assembleDebug|bundleRelease)$/.test(task || '')) {
  console.error('Use assembleDebug or bundleRelease.');
  process.exit(2);
}

const command = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
const result = spawnSync(command, [task], {
  cwd: path.join(process.cwd(), 'android'),
  stdio: 'inherit',
  shell: process.platform === 'win32'
});
process.exit(result.status ?? 1);
