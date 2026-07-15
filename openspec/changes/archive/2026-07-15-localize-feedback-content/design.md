## Context

The site supports Korean, English, French, Chinese, Japanese, and Spanish. Static UI copy comes from `TRANSLATIONS`, inline maps, and runtime repair tables, while feedback records contain only `text` and `lang`. Rendering therefore cannot localize user-authored content. The existing Cloudflare Worker already provides the shared feedback API and can expose a same-origin-safe translation endpoint through a Workers AI binding.

## Goals / Non-Goals

**Goals:**
- Render feedback in the currently selected language without overwriting its original text.
- Reuse translated variants across browsers instead of translating on every render.
- Localize existing records lazily and new or edited records promptly.
- Reject oversized or unsupported translation requests and keep the UI usable when translation is unavailable.
- Detect missing or unchanged UI translations across all supported languages.

**Non-Goals:**
- Translate profile names, place names, or private free-form chat messages in this change.
- Guarantee human-translator quality for arbitrary traveler prose.
- Add a paid third-party translation subscription.

## Decisions

- Add `/api/translate` to the existing Worker and bind Cloudflare Workers AI using `@cf/meta/m2m100-1.2b`. This keeps credentials out of the browser and uses the current free Cloudflare deployment path.
- Store feedback as `{ text, lang, translations }`, where `text` remains the editable source and `translations` contains sanitized supported-language variants. Older records migrate during normalization with their source text seeded into the map.
- Render a cached selected-language variant immediately. If missing, show the repaired original and enqueue one deduplicated translation request; a successful result updates local state, shared state, and the card.
- Translate all missing target languages after a new submission or edit without blocking the initial save. On-demand rendering remains a recovery path for quotas or temporary model failures.
- Preserve source-language attribution and detect legacy records conservatively from script when `lang` is absent or implausible.
- Expand localization auditing to cover every `data-i18n` attribute type and reject missing, English-identical, key-literal, or mojibake output in non-English languages.

## Risks / Trade-offs

- [Risk] Workers AI free allocation can be exhausted. -> Cache translations in feedback records, deduplicate in-flight requests, and retain readable original text as fallback.
- [Risk] Machine translation can alter tone or proper nouns. -> Preserve the original as the source of truth and never use translated text in the edit field.
- [Risk] Concurrent clients can add different language variants. -> Merge translation maps per feedback ID in both client and Worker normalization paths.
- [Risk] Translation requests could be abused. -> Restrict origins, languages, text length, request shape, and response length in the Worker.

## Migration Plan

1. Deploy the Worker binding and translation route; verify health and sample translations.
2. Deploy frontend normalization and rendering changes with a new cache version.
3. Existing feedback gains translations lazily when viewed; no destructive database migration is required.
4. Roll back the frontend independently if needed; records containing `translations` remain backward compatible.

## Open Questions

None. The selected model supports all six configured languages and the existing Cloudflare account deployment workflow.
