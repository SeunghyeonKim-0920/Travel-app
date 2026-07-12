## Why

Real generated itinerary links can exceed 15,000 characters, so mobile browsers and messaging apps may truncate the URL and open the home view instead of the shared result. Mobile navigation copy is also ambiguous, and feedback authors currently cannot correct or remove their own submissions.

## What Changes

- Generate compact, query-based share URLs for itineraries and intercity routes while retaining compatibility with existing hash links.
- Restore the correct planner or route-planner view before rendering shared content, and surface a localized error instead of silently falling back to Home when restoration fails.
- Rename the Korean mobile navigation labels to `코스 생성` and `도시간 경로`, with responsive wrapping that remains usable at narrow portrait widths.
- Keep a private browser-local ledger of newly submitted feedback IDs and allow only that browser to edit or delete its own feedback.
- Keep the Surge fallback document and `deploy_live` assets synchronized with the primary application.

## Capabilities

### New Capabilities
- `durable-mobile-sharing`: Compact share-link creation, backward-compatible restoration, and deterministic shared-view navigation.
- `owned-feedback-management`: Browser-scoped authorship and edit/delete controls for submitted feedback.
- `mobile-navigation-copy`: Responsive Korean mobile navigation labels and synchronized fallback markup.

### Modified Capabilities

None.

## Impact

- Affects `app.js`, `route_optimizer.js`, `index.html`, `200.html`, `style.css`, related verification scripts, and matching `deploy_live` files.
- Uses the bundled `pako` codec for consistent gzip support, with browser-native and bounded URL-safe fallbacks; no server schema is introduced.
- Requires local and deployed mobile Playwright verification, Surge deployment, and scoped Git commit/push.
