## Why

Surge can serve `200.html` for shared-link fallback navigation. The fallback document currently loads older cache-busted application scripts and omits the verified transit registry, so shared itinerary and route links can render stale or incomplete behavior.

## What Changes

- Synchronize the root and production fallback documents with the current `index.html` script set and cache versions.
- Keep the fallback document byte-identical to the primary document so both entry paths execute the same application.
- Add a regression check that fails when the fallback document diverges.

## Impact

- `200.html` and `deploy_live/200.html` fallback navigation.
- Share-link and route-registry behavior on Surge.
