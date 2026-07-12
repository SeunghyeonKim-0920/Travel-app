## Context

The application is a static frontend with shared state split between `app.js` and `route_optimizer.js`. It currently serializes share payloads with legacy Unicode/base64 helpers and parses them in more than one initialization path. The same frontend is copied to `deploy_live` for Surge deployment. Feedback is persisted through the existing local/remote pipeline, while the mobile bottom navigation hides all visible labels.

## Goals / Non-Goals

**Goals:**

- Use one URL-safe, Unicode-safe JSON payload codec for new itinerary and route links while continuing to read existing links.
- Restore the correct view and generated data when a share URL opens directly on a mobile-sized viewport.
- Allow empty feedback nicknames and display a localized anonymous fallback.
- Make the mobile navigation self-explanatory with compact localized labels and a map-route icon.
- Keep source and deployment mirrors byte-equivalent for affected assets.

**Non-Goals:**

- Do not change the itinerary generation algorithm or route travel-time data.
- Do not add a backend or new dependency.
- Do not remove the existing full navigation labels on desktop or change unrelated translations.

## Decisions

- **Shared codec:** Add small frontend helpers that encode UTF-8 JSON as URL-safe base64 (`+`/`/` replaced and padding removed) and decode both the new URL-safe form and the previous standard base64 form. This avoids `+`/`%` URL edge cases without invalidating links already shared.
- **Single restoration contract:** Both `app.js` and `route_optimizer.js` call the same decoder and explicitly set the target view before the final render. This preserves query/hash compatibility and prevents the normal home initialization from winning after a valid payload is restored.
- **Localized anonymous fallback:** Resolve the anonymous label through the existing `getInlineText` translation system at submit time, so a feedback form submitted in any supported language stores and displays a language-appropriate name.
- **Mobile navigation labels:** Keep the existing accessible full labels and add short localized labels shown only on mobile. Replace the route button's walking-person SVG with a folded-map/route SVG. This keeps the five-button layout within narrow viewports while making its meaning visible.
- **Deployment parity:** Mirror only the changed frontend assets into `deploy_live`, then run static checks and Playwright against both local and live URLs.

## Risks / Trade-offs

- [Risk] A malformed or truncated share hash could throw during startup. → Mitigation: decode in a guarded helper and fall back to the normal home view with the existing error toast.
- [Risk] Very old browsers may lack `TextEncoder`/`TextDecoder`. → Mitigation: include the existing URI-escape fallback and use browser-safe byte conversion.
- [Risk] Five labeled mobile tabs can become crowded at 320px. → Mitigation: use short labels, `flex: 1`, fixed icon sizing, and a narrow viewport Playwright assertion for overflow.
- [Risk] Existing deployments may have cached old assets. → Mitigation: preserve the app's existing cache-refresh query behavior and deploy all affected assets together.

## Migration Plan

1. Create the shared codec and update both share producers and all route/itinerary readers.
2. Remove nickname-required validation, add localized anonymous fallback, and update mobile navigation markup/styles/translations.
3. Run syntax checks plus Playwright tests for local view restoration, anonymous feedback, navigation, and console errors.
4. Synchronize `deploy_live`, deploy to the existing Surge domain, and repeat the critical live checks.
5. Commit and push only the scoped source, deployment, OpenSpec, and verification changes.

## Open Questions

None. Existing share URLs must remain readable, while newly generated URLs use the safer format.
