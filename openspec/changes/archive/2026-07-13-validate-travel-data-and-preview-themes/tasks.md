## 1. Curated Place Integrity

- [x] 1.1 Add a normalized blocked-place registry and remove Dubailand/project-only labels after data patches load
- [x] 1.2 Enforce the blocked-place check when itinerary candidates are selected
- [x] 1.3 Add an all-city static audit for blocked labels, missing names, invalid coordinates, and invalid durations

## 2. Evidence-Based Times

- [x] 2.1 Set all Dubai Mall aliases to a 240-minute planning duration
- [x] 2.2 Add reusable venue-duration overrides and verify they survive pool merging
- [x] 2.3 Replace Munich-Barcelona rail time with a 14h40 connecting journey and verify the route result

## 3. Travel Design Options

- [x] 3.1 Create three distinct bright travel-focused design concepts in an isolated preview gallery
- [x] 3.2 Make all concepts responsive at desktop, portrait-phone, and landscape-phone sizes
- [x] 3.3 Run visual and accessibility QA without changing the production theme

## 4. Verification and Release

- [x] 4.1 Run JavaScript syntax, OpenSpec, place-data, duration, route, and root/deploy parity checks
- [x] 4.2 Verify Dubai course generation, Munich-Barcelona routing, core views, and preview layouts locally with Playwright
- [x] 4.3 Synchronize `deploy_live`, deploy to Surge, and verify the production site and preview gallery with Playwright
- [x] 4.4 Review all acceptance criteria, archive the OpenSpec change, commit, and push scoped files
