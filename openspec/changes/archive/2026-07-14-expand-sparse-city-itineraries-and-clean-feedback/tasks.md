## 1. Curated Destination Coverage

- [x] 1.1 Add Berlin's missing official landmarks, markets, districts, and realistic visit durations with verified coordinates
- [x] 1.2 Add no more than two realistic Berlin nearby-trip options and gate all nearby trips behind remaining city sightseeing
- [x] 1.3 Preserve individual Interlaken regional stops and verify the six homepage featured destinations

## 2. Sparse-Itinerary Integrity

- [x] 2.1 Add an all-city generated-course audit for early sightseeing coverage, duplicates, foreign places, and nearby-trip caps
- [x] 2.2 Correct catalog or scheduling defects exposed by the audit without inventing places or forcing all seven days full
- [x] 2.3 Add targeted Berlin and Interlaken regression assertions to the existing travel-data verifier

## 3. Feedback Cleanup

- [x] 3.1 Exclude the two exact legacy test feedback IDs during normalization while preserving normal feedback behavior
- [x] 3.2 Remove the same test records from the shared Mockbolt payload without changing other remote data

## 4. Verification And Release

- [x] 4.1 Run static verification and local Playwright checks for dashboard, Berlin, Interlaken, feedback, and mobile layouts
- [x] 4.2 Synchronize `deploy_live`, deploy to Surge, and verify the production site and console
- [x] 4.3 Archive the OpenSpec change and commit/push only the scoped files to the current GitHub branch
