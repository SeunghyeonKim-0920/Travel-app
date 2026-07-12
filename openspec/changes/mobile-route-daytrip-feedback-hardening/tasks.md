## 1. Mobile Responsive Integrity

- [x] 1.1 Remove fixed-width portrait overflow from route constraints and generated form content
- [x] 1.2 Verify Home, Planner, Companion, Route Planner, and Profile in portrait and landscape mobile viewports

## 2. Verified Route and Day-Trip Data

- [x] 2.1 Add verified Nice-Monaco and Dubai-Abu Dhabi route records and canonical city coordinates
- [x] 2.2 Add a supported-city route audit that rejects missing route results and unsuitable nearby fallbacks
- [x] 2.3 Enforce practical one-way day-trip limits and add verified nearby Milan alternatives
- [x] 2.4 Audit generated day trips across every supported city and reject distant, unknown, or duplicate candidates

## 3. User Feedback Collection

- [x] 3.1 Verify the existing six-language Home feedback form remains accessible and responsive
- [x] 3.2 Persist bounded, deduplicated feedback entries through local and remote shared-state synchronization

## 4. Verification and Release

- [x] 4.1 Run JavaScript syntax, OpenSpec, route, day-trip, and root/deploy parity checks
- [x] 4.2 Verify local desktop, portrait, and landscape flows with Playwright and check console errors
- [x] 4.3 Synchronize `deploy_live`, deploy to Surge, and verify the production site with Playwright
- [x] 4.4 Commit and push the scoped implementation and OpenSpec artifacts to the current Git branch
