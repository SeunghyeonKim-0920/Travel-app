## Why

The application currently leaks English text when Korean, French, Chinese, Japanese, or Spanish is selected, especially for cities and attractions in the United States, United Kingdom, Australia, and New Zealand. In addition, companion-room creation can display a success message even when the new room is not persisted or is not visible in the current list, which makes the action appear successful while the expected result is missing.

## What Changes

- Ensure all system-generated interface text, runtime messages, city/country labels, attraction names, itinerary labels, route-planner labels, and companion-matching text render in the selected language for Korean, French, Chinese, Japanese, and Spanish.
- Remove silent English fallbacks for supported non-English languages by adding complete localized values or deterministic localized fallback behavior. User-entered titles, descriptions, names, and place text remain unchanged because they are user content, not system UI.
- Expand and normalize localization coverage for cities and attractions, with focused verification for the United States, United Kingdom, Australia, and New Zealand.
- Replace Korean-versus-English-only runtime messages with language-complete messages for all six supported languages.
- Fix companion-room creation so success is reported only after the room is retained in application state and the remote save succeeds.
- Make a newly created companion room immediately visible by ensuring the active category filter does not hide it after creation.
- Keep root source files and matching `deploy_live` files synchronized whenever both are affected.
- After explicit approval, verify locally with Playwright at `http://localhost:8000`, test Home, Planner, Companion Matching, Route Planner, and Profile, check browser console errors, deploy through the existing Surge workflow, verify the live site, and only then commit and push the current branch.

## Capabilities

### New Capabilities

- `strict-selected-language-rendering`: All system-generated content for supported languages is displayed in the user-selected language without unintended English leakage.
- `reliable-companion-room-creation`: Companion-room creation reports accurate save results and makes the newly created room immediately visible in the matching list.

### Modified Capabilities

None. The repository currently has no existing OpenSpec capability specifications.

## Impact

- Primary implementation areas: `app.js`, localized city/place data and translation maps, companion-room rendering and remote persistence flow.
- Mirrored deployment files under `deploy_live` must remain byte-equivalent or functionally synchronized with the root files they mirror.
- The remote room payload integration and existing Surge deployment scripts are affected by verification, but no public API breaking change is expected.
- Local and live browser verification must cover all supported language selections and the full companion-room creation path.
