## Context

The static Surge application currently serializes full generated results into URL hash fragments. A realistic seven-day itinerary produces a roughly 15.5 KB URL, which is vulnerable to truncation or fragment removal when passed through mobile apps. Feedback is synchronized through the existing remote JSON payload, but records have no ownership marker and the active renderer exposes no management actions.

## Goals / Non-Goals

**Goals:**
- Keep generated share links compact enough for normal mobile link handling.
- Open the intended planner view before and after asynchronous payload decoding.
- Continue opening previously issued `#itinerary=` and `#share=` links.
- Permit edit/delete only for feedback created by the same browser identity.
- Keep narrow portrait and landscape navigation readable.

**Non-Goals:**
- Adding user accounts or cryptographic identity proof.
- Migrating legacy feedback without an ownership marker.
- Introducing a dedicated share-link backend or third-party compression library.

## Decisions

1. New links use a query parameter containing a versioned payload. The bundled `pako` codec provides gzip support independent of browser stream APIs, with native streams and bounded URL-safe Base64 as fallbacks. Query parameters are chosen because external apps preserve them more reliably than fragments; gzip keeps realistic URLs below the verified Surge request-line limit.
2. Shared-payload restoration is centralized in an asynchronous loader. The `view` query selects the planner shell immediately, then decoded content is validated and rendered. Existing hash/query readers remain as backward-compatible paths.
3. Feedback ownership is recorded as a private localStorage ledger of feedback IDs successfully created by this browser. No ownership secret is placed in the public remote payload. Only IDs in that ledger render edit/delete controls. Server synchronization uses the existing merge and delete-id mechanisms with rollback after a failed save.
4. Feedback content and editable values are HTML-escaped before interpolation. Controls use inline editing with save/cancel actions and localized labels in all six supported languages.
5. Mobile labels wrap at spaces instead of truncating, and `200.html` receives the same navigation structure as `index.html`.

## Risks / Trade-offs

- [Compression vendor asset fails to load] -> Fall back to native gzip streams; use Base64 only below a strict size limit and otherwise report sharing failure.
- [Browser-scoped ownership is not an account-level authorization boundary] -> Treat controls as convenience ownership only; fail closed for legacy or unmatched records and never transmit the private ledger.
- [Remote feedback update races] -> Reuse pre-merge synchronization and identify records by immutable feedback ID.
- [Malformed shared payload] -> Validate type and required arrays, keep the selected planner view visible, and show a localized failure message rather than navigating Home.
- [Query URL handling differs from old links] -> Retain all old readers and test both new and legacy formats locally and after Surge deployment.

## Migration Plan

Deploy synchronized root and `deploy_live` assets with a new cache version. New shares use compact query URLs immediately; old hash links remain valid. On rollback, previously generated compact links may no longer decode, so the new decoder should remain in subsequent releases even if the sharing UI is changed.

## Open Questions

None.
