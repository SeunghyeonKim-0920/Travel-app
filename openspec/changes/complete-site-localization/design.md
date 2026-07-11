## Context

The application is a static JavaScript site with six supported languages. Static HTML labels use `data-i18n`, while generated planner, companion, profile, route, saved-trip, sharing, and export content is assembled by several runtime renderers. City and attraction data often contains only Korean and English fields, so current fallback logic leaks English into non-English interfaces.

## Goals / Non-Goals

**Goals:**

- Make the selected language authoritative for all user-facing application copy.
- Preserve recognizable proper nouns while localizing surrounding descriptions, labels, actions, and generated sentences.
- Cover both static and dynamically rendered content with repeatable checks.
- Keep production copies synchronized with source files.

**Non-Goals:**

- Replace the static data model with a translation service or external AI API.
- Translate user-authored companion-room messages or profile names.
- Change itinerary scheduling, routing, or attraction selection behavior.

## Decisions

1. Use the existing six-language dictionary as the canonical source for UI keys and add missing keys there. This preserves the current architecture and avoids a new dependency.
2. Make localized data access use language-specific fields first and deterministic localized fallbacks second. Proper nouns without a curated translation remain recognizable, but generated descriptions and category phrases are produced in the selected language.
3. Replace binary Korean/English branches in runtime renderers with six-language helpers. This covers prompts and dynamically generated controls that cannot use `data-i18n`.
4. Add a static audit that compares translation-key coverage and flags binary-language branches or hardcoded user-facing English in known render paths. Browser verification remains the final behavior check.
5. Synchronize only affected production assets into `deploy_live` after local checks pass.

## Risks / Trade-offs

- [Some proper nouns have no established localized form] -> Preserve the official proper name while localizing all explanatory text around it.
- [Existing mojibake literals can hide translation keys] -> Run values through the existing repair/cleaning helpers and test visible text in every supported language.
- [Saved data may contain old English snapshots] -> Localize saved course rendering at read time rather than requiring a destructive storage migration.
- [Static audits cannot prove every interaction path] -> Exercise all five main views and representative United States itineraries in browser verification.

## Migration Plan

Update root source, run syntax and localization audits, verify locally, copy affected files to `deploy_live`, and re-run parity checks. Existing local storage remains compatible because no stored schema is changed.

## Open Questions

None.
