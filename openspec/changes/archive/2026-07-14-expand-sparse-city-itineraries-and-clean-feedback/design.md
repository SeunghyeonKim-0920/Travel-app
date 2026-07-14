## Context

The planner combines base city pools, patch layers, optional nearby-day supplements, and several post-processing passes. Sparse itineraries arise when a city has too few verified non-food places, when high-priority records are missing coordinates or names, or when the scheduler cannot place remaining candidates before meal windows. Nearby trips already exist for selected cities, but eligibility is based mainly on raw pool size and the final normalizer collapses every nearby day to one card.

Interlaken and the homepage destination expansion were completed immediately before this change and must be preserved. Feedback is synchronized through one shared Mockbolt payload and merged with browser storage, so test-data removal requires both a deterministic client migration and a production payload update.

## Goals / Non-Goals

**Goals:**

- Make Berlin a complete multi-day destination before nearby trips are considered.
- Fill only genuinely sparse later days and cap nearby trips at two per itinerary.
- Audit every supported city for empty early days, duplicate places, and invalid day-trip use.
- Preserve individual Interlaken stop cards and the six featured homepage destinations.
- Remove only identified legacy test feedback records.

**Non-Goals:**

- Guarantee seven full sightseeing days for every city.
- Invent generic attractions or infer places from city names.
- Add live routing or ticketing APIs in this change.
- Delete arbitrary short or anonymous feedback.

## Decisions

1. **Curate Berlin explicitly.** Add high-priority official landmarks and neighbourhood stops with verified coordinates and realistic durations. Explicit records are preferred over generating names at runtime.
2. **Use a capped fallback policy.** Nearby trips remain full-day anchors, but the scheduler may use no more than two and only after all available regular city sightseeing candidates are exhausted. Empty final days are allowed when no verified option remains.
3. **Measure output, not only source data.** A new runtime audit generates seven-day courses for every supported city and records real sightseeing counts, duplicates, early landmark coverage, and nearby-day counts.
4. **Keep destination cards data-driven.** The existing six-city featured list remains the source of truth and is verified against actual city records and local image assets.
5. **Migrate known test feedback by stable identity.** Remove known test IDs and narrowly defined legacy fixtures during merge/storage normalization, then delete the same records from the shared production payload. User feedback that does not match those stable fixtures remains untouched.

## Risks / Trade-offs

- **[Risk] Some cities legitimately cannot fill seven days** → Require meaningful early-day coverage and cap nearby trips, but allow late days to remain empty.
- **[Risk] Nearby trips can displace city attractions** → Gate them on exhaustion of regular sightseeing and place them only in later itinerary days.
- **[Risk] Legacy feedback cleanup could over-match** → Match stable IDs and exact fixture signatures only; never delete based solely on being anonymous or short.
- **[Risk] Curated coordinates can drift or be copied incorrectly** → Add coordinate and city-distance assertions to the catalog audit.

## Migration Plan

1. Add and verify Berlin records and nearby trips in the root runtime.
2. Add feedback cleanup and output audits.
3. Run static and Playwright verification locally.
4. Copy affected runtime files byte-for-byte to `deploy_live` and deploy to Surge.
5. Remove identified test records from Mockbolt and verify live feedback state.
6. Roll back by redeploying the prior `deploy_live` commit and restoring the previous remote payload if verification fails.

## Open Questions

None. The current requirement permits late days to remain empty when verified local and nearby options are exhausted.
