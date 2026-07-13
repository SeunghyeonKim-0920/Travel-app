## Context

The application is a static client-side bundle whose city catalog, attraction pools, map coordinate registries, and route-planner centers are maintained in separate JavaScript files and mirrored into `deploy_live`. A destination is only complete when every selector can render it, itinerary generation has enough curated places, map markers use place-specific coordinates, and the route planner can resolve the city center.

## Goals / Non-Goals

**Goals:**
- Register Frankfurt and Interlaken consistently across the destination catalog and route planner.
- Provide six-language city metadata.
- Build realistic, non-duplicated itineraries from verified Frankfurt highlights and Interlaken/Jungfrau-region experiences.
- Keep regional mountain excursions as coherent half-day or full-day units rather than mixing distant locations into one day.
- Verify root and production bundles before deployment.

**Non-Goals:**
- Rework itinerary generation for all existing cities.
- Add live booking, weather, seasonal-opening, or public-transport APIs.
- Change the visual design or unrelated navigation behavior.

## Decisions

1. Add both destinations to the canonical `CITIES` catalog and every coordinate registry instead of relying on UI-only injection. This keeps planner, companion, route, share, and profile-related city rendering consistent.
2. Store curated place records with exact longitude/latitude pairs and localized names. This allows the existing verified-marker pipeline to use place-specific coordinates and avoids synthetic cluster markers.
3. Treat Interlaken's immediate Jungfrau region as destination content. Local Interlaken highlights are ranked first; Lauterbrunnen, Grindelwald, Jungfraujoch, and lake/mountain areas are represented as separate coherent experiences with realistic durations.
4. Include only established, identifiable attractions and combine tightly related stops into one named regional experience when they belong to the same excursion.
5. Update the integrity verifier with explicit catalog, localization, coordinate, and duplicate checks for the two destinations.

## Risks / Trade-offs

- [Seasonal mountain operations can change] -> Use established destination names and neutral descriptions; avoid promising operating hours or availability that the static app cannot verify.
- [Regional coordinates can make an itinerary map span a large area] -> Use exact destination coordinates so the map bounds are geographically honest.
- [Static travel times can become outdated] -> This change adds route centers and retains the existing evidence-based route pipeline rather than inventing pair times.

## Migration Plan

Update and test the root bundle first, mirror affected runtime files to `deploy_live`, deploy through the existing Surge workflow, verify the live build, then archive the OpenSpec change and commit/push the verified files. Rollback is the previous Surge/Git revision.

## Open Questions

None. The user explicitly requested both cities and an Interlaken regional itinerary.
