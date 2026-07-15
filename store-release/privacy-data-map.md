# Privacy And Data Safety Working Map

This document supports, but does not replace, the declarations entered by the account owner in App Store Connect and Google Play Console.

| Data | Where processed | Purpose | User control |
| --- | --- | --- | --- |
| Nickname, age range, languages, gender option, travel preferences, photo | Device storage; selected public fields are included with companion-room activity | Profile and companion matching | Edit profile; reset photo; request shared-data deletion through support |
| Companion room date, time, place, preferences and participants | Cloudflare Worker/D1 | Publish, join, and expire companion rooms | Creator can manage room; expired rooms are cleanup candidates; support deletion request |
| Chat messages | Cloudflare Worker/D1 | In-room communication | Leave room; request deletion/support review |
| Feedback and optional nickname | Cloudflare Worker/D1 | Product feedback and translation | Author can edit or delete feedback |
| City addition requests | Cloudflare Worker/D1 | Destination coverage requests | Support deletion request |
| Itinerary, cities, dates, lodging/start point and preferences | Primarily device storage and encoded share links | Create, save, download, and share plans | Delete saved plan/app data; do not share the link |
| Place and route queries | OpenStreetMap/OSRM and configured transport providers | Geocoding and route calculation | Necessary for requested map/route operation |
| Basic request metadata such as IP address | Hosting/API providers | Delivery, abuse prevention, and operational logs | Provider retention applies; contact support for questions |

## Current SDK and business model notes

- No advertising SDK is bundled.
- No analytics SDK is bundled in the native project.
- The app does not sell personal data.
- HTTPS is required by the native configuration.
- Profile photos are stored as data URLs and may increase on-device storage use.

## Declarations requiring owner review

- Confirm Cloudflare and Surge retention/log settings before answering retention questions.
- Confirm whether companion-room profile fields are linked to a persistent identity in production.
- Confirm the exact deletion service-level objective.
- Re-evaluate this map whenever authentication, analytics, advertising, payments, crash reporting, push notifications, or a new route provider is added.

