## Context

The app is a static HTML/CSS/JavaScript site with generated planner and route markup, a mirrored `deploy_live` tree, and JSONBin-backed shared state. The portrait route constraint row currently combines inline flex styles with fixed select widths, route fallbacks omit two short supported-city pairs, and day-trip repair logic relies primarily on straight-line distance.

## Goals / Non-Goals

**Goals:**
- Remove mobile clipping at 320px and larger portrait widths while preserving usable landscape layouts.
- Ensure every supported city pair returns an explicit or defensible route result, including verified Nice-Monaco rail service.
- Reject day trips that exceed a practical one-way journey and provide verified Milan alternatives.
- Persist localized user feedback through the existing remote synchronization path.
- Verify root and production mirror parity before deployment.

**Non-Goals:**
- Introduce a new backend, paid transport API, or real-time timetable inventory.
- Promise live departure availability or ticket prices.
- Fill otherwise empty itinerary days with unverified destinations.

## Decisions

1. Mobile constraints will stack at narrow widths and all generated form children will use `min-width: 0` and `max-width: 100%`. This directly fixes the computed overflow source without changing desktop structure.
2. Known short intercity links will use explicit records supported by official operator pages. An automated pair audit will fail if any supported city combination still returns no route.
3. Day-trip eligibility will require both a geographic threshold and a maximum practical one-way duration. Dynamic candidates will consult route data; curated non-selector destinations will carry verified duration metadata. Unknown or excessive travel time is rejected rather than guessed.
4. Existing feedback entries will be added to the shared payload with stable IDs and deduplication. The current home feedback UI and validation will be preserved.
5. Verification will combine static scripts with Playwright checks at portrait and landscape sizes, plus production smoke tests after Surge deployment.

## Risks / Trade-offs

- [Static transport data can age] -> Store source notes and keep the pair audit separate from real-time service claims.
- [Stricter day-trip rules can leave a day sparse] -> Accept empty space, as requested, instead of inserting an unrealistic trip.
- [Shared feedback payload can grow] -> Retain bounded recent entries during pruning and deduplicate by ID.
- [Aggressive mobile selectors can affect desktop] -> Scope stacking to mobile breakpoints and verify both orientations and desktop views.

## Migration Plan

Update root assets, run syntax/data/browser checks, copy changed runtime assets to `deploy_live`, verify byte parity, deploy through the existing Surge workflow, then smoke-test the live URL. Rollback is the prior Git commit and previous mirrored static bundle.

## Open Questions

None blocking. Live timetable availability remains outside this static app's scope.
