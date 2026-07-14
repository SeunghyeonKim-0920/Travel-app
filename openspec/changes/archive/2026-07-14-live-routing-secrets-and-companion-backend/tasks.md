## 1. Live route service

- [x] 1.1 Add normalized `/api/route` provider adapters for Google Routes transit/driving, configurable GTFS/transit data, and configurable flight data.
- [x] 1.2 Add async route-segment enrichment with provenance-aware fallback and direct/connecting flight breakdown.
- [x] 1.3 Add route-service tests for configured providers, unavailable providers, and flight component totals.

## 2. Companion backend

- [x] 2.1 Add `/api/state` and `/api/health` to the Node server with JSON persistence, validation, expiry, CORS, and atomic writes.
- [x] 2.2 Add runtime configuration and connect the existing remote-sync client without breaking local fallback.
- [x] 2.3 Add API and Playwright checks for room creation, cross-client read, messages, expiry, and invalid payloads.

## 3. Deployment security

- [x] 3.1 Remove hardcoded Surge credentials from Python and Node deployment scripts.
- [x] 3.2 Add `.env.example` and deployment preflight checks; document the required manual token rotation outside the repository.

## 4. Verification and delivery

- [x] 4.1 Run all existing data, localization, mobile, sharing, and route audits plus new API tests.
- [x] 4.2 Verify local Node API and frontend with Playwright, including live-route fallback and companion persistence.
- [x] 4.3 Deploy the static frontend to Surge, verify it, and document the separate Node backend deployment requirement.
