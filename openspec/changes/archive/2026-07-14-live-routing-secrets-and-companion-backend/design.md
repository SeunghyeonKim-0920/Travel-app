## Context

The frontend is a static HTML application with a Node file server used for local development. `route_optimizer.js` currently computes a route synchronously from curated city-pair data, and `app.js` has a generic GET/PUT remote-sync seam that was disabled after the MockBolt endpoint stopped resolving. Surge can publish the frontend but cannot run the Node API process.

## Goals / Non-Goals

**Goals:**

- Add a provider-backed server route endpoint that can return Google Routes transit/driving data and an optional flight-provider result without exposing provider secrets in the browser.
- Enrich route-planner segments asynchronously when live data is configured, preserving saved order and existing deterministic fallback data when it is not.
- Provide a small JSON-backed API for shared application state, with room expiry and request validation, while retaining local offline behavior.
- Remove hardcoded Surge credentials and make deployment fail before upload when credentials are absent.

**Non-Goals:**

- Claiming live accuracy when no provider credentials or provider response exists.
- Turning Surge into a Node host or silently provisioning a third-party backend.
- Replacing the existing curated route registry or rewriting the course-generation dataset.

## Decisions

1. **Server-side provider proxy.** `server.js` exposes `/api/route` and keeps provider keys in environment variables. Google Routes `computeRoutes` is used for `TRANSIT` and `DRIVE`; an optional normalized GTFS/transit adapter is preferred when configured; and a configurable flight adapter is used for flight offers. The browser receives normalized route records with `source`, `provider`, `capturedAt`, `isLive`, and direct/connecting metadata.

2. **Graceful route enrichment.** The route planner requests live data for each displayed segment in parallel. A successful provider response replaces the matching transport option and its duration; a timeout or absent configuration leaves the existing curated option in place and labels it as cached/estimated rather than fabricating a new value.

3. **State API compatibility.** The existing `WANDERSYNC_REMOTE_SYNC` GET/PUT contract is backed by `/api/state` using an atomic JSON-file write and an in-process write queue. Rooms are expired on read/write based on the end of their configured date. The browser uses this API when `runtime-config.js` enables it and otherwise keeps the current local fallback.

4. **Runtime configuration.** `runtime-config.js` is served dynamically by the Node server and is a disabled static file in `deploy_live`. This allows a Node host to configure the API without embedding secrets in the frontend. Surge deployment remains static until a separate stateful host is configured.

5. **Secret handling.** Both deployment scripts read `SURGE_LOGIN`, `SURGE_TOKEN`, and optional `SURGE_DOMAIN` from the environment. They never contain a fallback token. A `.env.example` documents the required variables without values.

## Risks / Trade-offs

- [Provider credentials unavailable] → Keep the current registry fallback and show its provenance; do not invent live values.
- [Google Routes billing or quota] → Use bounded one-request-per-segment enrichment, timeouts, and optional caching; document quota requirements.
- [JSON file store is single-host] → Make the API contract storage-agnostic and document that production multi-instance deployments need a database or shared volume.
- [Concurrent browser writes] → Merge state by room/message IDs on the server and serialize file writes; last-write-wins remains possible for unrelated profile fields.
- [Static Surge cannot serve `/api`] → Leave production runtime sync disabled unless `WANDERSYNC_API_BASE` points to an independently hosted API.

## Migration Plan

1. Add the API and runtime-config route to the Node development server.
2. Add provider environment variables and test with mock provider responses; run without keys to verify fallbacks.
3. Switch deployment scripts to environment-only credentials and rotate the old Surge token outside the repository.
4. Deploy the static frontend, then configure a Node-capable host and set `WANDERSYNC_API_BASE` when shared rooms are ready for production.

## Open Questions

- Which paid Google Routes and flight-provider accounts should be used for production, and what daily budget is acceptable?
- Which Node-capable host should run the companion API, since Surge cannot execute `server.js`?
