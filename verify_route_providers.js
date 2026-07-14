const assert = require('assert');
const http = require('http');

function requestJson(base, payload) {
  return fetch(`${base}/api/route`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(async response => ({ status: response.status, body: await response.json() }));
}

async function main() {
  const provider = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.url === '/flight') {
      return res.end(JSON.stringify({
        direct: false,
        actualFlightTime: 140,
        transferTime: 70,
        waitTime: 120,
        baggageTime: 30,
        layoverTime: 180,
        provider: 'QA flight provider',
        source: 'http://qa.flight/provider'
      }));
    }
    if (req.url === '/gtfs') {
      return res.end(JSON.stringify({
        transportType: 'train',
        durationMinutes: 487,
        distanceKm: 620,
        direct: false,
        provider: 'QA GTFS provider',
        source: 'http://qa.gtfs/provider'
      }));
    }
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'not found' }));
  });
  await new Promise(resolve => provider.listen(0, resolve));
  const providerBase = `http://127.0.0.1:${provider.address().port}`;
  process.env.WANDERSYNC_FLIGHT_API_URL = `${providerBase}/flight`;
  process.env.WANDERSYNC_GTFS_API_URL = `${providerBase}/gtfs`;
  process.env.WANDERSYNC_DATA_DIR = require('fs').mkdtempSync(require('path').join(require('os').tmpdir(), 'wandersync-provider-'));
  const { createServer } = require('./server');
  const api = createServer();
  await new Promise(resolve => api.listen(0, resolve));
  const base = `http://127.0.0.1:${api.address().port}`;
  const point = { lat: 48.8566, lon: 2.3522 };

  const flight = await requestJson(base, { mode: 'FLIGHT', from: point, to: { lat: 40.4168, lon: -3.7038 }, fromCityId: 'paris', toCityId: 'madrid' });
  assert.equal(flight.status, 200);
  assert.equal(flight.body.transportType, 'flight');
  assert.equal(flight.body.connectionType, 'via');
  assert.equal(flight.body.durationMinutes, 540);
  assert.equal(flight.body.layoverTime, 180);

  const transit = await requestJson(base, { mode: 'TRANSIT', from: point, to: { lat: 52.52, lon: 13.405 }, fromCityId: 'paris', toCityId: 'berlin' });
  assert.equal(transit.status, 200);
  assert.equal(transit.body.provider, 'QA GTFS provider');
  assert.equal(transit.body.transportType, 'train');
  assert.equal(transit.body.durationMinutes, 490);

  await new Promise(resolve => api.close(resolve));
  await new Promise(resolve => provider.close(resolve));
  console.log('PASS configured flight and GTFS adapters with direct/connecting evidence and component totals');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
