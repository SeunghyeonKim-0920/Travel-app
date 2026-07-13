## Context

The planner combines base attraction pools with late city-course patches. Some patch records omit coordinates, and the current merge deletes an existing coordinate pair in that case. The scheduling helper then assigns a deterministic city-cluster point with jitter to any coordinate-less record and writes that estimate into the itinerary. Map rendering cannot distinguish those estimates from real GPS data, including in saved and shared courses.

## Goals / Non-Goals

**Goals:**
- Stop coordinate-less patches from erasing valid coordinates.
- Keep approximate coordinates available for internal route heuristics without presenting them as real map locations.
- Resolve map points from a canonical override or a place-specific Wikipedia coordinate, cache successful resolutions, and validate every displayed point against the expected city or day-trip range.
- Detect and suppress old deterministic fallback coordinates in saved and shared payloads.
- Remove only the yellow background applied to the route-stop marker column.

**Non-Goals:**
- Manually author GPS coordinates for every legacy attraction record in this change.
- Use the public Nominatim service as a high-volume production geocoder.
- Change itinerary selection, timing, or intercity routing behavior unrelated to map display.

## Decisions

1. **Separate planning estimates from display coordinates.** `getAttractionCoords` can continue returning an estimated cluster point for scheduling, but it will label the source and callers that persist it will retain that label. Map rendering will use a separate verified resolver and will never plot `estimated-cluster` points.
2. **Use canonical overrides first, then place-specific Wikipedia coordinates.** Known regression targets such as Buckingham Palace receive an exact override. Other named places are resolved through the existing Wikipedia API integration using the English place name plus city context. Results are accepted only when they have page coordinates and pass city/day-trip plausibility checks; successful results are cached locally.
3. **Omit unresolved markers.** A missing marker is preferable to a fabricated marker. The itinerary card and its Google Maps search link remain available even when the embedded map cannot verify a point.
4. **Preserve existing coordinates on partial patch updates.** An omitted `x/y` pair means no coordinate update. It never means delete.
5. **Detect legacy synthetic values deterministically.** The map resolver compares coordinates against the legacy cluster-jitter algorithm, allowing previously saved/shared courses to suppress stale fake pins without rewriting user data.
6. **Apply the smallest CSS correction.** Remove `.route-stop-marker` from the Postcard Pop accent-background selector; individual stop dots, number badges, and connector lines keep their own styling.

## Risks / Trade-offs

- **Wikipedia has no coordinate for a generic activity or venue.** -> The marker is omitted and the existing View Map search remains available.
- **Network resolution adds latency.** -> Resolve only visible-day places in parallel, show a loading state, cache successful coordinates, and guard against stale async renders.
- **A search result is ambiguous.** -> Use city-qualified search, title similarity, distance validation, and reject weak or implausible results.
- **A legitimate distant day trip is outside the city radius.** -> Use the existing day-trip classification and larger validated radius for those records.

## Migration Plan

1. Update root runtime and verification files.
2. Mirror affected production files into `deploy_live` and assert byte equality.
3. Run static integrity and targeted coordinate regression checks.
4. Verify itinerary and route-planner behavior locally in desktop and mobile Playwright.
5. Deploy through the existing Surge workflow and repeat live verification.
6. Roll back by redeploying the previous Git commit if production verification fails.

## Open Questions

None. Unresolved locations will intentionally remain unpinned until a place-specific coordinate can be verified.
