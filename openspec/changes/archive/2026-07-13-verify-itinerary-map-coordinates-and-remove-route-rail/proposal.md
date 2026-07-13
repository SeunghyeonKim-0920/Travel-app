## Why

Itinerary maps currently promote estimated city-cluster coordinates to real place coordinates, which can place well-known attractions such as Buckingham Palace in the wrong district or even in water. The route planner also paints the entire route-stop marker column yellow, creating the unwanted block shown in the mobile UI.

## What Changes

- Preserve valid coordinates when a city-course patch omits coordinates instead of deleting the existing values.
- Resolve map markers from verified canonical or place-specific coordinates and never plot synthetic cluster estimates as exact locations.
- Reconcile stale saved and shared itinerary points at map-render time so old generated courses do not keep displaying known synthetic positions.
- Add coordinate integrity checks for missing, implausible, legacy-grid, and synthetic curated-place coordinates.
- Remove the yellow background from the route-stop marker column while preserving stop dots and connector lines.
- Keep production files in the project root and `deploy_live` synchronized.

## Capabilities

### New Capabilities
- `verified-itinerary-map-coordinates`: Itinerary maps display only place-specific, plausible coordinates and omit unresolved markers rather than inventing positions.

### Modified Capabilities
- `curated-place-integrity`: City data patches preserve existing coordinates and the audit detects missing or synthetic map coordinates.
- `postcard-pop-production-theme`: The intercity route marker column remains transparent while its individual markers and line retain their intended colors.

## Impact

The change affects `app.js`, `city_course_patch.js`, `style.css`, coordinate integrity verification, mirrored `deploy_live` files, browser map rendering, saved/shared itinerary compatibility, and the existing Surge deployment.
