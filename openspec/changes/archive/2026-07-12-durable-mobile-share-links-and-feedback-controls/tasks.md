## 1. Durable sharing

- [x] 1.1 Add versioned compressed/fallback share payload codecs and compact query URL generation.
- [x] 1.2 Centralize asynchronous itinerary and route restoration while preserving legacy hash links.
- [x] 1.3 Add regression checks for realistic app-generated mobile links and invalid payload behavior.

## 2. Mobile navigation

- [x] 2.1 Rename Korean mobile labels and make narrow-width text fully visible.
- [x] 2.2 Synchronize the primary and Surge fallback navigation markup.

## 3. Feedback ownership

- [x] 3.1 Add a private bounded ownership ledger for newly submitted feedback IDs.
- [x] 3.2 Add localized, escaped inline edit/save/cancel/delete controls for owned feedback only.
- [x] 3.3 Persist edits/deletions remotely with in-flight protection and rollback on failure.

## 4. Verification and release

- [x] 4.1 Run syntax, static, localization, and mobile Playwright verification locally.
- [x] 4.2 Synchronize changed production assets into `deploy_live` and verify byte parity.
- [x] 4.3 Deploy to Surge and verify generated links, navigation, feedback controls, core views, and console errors on the live site.
- [x] 4.4 Archive the completed OpenSpec change and commit/push only scoped files.
