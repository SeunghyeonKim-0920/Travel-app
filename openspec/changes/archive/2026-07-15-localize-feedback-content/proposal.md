## Why

Feedback interface labels are localized, but traveler-written feedback is stored as one source-language string and is shown unchanged to everyone. The app also relies on incomplete runtime fallbacks, so some visible text remains in English or is poorly repaired after a language switch.

## What Changes

- Translate traveler feedback into the selected site language and persist reusable per-language variants.
- Add a validated production translation endpoint backed by Cloudflare Workers AI.
- Preserve the original feedback text for editing while rendering translated text to other viewers.
- Detect and repair missing, untranslated, and malformed UI copy across all six supported languages.
- Add API, browser, and static regression coverage for feedback translation and language switching.

## Capabilities

### New Capabilities
- `localized-feedback-content`: Dynamic traveler feedback and site copy are displayed in the selected supported language with safe fallback behavior.

### Modified Capabilities

None.

## Impact

- Frontend feedback normalization, submission, editing, rendering, and language-change behavior.
- Cloudflare Worker routes and its Workers AI binding.
- Root and `deploy_live` runtime configuration and frontend bundles.
- Localization, backend, and browser verification scripts.
