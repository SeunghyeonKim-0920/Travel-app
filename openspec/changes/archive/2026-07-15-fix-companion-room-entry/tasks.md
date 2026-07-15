## 1. Room Identifier Consistency

- [x] 1.1 Add null-safe room ID comparison and canonical string storage.
- [x] 1.2 Update join, edit, delete, membership, and chat lookups to support server string IDs and legacy numeric IDs.
- [x] 1.3 Keep root and `deploy_live` bundles synchronized and add regression checks.

## 2. Verification And Delivery

- [x] 2.1 Run frontend, backend, localization, mobile, and data regression tests.
- [x] 2.2 Deploy Surge and verify live room creation, entry, chat rendering, and test-room cleanup with Playwright.
- [x] 2.3 Sync/archive the OpenSpec change and commit/push only scoped files.
