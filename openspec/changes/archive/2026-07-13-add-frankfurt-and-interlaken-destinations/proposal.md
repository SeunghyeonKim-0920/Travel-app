## Why

Frankfurt and Interlaken are not selectable destinations, so users cannot generate or share complete itineraries for either city. Interlaken also needs a region-aware catalog because its core travel experience includes nearby Jungfrau-region destinations rather than only the town center.

## What Changes

- Add Frankfurt and Interlaken to every supported city selector with localized city and country names in Korean, English, French, Chinese, Japanese, and Spanish.
- Add verified destination centers and route-planner coordinates for both cities.
- Add curated, real-world Frankfurt attractions with major landmarks prioritized early in generated itineraries.
- Add curated Interlaken and Jungfrau-region itinerary content, grouping nearby destinations into realistic local, half-day, or full-day experiences without duplicating places.
- Synchronize the production bundle, verify desktop and mobile flows, and deploy the verified change to the existing Surge site.

## Capabilities

### New Capabilities
- `frankfurt-interlaken-destinations`: Selectable, localized Frankfurt and Interlaken destinations with map-safe attraction catalogs and region-aware itinerary generation.

### Modified Capabilities
- `curated-place-integrity`: Extend real-place and coordinate integrity requirements to the new Frankfurt and Interlaken catalogs.

## Impact

The destination catalog, itinerary data patches, map coordinate registries, route-planner city centers, data-integrity verification, production mirror, and deployed Surge bundle are affected. No existing city or user workflow is removed.
