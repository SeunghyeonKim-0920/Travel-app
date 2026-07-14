## Why

Companion rooms currently fall back to browser-local storage on the Surge site, so rooms created by one traveler are invisible to everyone else. The production frontend needs a durable, cross-origin backend that can be deployed independently from static hosting.

## What Changes

- Add a Cloudflare Worker API backed by D1 for shared rooms, chat logs, feedback, and city requests.
- Preserve the existing `/api/state` GET/PUT contract so the frontend requires only runtime configuration changes.
- Add production CORS, payload validation, room expiry, optimistic concurrency, and health checks.
- Point the Surge runtime configuration at the deployed Worker endpoint after verification.
- Add two-browser verification proving that a room created in one isolated browser is visible in another.

## Capabilities

### New Capabilities

- `shared-companion-backend`: Durable multi-user companion room and chat synchronization through a production Worker and D1 database.
- `production-api-runtime-config`: Safe production frontend configuration for a separately hosted API with explicit fallback behavior.

### Modified Capabilities

None.

## Impact

The change affects the companion state synchronization contract, runtime configuration, deployment workflow, CORS policy, and production infrastructure. It adds Cloudflare Worker tooling and a D1 schema while keeping the existing local Node API available for development and provider-backed route work.
