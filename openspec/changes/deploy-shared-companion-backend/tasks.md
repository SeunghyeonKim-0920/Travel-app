## 1. Worker Backend

- [x] 1.1 Add the Cloudflare Worker, D1 schema, configuration, validation, CORS, expiry, and health endpoint.
- [x] 1.2 Implement revision-aware state merge, message deduplication, membership replacement, and deletion tombstones.
- [x] 1.3 Add isolated Worker tests for persistence, concurrency, deletion, expiry, invalid origin, and payload limits.

## 2. Frontend Integration

- [x] 2.1 Send mutation metadata from the existing remote-sync client while preserving local fallback.
- [x] 2.2 Add a production runtime configuration template and deployment script that sets the Worker URL without secrets.
- [x] 2.3 Verify root and `deploy_live` builds remain synchronized and all existing frontend audits pass.

## 3. Production Deployment

- [x] 3.1 Authenticate Wrangler, create the production D1 database, apply migrations, and deploy the Worker.
- [x] 3.2 Verify the live Worker health and cross-client room/message persistence.
- [x] 3.3 Configure and redeploy Surge, then use Playwright to prove two isolated browsers share a room.

## 4. Delivery

- [ ] 4.1 Archive the completed OpenSpec change, commit only scoped files, and push the current branch.
