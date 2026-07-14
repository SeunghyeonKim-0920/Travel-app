## Context

The static app creates course items from curated attraction pools, then recalculates time slots and renders the selected day with Leaflet. Some attraction records have exact coordinates while older records use city-cluster estimates. Transit between attractions is mostly calculated from coordinates, so a bad coordinate can produce both a bad marker and a bad travel estimate.

## Goals / Non-Goals

**Goals:**

- Make evening intent explicit and deterministic without replacing the existing preference and duration model.
- Make the day map a trustworthy overview of all places in that day.
- Correct known coordinate/transit errors with traceable data overrides and bounded fallbacks.
- Keep geographically close Ring Road stops together and avoid claiming a remote stop is a local same-day companion.

**Non-Goals:**

- Claim live Google Maps routing without a routing API or live provider response.
- Rebuild every attraction in the catalog from scratch.
- Change user-authored locations or delete saved courses.

## Decisions

1. Store explicit `nightView`, `sunsetActivity`, and regional-route metadata on curated records. Generic keyword detection remains a fallback, but known landmarks use explicit metadata so ordinary bridges, towers, or restaurants are not incorrectly moved to the evening.
2. Reorder only generated day payloads before `recalculateDayPlanTimes`. A night-view item is placed immediately after dinner; a sunset item receives a bounded locked start based on the course day/date when available and a safe evening fallback otherwise.
3. Keep itinerary coordinates for transit calculations separate from display coordinates when an activity is on water. Map-only land overrides point to a verified shore, pier, marina, or boarding area and are marked with a source.
4. Build map points from the complete resolved candidate list and fit bounds with readable padding. Duplicate coordinate values do not suppress markers; each itinerary item gets its own marker and popup.
5. Use explicit intra-city route overrides for known pairs and curated coordinates for landmark records. For unknown pairs, use the existing bounded fallback and expose a verification source rather than inventing precise route claims.
6. Normalize Iceland's ring-road attractions into ordered regional day groups: Reykjavik, Golden Circle, South Coast, Southeast, North, and West/Snaefellsnes. If the trip is shorter, only the available ordered groups are used.

## Risks / Trade-offs

- [A course has no travel date] -> Use a documented seasonal evening fallback and never move an item outside the existing day cap.
- [A water activity has no known boarding point] -> Use the city's verified waterfront cluster and mark it as a land fallback; do not place it at the waterbody centroid.
- [Static transit data can become stale] -> Keep route overrides isolated and auditable; do not label coordinate-derived values as live provider data.
- [A day has fewer usable attractions after dedupe] -> Leave the day sparse rather than adding an unverified or geographically remote place.

## Verification Plan

- Run JavaScript syntax checks and the existing course/data integrity suite.
- Generate representative Budapest, Sydney, and Iceland courses and assert evening ordering, marker count, coordinate bounds, and Ring Road day groups.
- Run Playwright against `http://localhost:8000` for Home, Planner, Companion Matching, Route Planner, and Profile; inspect portrait/landscape layouts, day-map marker coverage, and console errors.
- Copy affected root files to `deploy_live`, deploy through the existing Surge workflow, and repeat a live smoke check.
