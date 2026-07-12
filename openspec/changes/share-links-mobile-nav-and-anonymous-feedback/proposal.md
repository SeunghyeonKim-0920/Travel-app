## Why

Shared itinerary and intercity route links must restore the generated experience on the device that opens them. On mobile, those links currently fall back to the home view, anonymous feedback cannot be submitted, and the icon-only navigation makes the route planner difficult to identify.

## What Changes

- Make feedback nickname entry optional and submit empty-nickname feedback under a localized anonymous label.
- Make itinerary and intercity route share payloads robust across mobile URL handling and restore the correct planner view, state, and language when opened.
- Replace the ambiguous intercity route walking icon with a map/route icon.
- Show compact, localized labels in the mobile bottom navigation so every destination, including the route planner, is identifiable without relying on the icon alone.
- Keep the root application and `deploy_live` copies synchronized.

## Capabilities

### New Capabilities
- `anonymous-feedback`: Submit feedback without requiring a nickname and display a localized anonymous identity.
- `share-link-restoration`: Encode, decode, and restore shared itinerary and intercity route links reliably on desktop and mobile.
- `mobile-navigation-clarity`: Provide intuitive route-planner iconography and visible localized mobile navigation labels.

### Modified Capabilities

## Impact

- Frontend markup and responsive styles in `index.html` and `style.css`.
- Shared-link encoding, decoding, and view restoration in `app.js` and `route_optimizer.js`.
- Localized UI strings in `app.js`.
- Static deployment mirror under `deploy_live`.
- Browser verification for feedback submission, shared links, mobile layout, and navigation view switching.
