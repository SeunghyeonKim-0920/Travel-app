## Why

The user selected Postcard Pop from the validated travel design concepts. The production app should now adopt that bright, energetic travel identity while preserving every existing workflow and the mobile-first navigation behavior.

## What Changes

- Apply the Postcard Pop color, typography, border, shadow, and button system across the production app.
- Use the selected travel-arrival photograph in the dashboard hero with responsive focal positioning and readable localized copy.
- Restyle planner, companion matching, route planner, profile, feedback, itinerary, chat, and modal surfaces consistently.
- Preserve existing interactions, localization, data, responsive layouts, and accessibility behavior.
- Synchronize root and `deploy_live`, verify locally and in production, and deploy to the existing Surge domain.

## Capabilities

### New Capabilities
- `postcard-pop-production-theme`: Defines the selected production visual theme and its responsive, accessible application across all core views.

### Modified Capabilities

None.

## Impact

- Affected files: production HTML entry points, `style.css`, mirrored `deploy_live` files, and existing local travel imagery.
- No API, storage schema, routing logic, itinerary logic, or external dependency changes.
