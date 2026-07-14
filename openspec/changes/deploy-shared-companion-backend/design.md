## Context

The production frontend is hosted on Surge, which cannot execute the existing Node API. Companion state therefore remains in each browser's local storage even though the frontend already understands a remote GET/PUT state contract. A separately hosted, durable API is required, and no production hosting credentials are currently configured on this machine.

## Goals / Non-Goals

**Goals:**

- Persist rooms, chat messages, feedback, and city requests in a globally reachable database.
- Keep the existing frontend state shape and offline fallback.
- Prevent ordinary concurrent writes from dropping unrelated rooms or messages.
- Restrict browser access to the production Surge origin and local development origins.
- Provide repeatable deployment, migration, health, and two-client verification commands.

**Non-Goals:**

- Add user accounts or identity verification.
- Store route-planner API keys in the frontend.
- Treat origin checks as a substitute for full user authentication or abuse prevention.

## Decisions

1. **Cloudflare Worker plus D1.** The Worker provides a stable HTTPS endpoint while D1 stores a single normalized application-state document with a revision number. This avoids relying on an ephemeral filesystem and fits the existing whole-state synchronization contract. A generic Node host with a paid persistent disk was considered but would add another runtime and storage service.

2. **Optimistic merge writes.** PUT requests merge rooms by ID, messages by message ID, feedback by ID, and city requests by ID. Explicit deletion and membership-replacement metadata is honored. The database revision is updated conditionally and the Worker retries conflicts so unrelated concurrent changes are preserved.

3. **Runtime configuration only.** The production `runtime-config.js` contains the public Worker URL, never provider secrets. The local runtime remains configurable through the Node server.

4. **Origin allowlist and bounded payloads.** The Worker allows the production Surge origin and localhost development origins, rejects unapproved browser origins, caps JSON request size, validates records, and removes expired rooms and associated chat logs.

5. **Provider secrets remain separate.** Google, GTFS, and flight credentials stay on a server-side runtime. This change deploys companion synchronization first and does not expose those credentials through the Worker.

## Risks / Trade-offs

- [Cloudflare account authorization is unavailable] -> Keep all deployment files ready and stop before creating cloud resources; require the account owner to complete OAuth.
- [Public write API abuse] -> Apply strict origin, size, validation, and record-count limits now; add authentication and rate limiting before broad public promotion.
- [Concurrent whole-state writes] -> Use conditional revisions, retries, ID-based merges, and explicit tombstones.
- [Backend outage] -> Preserve the existing local fallback and show synchronization failure without blocking the rest of the app.

## Migration Plan

1. Add Worker, D1 schema, local tests, and deployment configuration.
2. Create the D1 database and apply the schema after Cloudflare authorization.
3. Deploy the Worker and verify health plus cross-client state persistence.
4. Set the production runtime API URL, deploy Surge, and verify two isolated browser contexts.
5. Roll back by restoring an empty static runtime configuration; local browser data remains intact.

## Open Questions

- Which Cloudflare account should own the Worker and D1 database if no existing authenticated account is available?
- Should anonymous companion rooms later require email or social sign-in before the site is promoted broadly?
