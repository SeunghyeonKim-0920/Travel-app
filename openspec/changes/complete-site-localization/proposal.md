## Why

Selecting Korean, French, Chinese, Japanese, or Spanish still leaves English labels and generated itinerary content in several views, especially for United States destinations. This breaks the language setting contract and makes the application feel incomplete.

## What Changes

- Route every user-facing label, prompt, validation message, empty state, and action through the six-language localization layer.
- Localize generated city, attraction, itinerary, companion, route-planner, profile, saved-trip, sharing, and offline-export content in the selected language.
- Add deterministic localized fallbacks for attraction names and descriptions that only have Korean and English source fields.
- Add automated coverage checks for all translation keys and runtime scans of the main views in each supported non-English language.
- Keep root assets and `deploy_live` assets synchronized.

## Capabilities

### New Capabilities

- `site-localization`: Complete selected-language rendering across static UI, generated content, stored content, and exported content.

### Modified Capabilities

None.

## Impact

- Affects the localization helpers and generated-content rendering in `app.js` and route-planner localization in `route_optimizer.js`.
- May add a small localization audit script for repeatable verification.
- Requires synchronized copies in `deploy_live` and browser verification across all main views and supported languages.
