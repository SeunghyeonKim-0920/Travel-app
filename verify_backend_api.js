const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wandersync-api-'));
process.env.WANDERSYNC_DATA_DIR = dataDir;
process.env.WANDERSYNC_ENABLE_REMOTE_SYNC = 'true';
const { createServer, isExpiredRoom, normalizeFlightResult, normalizeTransitResult } = require('./server');

function futureDate() {
  const date = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

async function main() {
  const flight = normalizeFlightResult({
    direct: false,
    actualFlightTime: 140,
    transferTime: 70,
    waitTime: 120,
    baggageTime: 30,
    layoverTime: 180,
    provider: 'QA flight provider'
  });
  assert.equal(flight.connectionType, 'via');
  assert.equal(flight.durationMinutes, 540);
  assert.equal(flight.actualFlightTime, 140);

  const transit = normalizeTransitResult({
    transportType: 'train',
    durationMinutes: 487,
    direct: false,
    provider: 'QA GTFS provider'
  });
  assert.equal(transit.transportType, 'train');
  assert.equal(transit.durationMinutes, 490);
  assert.equal(transit.connectionType, 'via');

  const server = createServer();
  await new Promise(resolve => server.listen(0, resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const room = {
    id: 'qa-room-1',
    date: futureDate(),
    title: 'QA room',
    description: 'Room created by API verification.',
    place: 'Central station',
    joinedUsers: [],
    creator: { name: 'QA' }
  };

  const health = await fetch(`${base}/api/health`).then(response => response.json());
  assert.equal(health.ok, true);
  assert.equal(health.remoteSync, true);

  const saved = await fetch(`${base}/api/state`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      json_payload: {
        rooms: [room],
        chatLogs: { 'qa-room-1': [{ id: 'm1', sender: 'QA', text: 'hello' }] },
        feedbacks: [
          { id: 'feedback-keep', text: 'Useful traveler feedback', rating: 5 },
          { id: 'feedback-test', text: 'Mobile feedback verification', rating: 5 }
        ]
      }
    })
  });
  assert.equal(saved.status, 200);

  const loaded = await fetch(`${base}/api/state`).then(response => response.json());
  assert.equal(loaded.rooms.some(item => item.id === room.id), true);
  assert.equal(loaded.chatLogs['qa-room-1'][0].text, 'hello');
  assert.equal(loaded.feedbacks.some(item => item.id === 'feedback-keep'), true);
  assert.equal(loaded.feedbacks.some(item => item.id === 'feedback-test'), false);

  const deleted = await fetch(`${base}/api/state`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ json_payload: { rooms: [], chatLogs: {}, feedbacks: [] }, deletedRoomIds: [room.id], deletedFeedbackIds: ['feedback-keep'] })
  });
  assert.equal(deleted.status, 200);
  const afterDelete = await fetch(`${base}/api/state`).then(response => response.json());
  assert.equal(afterDelete.rooms.some(item => item.id === room.id), false);
  assert.equal(afterDelete.chatLogs[room.id], undefined);
  assert.equal(afterDelete.feedbacks.some(item => item.id === 'feedback-keep'), false);

  const invalid = await fetch(`${base}/api/state`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rooms: [{ id: 'bad', date: '2000-01-01' }] })
  });
  assert.equal(invalid.status, 400);
  assert.equal(isExpiredRoom({ date: '2000-01-01' }), true);

  const unavailable = await fetch(`${base}/api/route`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: 'TRANSIT', from: { lat: 0, lon: 0 }, to: { lat: 1, lon: 1 } })
  });
  assert.equal(unavailable.status, 503);

  await new Promise(resolve => server.close(resolve));
  fs.rmSync(dataDir, { recursive: true, force: true });
  console.log('PASS backend API state, validation, expiry, health, and provider fallback checks');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
