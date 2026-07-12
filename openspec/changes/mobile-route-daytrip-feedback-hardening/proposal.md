## Why

Core planning workflows still clip controls on portrait phones, report missing transport data for known nearby links, and suggest day trips whose real travel time makes them impractical. Users also need a durable way to submit product feedback from the site.

## What Changes

- Make planner, companion, route, and profile layouts fit both portrait and landscape mobile viewports without hidden right-side content.
- Add verified direct transport records for remaining supported-city gaps and audit every supported city pair for a usable route result.
- Gate day-trip suggestions by practical one-way travel time as well as distance, replace Milan-to-Bern with verified nearby choices, and leave days empty when no responsible suggestion exists.
- Make the existing localized feedback area persist submissions through the shared remote-data workflow.
- Keep root and `deploy_live` assets synchronized and verify locally and on the production Surge site.

## Capabilities

### New Capabilities
- `mobile-responsive-integrity`: Mobile views and generated results remain fully visible in portrait and landscape orientations.
- `verified-route-and-daytrip-data`: Intercity routes and optional day trips use explicit, practical transport data and reject unsupported or unrealistic results.
- `user-feedback-collection`: Existing validated, localized feedback is retained in shared storage across users.

### Modified Capabilities

None.

## Impact

The change affects `index.html`, `style.css`, `app.js`, `route_optimizer.js`, localized UI strings, shared JSONBin payload handling, verification scripts, mirrored `deploy_live` assets, Surge deployment, and the current Git branch.
