## Context

Room IDs originate as numeric timestamps in the browser but are normalized to strings by the Worker. Room-card handlers currently parse DOM IDs as numbers, and `joinCompanionRoom` refreshes remote state before doing a strict equality lookup. The lookup therefore fails after production serialization. A second issue allows background pulls to race membership writes and briefly restore the pre-join member list, which can return the traveler to the room list after the first click.

## Goals / Non-Goals

**Goals:**
- Make every companion room action work with numeric legacy IDs and string server IDs.
- Keep one canonical string ID in restored joined-room state.
- Preserve current room, chat, and sync payload formats.

**Non-Goals:**
- Change D1 schema or Worker endpoints.
- Change room permissions, matching, or chat design.

## Decisions

- Add a small `roomIdsEqual` helper that compares non-null IDs through `String(...)`.
- Pass raw `data-room-id` values from DOM handlers instead of `parseInt`.
- Store restored and newly joined room IDs as strings.
- Use the helper at every room lookup/filter boundary, including edit, delete, creator update, kick, and delayed chat checks.
- Serialize remote reads and writes through one promise queue so a stale pull cannot overwrite an in-flight membership update.

This keeps compatibility with old numeric localStorage without migrating D1 or rewriting room records.

## Risks / Trade-offs

- [Risk] An empty or missing ID could stringify to an unintended value. -> The helper rejects null, undefined, and empty IDs.
- [Risk] A missed strict comparison could leave another action broken. -> Static regression checks cover all known room action boundaries and Playwright exercises the live join flow.
- [Risk] Serializing sync operations can delay a later refresh behind an active write. -> Operations remain short and ordered, favoring correct membership state over overlapping requests.
