## Context

The app is a static HTML/CSS/JavaScript product with base attraction pools, later curation patches, a route-time table, and a mirrored `deploy_live` bundle. The scheduler combines entries from several pools, so a correction must apply after all data patches and again at candidate selection. The site already contains licensed/local travel photography that can support isolated concept previews.

## Goals / Non-Goals

**Goals:**
- Prevent Dubailand or other known unopened/project-only labels from entering generated courses.
- Give Dubai Mall a realistic four-hour planning block and make venue-specific duration overrides reusable.
- Replace the Munich-Barcelona seven-hour rail claim with the current 14h41 connecting timetable rounded to ten minutes.
- Provide three polished, responsive design concepts for user selection.
- Add deterministic checks that fail when these regressions return.

**Non-Goals:**
- Claim that a static dataset is a live global opening-hours or timetable service.
- Fabricate a universal average dwell time where no reliable published average exists.
- Apply one of the proposed visual themes to the main application before the user selects it.
- Introduce a backend or paid maps/transport API.

## Decisions

1. A normalized blocked-place registry will run after all attraction data patches. It will remove exact project labels and reject them again at schedule-candidate selection so alternate spelling cannot re-enter a course.
2. Venue dwell times will use explicit overrides for well-known, high-impact places. Dubai Mall will be 240 minutes: this is a conservative planning recommendation based on its official scale and attractions, not a fabricated statistical mean.
3. Munich-Barcelona rail time will be stored as 880 minutes (14h40 after ten-minute rounding) with a connecting-train note. The flight comparison remains door-to-door and includes city-airport access, check-in/security buffer, flight, and arrival transfer.
4. Validation will distinguish between `verified curated record` and `unknown`. Unknown development concepts are omitted rather than presented as open visitor attractions.
5. The three visual concepts will live under `design-options/`, reuse the same navigation and planner vocabulary, and be responsive at desktop, portrait phone, and landscape phone sizes. This keeps the current production UI stable while making the choice concrete.

## Risks / Trade-offs

- [Static opening status can change] -> Keep the blocked registry small, explicit, and source-noted; do not claim live status.
- [Exact average dwell time is unavailable for many venues] -> Use labeled planning recommendations and venue/category floors instead of inventing averages.
- [Route timetables vary by date] -> Store the checked operator duration and identify the route as connecting; keep ten-minute rounding.
- [Preview CSS could leak into the application] -> Isolate preview HTML/CSS/JS in its own directory with no production imports beyond shared image assets.

## Migration Plan

Implement and audit root files, verify the planner and route behavior locally with Playwright, mirror changed runtime and preview files into `deploy_live`, verify byte parity, deploy with the existing Surge workflow, smoke-test production, then commit and push only scoped files.

## Open Questions

The final production theme remains intentionally undecided until the user selects one of the three previews.
