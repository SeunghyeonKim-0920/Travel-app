## 1. Planning and Data Audit

- [x] 1.1 Inspect the existing scheduler, map renderer, coordinate resolver, route data, and Ring Road records.
- [x] 1.2 Add auditable metadata/overrides for night, sunset, water markers, regional stops, and known intra-city transfers.

## 2. Core Implementation

- [x] 2.1 Reorder generated night-view items after dinner and place sunset items in the evening window without breaking meal windows or lodging handling.
- [x] 2.2 Make the day map include all resolved places, fit the current day's bounds, and use nearby land coordinates for water activities.
- [x] 2.3 Normalize Iceland Ring Road days by geographic region and apply verified place coordinates/transit overrides.

## 3. Verification and Integration

- [x] 3.1 Add repeatable audits for schedule ordering, map marker coverage, water-marker safety, regional grouping, and known transit distances.
- [x] 3.2 Run syntax/data checks and Playwright verification for the five main views plus representative cities.
- [x] 3.3 Synchronize affected files into `deploy_live` and verify source/deploy parity.
- [x] 3.4 Deploy to the existing Surge URL and verify the live site.
- [x] 3.5 Commit the scoped change and push the current GitHub branch.
