import { copyFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'store-release', 'legal-page.html');
const destinations = [
  path.join(root, 'privacy.html'),
  path.join(root, 'support.html'),
  path.join(root, 'deploy_live', 'privacy.html'),
  path.join(root, 'deploy_live', 'support.html')
];

await Promise.all(destinations.map(destination => copyFile(source, destination)));
console.log('Synchronized privacy and support pages.');
