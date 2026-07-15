import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const task = process.argv[2];
if (!/^(assembleDebug|bundleRelease)$/.test(task || '')) {
  console.error('Use assembleDebug or bundleRelease.');
  process.exit(2);
}

const repoRoot = process.cwd();
const env = { ...process.env };

function firstExisting(candidates) {
  return candidates.find(candidate => candidate && existsSync(candidate));
}

function findBundledJdk() {
  const jdkRoot = path.join(repoRoot, '.local-tools', 'jdk21');
  if (!existsSync(jdkRoot)) return '';
  return firstExisting(readdirSync(jdkRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(jdkRoot, entry.name, 'bin', process.platform === 'win32' ? 'java.exe' : 'java'))
    .map(javaPath => path.dirname(path.dirname(javaPath)))) || '';
}

const javaHome = firstExisting([
  env.JAVA_HOME,
  findBundledJdk()
]);
const androidHome = firstExisting([
  env.ANDROID_HOME,
  env.ANDROID_SDK_ROOT,
  process.platform === 'win32' ? path.join(env.LOCALAPPDATA || '', 'Android', 'Sdk') : '',
  path.join(os.homedir(), 'Android', 'Sdk')
]);

if (!javaHome || !existsSync(path.join(javaHome, 'bin', process.platform === 'win32' ? 'java.exe' : 'java'))) {
  console.error('JDK 21 was not found. Set JAVA_HOME or install it under .local-tools/jdk21/.');
  process.exit(3);
}
if (!androidHome || !existsSync(path.join(androidHome, 'platforms'))) {
  console.error('Android SDK was not found. Set ANDROID_HOME or ANDROID_SDK_ROOT.');
  process.exit(3);
}

env.JAVA_HOME = javaHome;
env.ANDROID_HOME = androidHome;
env.ANDROID_SDK_ROOT = androidHome;
env.PATH = [path.join(javaHome, 'bin'), path.join(androidHome, 'platform-tools'), env.PATH].filter(Boolean).join(path.delimiter);

if (task === 'bundleRelease') {
  const signingEnvPath = env.TRIPTOGETHER_SIGNING_ENV || path.join(os.homedir(), '.triptogether', 'signing', 'android-signing.env');
  if (existsSync(signingEnvPath)) {
    readFileSync(signingEnvPath, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/).forEach(line => {
      const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
      if (match && !env[match[1]]) env[match[1]] = match[2];
    });
  }
  env.TRIPTOGETHER_REQUIRE_SIGNING = 'true';
}

const command = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
const result = spawnSync(command, [task, '--no-daemon'], {
  cwd: path.join(repoRoot, 'android'),
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env
});
process.exit(result.status ?? 1);
