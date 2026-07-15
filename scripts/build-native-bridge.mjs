import { build } from 'esbuild';
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'native', 'mobile-bridge.js');
const output = path.join(root, 'native-bridge.js');
const deployedOutput = path.join(root, 'deploy_live', 'native-bridge.js');

await build({
  entryPoints: [source],
  outfile: output,
  bundle: true,
  minify: true,
  format: 'iife',
  platform: 'browser',
  target: ['chrome120', 'safari15'],
  legalComments: 'none'
});
await mkdir(path.dirname(deployedOutput), { recursive: true });
await copyFile(output, deployedOutput);
console.log('Built native bridge for root and deploy_live.');
