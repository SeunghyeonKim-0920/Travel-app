## 1. Translation Service

- [x] 1.1 Add the Workers AI binding and a validated `/api/translate` endpoint.
- [x] 1.2 Add Worker tests for supported translations, request validation, CORS, and inference failure.

## 2. Feedback Localization

- [x] 2.1 Preserve source language and sanitized per-language translations in frontend and Worker feedback normalization.
- [x] 2.2 Render selected-language feedback with deduplicated asynchronous translation and readable fallback behavior.
- [x] 2.3 Reset and regenerate translations after submission or owner edits without blocking feedback persistence.

## 3. Localization Quality

- [x] 3.1 Repair incomplete feedback copy and selected-language dynamic labels across all six languages.
- [x] 3.2 Expand automated localization checks for missing, unchanged, key-literal, and mojibake output.
- [x] 3.3 Keep root and `deploy_live` bundles synchronized and bump cache versions.

## 4. Verification And Delivery

- [x] 4.1 Run backend, localization, mobile, sharing, and data regression suites.
- [x] 4.2 Verify six-language feedback rendering locally with Playwright.
- [x] 4.3 Deploy the Worker and Surge site, verify live translation and console health, and clean test data.
- [x] 4.4 Sync and archive the OpenSpec change, then commit and push only scoped files.
