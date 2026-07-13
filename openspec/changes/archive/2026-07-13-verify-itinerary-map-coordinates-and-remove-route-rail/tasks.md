## 1. Coordinate Data Integrity

- [x] 1.1 Preserve existing valid coordinates when city-course patch entries omit `x` and `y`
- [x] 1.2 Label scheduling fallback coordinates as estimates and add deterministic legacy-estimate detection
- [x] 1.3 Add canonical regression coordinates and a cached place-specific coordinate resolver

## 2. Map And Route UI

- [x] 2.1 Render itinerary maps asynchronously with verified coordinates only and protect against stale results
- [x] 2.2 Remove the Postcard Pop yellow route-stop column background without changing stop dots or connector lines
- [x] 2.3 Synchronize all affected root runtime files with `deploy_live`

## 3. Verification And Release

- [x] 3.1 Extend automated integrity checks for coordinate preservation, synthetic-point rejection, and Buckingham Palace
- [x] 3.2 Run OpenSpec validation and local automated checks
- [x] 3.3 Verify itinerary maps and route results locally with Playwright on desktop and mobile
- [x] 3.4 Deploy to the existing Surge production site and verify the live site with Playwright
- [x] 3.5 Archive the completed OpenSpec change and commit/push the verified files to the current GitHub branch
