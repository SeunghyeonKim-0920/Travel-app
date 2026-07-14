## Why

The production database is empty, but the frontend still contains legacy sample companion rooms and an initialization path that attempts to seed them when remote state is empty. Test-only rooms must never appear to travelers or be restored from old browser storage.

## What Changes

- Remove automatic mock-room seeding when shared state is empty.
- Start new browsers with an empty companion-room collection.
- Prune known legacy sample and QA rooms from browser and backend state.
- Keep real user-created rooms, feedback, and city requests unchanged.

## Capabilities

### New Capabilities
- `production-data-hygiene`: prevents test companion data from appearing or being persisted in production.

## Impact

- Affected frontend state initialization in `app.js` and `deploy_live/app.js`.
- Affected shared-state filtering in the Worker backend.
- Affected mock data exports and verification coverage.
