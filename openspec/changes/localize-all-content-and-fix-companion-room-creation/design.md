## Context

The application is a static JavaScript travel app with duplicated production assets under `deploy_live`. Localization is currently split across translation tables, inline language maps, city and place-name helpers, and runtime fallback functions. For non-English languages, several helpers fall back to English source values and then attempt partial term replacement. This leaves untranslated city, attraction, status, toast, tooltip, and generated itinerary text visible in Korean, French, Chinese, Japanese, and Spanish modes.

Companion-room creation currently pulls remote state, appends a local room, calls the remote save routine, closes the modal, renders the list, and displays a success message. The save routine returns a Boolean result, but the caller does not check it. The room list also retains the previously selected category filter, so a successfully created room can be hidden immediately when its category differs from the active filter. Remote merge or expiry normalization can also remove a room before rendering, while the success message is still shown.

The change must preserve existing useful behavior, keep root and `deploy_live` assets synchronized, and defer implementation, browser verification, deployment, commit, and push until explicit approval.

## Goals / Non-Goals

**Goals:**

- Establish one deterministic localization path for all system-generated text in Korean, English, French, Chinese, Japanese, and Spanish.
- Prevent supported non-English modes from silently returning untranslated English UI or generated content.
- Complete localized city, country, attraction, route, itinerary, companion, tooltip, and runtime-message coverage, with focused coverage for the United States, United Kingdom, Australia, and New Zealand.
- Preserve user-entered content exactly as entered while localizing surrounding labels and system messages.
- Make companion-room creation transactional from the user’s perspective: success is shown only when persistence succeeds and the room remains available in state.
- Ensure the newly created room is visible immediately after creation.
- Verify local and deployed behavior across all required views and supported language modes.

**Non-Goals:**

- Automatically machine-translating arbitrary user-entered room titles, descriptions, profile names, or free-form place text.
- Replacing the current remote storage provider or redesigning the companion data model beyond what is needed for reliable creation.
- Redesigning page layouts or changing unrelated itinerary, chat, membership, or route-planning behavior.
- Translating third-party brand names into forms that do not exist in the target language; official localized names or established transliterations will be used where available.

## Decisions

### 1. Use explicit localized values before any fallback

For supported languages, rendering helpers will first resolve an exact language-specific value. Missing system text will be treated as a localization defect rather than silently returning English. A controlled final fallback will use a target-language generic label or established transliteration, not an unrelated English sentence.

**Rationale:** The current English-first fallback makes incomplete translation tables invisible during development and directly causes mixed-language screens.

**Alternative considered:** Continue expanding regex-based replacement only. This was rejected because replacement rules cannot reliably translate arbitrary phrases, grammatical context, tooltips, or generated messages.

### 2. Centralize runtime messages and eliminate bilingual conditionals

Toast messages, status messages, chat-system messages, tooltips, and button labels currently implemented as Korean-versus-English conditionals or raw translation-table access will be moved to complete six-language lookup entries and retrieved through the same safe translation helper.

**Rationale:** A single lookup path is testable and prevents French, Chinese, Japanese, and Spanish modes from inheriting English branches.

**Alternative considered:** Add more nested conditionals at each call site. This was rejected because it duplicates text and increases the chance of future language leakage.

### 3. Separate system localization from user content

System-owned city, country, attraction, itinerary, route, category, date, status, and instructional text will be localized. User-authored room titles, room descriptions, exact meeting-place text, profile names, and chat messages will remain unchanged.

**Rationale:** Translating user content without a translation service can alter meaning and create unsupported claims. The requested strict-language behavior is applied to application-owned text while preserving user input integrity.

### 4. Add deterministic city and place coverage

City records and localization maps will be audited for every supported city and language. The United States, United Kingdom, Australia, and New Zealand will receive explicit city and major-place coverage first, followed by a cross-language scan for remaining raw English values. Established target-language names or transliterations will be used for proper nouns.

**Rationale:** Generic word replacement is insufficient for names such as attractions, districts, and landmarks.

### 5. Treat room creation as a verified operation

The create handler will capture the remote save result and verify that the created room ID exists in the resulting normalized state before announcing success. On failure, the modal will remain recoverable and a localized error message will be shown. The application will not display a success toast for a failed or discarded save.

**Rationale:** The current caller ignores the Boolean result returned by the remote save routine.

**Alternative considered:** Always keep the room locally even when remote persistence fails. This was rejected as the default because it would show a room that disappears on refresh or on another device. A clear failure is more trustworthy.

### 6. Make the newly created room visible

After successful creation, the companion category filter will be set to `all` or to the new room’s category before rendering, and the rendered list will be checked for the new room ID.

**Rationale:** A valid room can currently be hidden by a previously active category filter, which is indistinguishable from creation failure to the user.

### 7. Synchronize root and deployment assets before deployment

Changes to mirrored source assets will be applied to both root and `deploy_live`, followed by an explicit comparison of affected files. Local Playwright verification must pass before running the existing Surge deployment workflow. The deployed URL will then be opened and verified before commit and push.

**Rationale:** The project serves production from mirrored deployment assets, so root-only fixes would not reach the live site.

## Risks / Trade-offs

- **[Incomplete translation inventory]** Dynamic text may exist outside the primary translation table. → Perform source scans for raw English, direct `TRANSLATIONS[state.lang]` access, and Korean-versus-English conditionals, then verify every required view in each non-English language.
- **[Proper nouns can legitimately share English spelling]** Some official names are unchanged in French or Spanish. → Use established localized names or transliterations and distinguish legitimate proper nouns from untranslated application text during review.
- **[Remote service failure or concurrent writes]** A room can fail to persist or be affected by a concurrent merge. → Check the save result and final normalized room ID, preserve merge behavior, and display a localized failure without false success.
- **[Expiry logic removes a newly created room]** Date/time normalization may classify a new room as expired. → Add verification around the selected local date/time and the pruning boundary, including timezone-sensitive test cases.
- **[Large translation patch increases regression surface]** Broad text changes can affect formatting. → Keep logic changes focused, update mirrored assets together, and exercise all five primary views plus console checks in Playwright.
- **[Deployment succeeds but stale assets are served]** Browser or service-worker caching may hide the new version. → Verify the live URL in a fresh context and confirm visible behavior rather than relying only on the deployment command exit code.

## Migration Plan

1. Implement localization and room-creation fixes in root source files.
2. Run targeted source-level checks and local browser verification at `http://localhost:8000`.
3. Synchronize every affected root file with its `deploy_live` counterpart and compare them.
4. Run the existing Surge production deployment workflow.
5. Open the deployed Surge URL in Playwright, repeat critical language and room-creation checks, and inspect console errors.
6. If live verification fails, stop before commit/push and redeploy the last known-good `deploy_live` content.
7. After all verification passes, commit the approved change and push the current GitHub branch.

## Open Questions

- The exact Surge production URL and deployment command will be resolved from the existing project workflow during the approved apply phase.
- During implementation, the room-loss path must be reproduced to determine whether the primary cause is failed remote persistence, expiry pruning, the active category filter, or a combination. The acceptance behavior is fixed regardless of which path is observed: no false success and immediate visibility after a verified save.
