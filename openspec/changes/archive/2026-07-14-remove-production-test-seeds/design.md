## Context

Production D1 currently contains no rooms, feedback, chat logs, or city requests. The remaining risk is client-side legacy seed logic and old localStorage entries.

## Goals / Non-Goals

**Goals:**
- Keep an empty production state empty.
- Remove only known sample IDs and explicit QA titles.
- Clean old browser storage on the next load.

**Non-Goals:**
- Delete legitimate user rooms.
- Change companion-room creation or synchronization behavior.

## Decisions

- Replace mock fallbacks with empty arrays and remove the post-pull auto-seed block.
- Remove the legacy sample fixture block and export empty profile, room, and simulator collections.
- Apply the same exact legacy-room predicate in the browser and Worker.
- Match only IDs `1` through `5` and explicit QA title prefixes; no broad substring such as `test` is used.

## Verification

- Run Worker, backend, mobile/share, localization, and data tests.
- Confirm production D1 remains empty.
- Open the deployed companion view in a fresh browser context and confirm no room cards or console errors.
