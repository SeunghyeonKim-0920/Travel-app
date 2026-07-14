## Why

Generated courses still place some night-view and sunset attractions at arbitrary times, show incomplete or over-zoomed day maps, and use estimated coordinates or distance-derived transit for known places. The Iceland Ring Road can also combine stops from distant regions on one day, while adjacent Sydney landmarks can be shown as a long transfer.

## What Changes

- Schedule explicitly identified night-view attractions after dinner and sunset attractions near the day's sunset window.
- Render every verified non-meal place in the selected day on the itinerary map, fit the map to that day's full bounds, and move water-based activities to a nearby land/boarding-point coordinate.
- Add curated coordinate and intra-city transit overrides for known place pairs, including Sydney Opera House to Harbour Bridge, and keep coordinate-based fallbacks bounded and auditable.
- Group Iceland Ring Road stops by nearby geographic regions instead of mixing Golden Circle, south coast, and north Iceland stops on one day.
- Add repeatable checks for marker coverage, water-marker safety, regional day grouping, and selected route/transit accuracy.
- Keep root source and `deploy_live` synchronized, then verify and deploy the production site.

## Capabilities

### New Capabilities

- `night-and-sunset-scheduling`: Night-view and sunset activities follow explicit timing rules in generated courses.
- `day-map-place-coverage`: The selected itinerary day shows all verified place markers, uses a readable fit-to-bounds viewport, and never anchors water activities in open water.
- `regional-itinerary-and-transit-accuracy`: Regional routes and curated intra-city transfers use verified geographic data and reject implausible estimates.

### Modified Capabilities

None.

## Impact

The change affects `app.js`, `city_course_patch.js`, `route_optimizer.js` or its route data when required, verification scripts, and mirrored files under `deploy_live`. Existing saved courses remain readable; normalization is applied when a course is rendered or recalculated.
