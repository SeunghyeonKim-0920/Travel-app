## 1. Baseline and Reproduction

- [x] 1.1 Confirm the current Git branch and clean/dirty status before implementation and preserve unrelated user changes.
- [x] 1.2 Start the existing local server and reproduce untranslated English text in each required view for Korean, French, Chinese, Japanese, and Spanish.
- [ ] 1.3 Reproduce companion-room creation with multiple active category filters and capture whether the room is lost by remote save, payload merge, expiry pruning, or list filtering.
- [x] 1.4 Record the existing Surge deployment command, production URL, and root-to-`deploy_live` synchronization workflow from project files.

## 2. Localization Inventory and Infrastructure

- [ ] 2.1 Audit root JavaScript and HTML for raw English UI strings, Korean-versus-English conditionals, direct `TRANSLATIONS[state.lang]` access, raw translation-key fallbacks, and English-first data fallbacks.
- [ ] 2.2 Create or extend complete six-language translation entries for navigation, controls, tooltips, dialogs, validation, toasts, chat-system messages, room statuses, itinerary text, and route-planner text.
- [ ] 2.3 Update translation helpers so supported non-English languages do not silently return unrelated English UI text or raw translation keys.
- [ ] 2.4 Preserve user-authored titles, descriptions, profile names, meeting-place text, and chat messages while localizing surrounding application-owned text.

## 3. City, Country, Attraction, and Generated Content Localization

- [ ] 3.1 Audit every supported city and country for explicit Korean, French, Chinese, Japanese, and Spanish display values.
- [ ] 3.2 Complete localized city, country, attraction, district, and landmark mappings for the United States, United Kingdom, Australia, and New Zealand.
- [ ] 3.3 Fill remaining supported-city localization gaps outside those four countries and use established target-language names or transliterations for proper nouns.
- [ ] 3.4 Ensure Home cards, city search, Planner selectors, itinerary results, Route Planner results, Companion Matching badges, and saved trips use the same localized city and country helpers.
- [ ] 3.5 Ensure generated descriptions, schedule labels, meal entries, transit entries, route descriptions, map actions, and saved-trip actions render in the selected language.

## 4. Reliable Companion-Room Creation

- [ ] 4.1 Update room creation to check the Boolean remote-save result before closing the form or displaying success.
- [ ] 4.2 Verify that the new room ID remains present after remote merge, normalization, and expiry pruning before reporting success.
- [ ] 4.3 Preserve the entered form values and show a localized retryable error when persistence fails or the room is discarded.
- [ ] 4.4 Make the created room immediately visible by switching to the `all` filter or the created room’s category before rendering.
- [ ] 4.5 Align room date/time validation and expiry pruning so valid future local times are not removed during creation.
- [ ] 4.6 Verify that a successfully created room survives refresh and subsequent remote synchronization while existing deletion and expiry behavior remains unchanged.

## 5. Root and Deployment Synchronization

- [x] 5.1 Apply approved source changes to the root files only after the implementation plan is confirmed.
- [x] 5.2 Synchronize every affected mirrored file under `deploy_live` with its root counterpart.
- [x] 5.3 Compare affected root and `deploy_live` files and resolve any unintended differences before deployment.

## 6. Local Verification

- [x] 6.1 Run available syntax, project, or minimal automated checks and resolve all command errors.
- [x] 6.2 Use Playwright MCP against `http://localhost:8000` to test Home, Planner, Companion Matching, Route Planner, and Profile.
- [ ] 6.3 Test Korean, French, Chinese, Japanese, and Spanish for unexpected English application text, including representative cities in the United States, United Kingdom, Australia, and New Zealand.
- [x] 6.4 Create a future-dated companion room under matching and nonmatching category filters and verify immediate visibility, correct localized messages, and persistence after refresh.
- [x] 6.5 Check the browser console during all required flows and resolve unexpected errors before deployment.

## 7. Surge Deployment and Live Verification

- [x] 7.1 Deploy the synchronized `deploy_live` content through the existing Surge production workflow only after local verification passes.
- [x] 7.2 Open the deployed Surge URL in a fresh Playwright context and verify the required primary views and representative multilingual city content.
- [x] 7.3 Verify the live companion-room creation flow, immediate list visibility, localized outcome messages, refresh persistence, and browser console state.
- [ ] 7.4 Stop and report honestly without commit or push if deployment or live verification fails.

## 8. Final Review and Version Control

- [x] 8.1 Review the final diff for unrelated changes, unsupported claims, incomplete translations, and root/`deploy_live` divergence.
- [x] 8.2 Report changed files, local verification results, deployment result, live URL, and any remaining uncertainty.
- [x] 8.3 After all approved local and live checks pass, commit the change on the current branch with a focused message.
- [x] 8.4 Push the current branch to its configured GitHub remote and confirm the push succeeds.

## 9. Mobile-First Travel Refresh

- [x] 9.1 Change the Korean language option label to `한국어` and add a six-language profile gender privacy option.
- [x] 9.2 Add a touch-friendly supported-city result list for Planner and companion-room city selection while retaining the native select fallback.
- [x] 9.3 Make the companion-room modal and primary navigation reliable in portrait and landscape mobile layouts with safe-area-aware sizing and touch targets.
- [x] 9.4 Remove remaining English from the Korean route-planner result breakdown.
- [x] 9.5 Replace visible `WanderSync` branding, shorten Home copy, remove verbose onboarding sections, and add optimized bright travel photography.
- [x] 9.6 Add a localized warning about external messenger and money requests at companion-chat entry.
- [x] 9.7 Verify desktop, mobile portrait, and mobile landscape rendering and interaction locally and on Surge.
