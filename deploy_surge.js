const fs = require('fs');
const https = require('https');

const DOMAIN = "wandersync-travel-1779355803.surge.sh";
const TOKEN = String(process.env.SURGE_TOKEN || '').trim();
const EMAIL = String(process.env.SURGE_LOGIN || process.env.SURGE_EMAIL || '').trim();
const DEPLOY_DOMAIN = String(process.env.SURGE_DOMAIN || DOMAIN).trim();

if (!TOKEN || !EMAIL) {
  console.error('Missing SURGE_LOGIN/SURGE_TOKEN. Set deployment credentials in the environment before publishing.');
  process.exit(2);
}

if (!fs.existsSync('project.zip')) {
  console.error("Error: project.zip not found! Please run zip command first.");
  process.exit(1);
}

const zipData = fs.readFileSync('project.zip');
const auth = Buffer.from(`${EMAIL}:${TOKEN}`).toString('base64');

console.log(`Deploying project.zip to ${DEPLOY_DOMAIN}...`);

const options = {
  hostname: 'surge.surge.sh',
  port: 443,
  path: '/',
  method: 'POST',
  headers: {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/zip',
    'Domain': DEPLOY_DOMAIN,
    'Content-Length': zipData.length
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Response: ${body}`);
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log(`\n✅ Deployed! Visit: https://${DOMAIN}`);
      process.exit(0);
    } else {
      console.log(`\n❌ Deploy failed`);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
  process.exit(1);
});

req.write(zipData);
req.end();
