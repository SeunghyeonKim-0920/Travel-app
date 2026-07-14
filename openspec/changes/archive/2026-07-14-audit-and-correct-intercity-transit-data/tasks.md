## 1. Discovery and Route Dataset

- [x] 1.1 Inspect all supported city course transitions and collect unique place-pair coordinates.
- [x] 1.2 Generate a source-labeled route dataset for every transition and record unresolved pairs as audit failures.

## 2. Runtime Integration

- [x] 2.1 Add the verified route registry and load it in root and `deploy_live` builds.
- [x] 2.2 Update `calculateTransit` to prefer verified route records and remove arbitrary long-distance clamping.

## 3. Verification

- [x] 3.1 Add a full-city route audit covering all supported cities, travel paces, duplicate keys, coordinates, provenance, and 10-minute rounding.
- [x] 3.2 Run data, course-coverage, route-accuracy, and Playwright checks for representative city courses and maps.

## 4. Release

- [x] 4.1 Synchronize affected root and `deploy_live` files and verify parity.
- [x] 4.2 Deploy the verified build to Surge, verify the live site, and commit/push the scoped change.
