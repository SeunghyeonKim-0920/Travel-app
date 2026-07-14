## Why

The route planner currently combines curated estimates with local heuristics, so it cannot refresh door-to-door flight or scheduled rail/bus data when schedules change. Companion rooms also have no working shared backend after the former MockBolt endpoint failed, while the deployment scripts contain a long-lived Surge credential in source code.

## What Changes

- Add an optional server-side live-routing adapter that can use configured Google Routes/Places and flight or GTFS providers for current door-to-door options, with explicit provenance and a deterministic cached fallback when credentials are unavailable.
- Make flight estimates include airport transfers, check-in/security, baggage, layovers, and direct/connecting status; prefer direct service when available.
- Move Surge credentials to environment variables and fail clearly when they are absent; remove hardcoded secrets from deployment scripts.
- Add a small authenticated companion-room API to the existing Node server and a browser client adapter so room creation, listing, joining, messages, feedback, and expiry can synchronize across users when deployed behind a stateful host.
- Keep local storage as an offline fallback and make the active backend state visible in diagnostics without blocking room creation.

## Capabilities

### New Capabilities
- `live-transit-routing`: Provider-backed door-to-door rail, bus, and flight routing with provenance and fallbacks.
- `companion-room-backend`: Shared companion-room persistence, membership, messages, feedback, and expiry through a server API.
- `secure-deployment-credentials`: Environment-only deployment authentication and preflight checks.

### Modified Capabilities
- `evidence-based-travel-times`: Route results must identify whether they are live provider data, cached provider data, or an estimate.

## Impact

- `route_optimizer.js`, `app.js`, `server.js`, deployment scripts, package scripts, and mirrored `deploy_live` assets.
- New server environment variables and optional provider API credentials.
- Surge remains suitable for static frontend hosting; the companion API requires a stateful Node-capable host or compatible reverse proxy for multi-user synchronization.
