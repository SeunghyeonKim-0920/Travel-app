## Why

The planner can still surface a development-area label as if it were an open attraction, under-allocate major destinations such as Dubai Mall, and report an impossible seven-hour Munich-Barcelona rail journey. The current visual direction also needs concrete travel-focused alternatives that can be evaluated before changing production styling.

## What Changes

- Remove Dubailand and other explicitly blocked unopened/project-only labels from itinerary candidate pools.
- Add a curated-place validation layer that rejects blocked development concepts and invalid attraction records before scheduling.
- Set Dubai Mall visits to four hours and centralize evidence-based dwell-time overrides for major venues.
- Correct Munich-Barcelona rail data to the current operator timetable and preserve door-to-door flight comparison.
- Add automated audits for blocked places, duration overrides, and route records.
- Build three isolated, responsive travel design previews using the existing product structure and image assets; do not replace the production theme until the user chooses one.
- Keep root and `deploy_live` synchronized, deploy the data fixes and preview gallery, and verify locally and on Surge.

## Capabilities

### New Capabilities
- `curated-place-integrity`: Scheduled attractions are drawn from curated records and explicitly blocked unopened development concepts are rejected.
- `evidence-based-travel-times`: Major venue dwell times and specified intercity routes use traceable, maintained overrides.
- `travel-theme-previews`: Users can compare three responsive travel-focused interface directions without changing the live default design.

### Modified Capabilities

None.

## Impact

The change affects itinerary data patches, scheduling candidate validation, route data, verification scripts, a new isolated design-preview directory, mirrored `deploy_live` files, Surge deployment, and the current Git branch.
