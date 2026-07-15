## Why

Companion rooms loaded from the production Worker use string IDs, while room-card actions convert those IDs to numbers. After the mandatory remote refresh, strict ID comparison fails and the join action exits without opening chat.

## What Changes

- Treat companion room identifiers as opaque strings throughout join, edit, delete, membership, and restored-session flows.
- Serialize remote room reads and writes so background refreshes cannot undo a just-completed join.
- Preserve compatibility with older locally stored numeric room IDs.
- Add regression coverage for room actions after server serialization.
- Redeploy and verify creation, entry, chat rendering, and cleanup on the live site.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `shared-companion-backend`: shared rooms remain actionable after IDs pass through the Worker/D1 serialization boundary.

## Impact

- Frontend companion room action handlers and saved joined-room state.
- Root and `deploy_live` application bundles.
- Browser verification and frontend regression checks.
