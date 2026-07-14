## Why

Several supported destinations still produce sparse multi-day itineraries even when important in-city landmarks or realistic nearby excursions are available. Berlin exposes the failure clearly: major sights can be absent and later days can contain no sightseeing, while legacy test feedback remains visible on the production homepage.

## What Changes

- Expand Berlin's curated attraction pool with its highest-priority landmarks, major public squares, museums, neighbourhood stops, and Markthalle Neun.
- Add Berlin nearby-day options that are realistic from the city and schedule at most one or two only after ordinary Berlin sightseeing is exhausted.
- Strengthen itinerary completion so all supported cities use remaining verified in-city attractions before eligible nearby trips, without forcing every requested day to be filled.
- Add a full-catalog coverage audit for sparse days, duplicate places, early landmark priority, and excessive nearby-day usage.
- Preserve the already-added individual Interlaken regional stops and the Rome, Seoul, and Los Angeles homepage destination cards.
- Remove the two legacy test feedback entries without deleting normal user-submitted feedback.
- Synchronize production assets, deploy to Surge, and verify the live application.

## Capabilities

### New Capabilities
- `sparse-itinerary-completion`: Defines how multi-day itineraries prioritize verified city sightseeing and selectively use nearby excursions when later days would otherwise be empty.
- `featured-destinations`: Defines the required homepage popular-destination set and its responsive presentation.

### Modified Capabilities
- `curated-place-integrity`: Adds city-wide coverage, Berlin landmark completeness, duplicate prevention, and nearby-trip plausibility requirements.
- `owned-feedback-management`: Removes identified legacy test feedback while preserving real feedback ownership, editing, deletion, and persistence.

## Impact

- Itinerary data and scheduling in `city_course_patch.js` and `app.js`.
- Automated coverage checks in `verify_travel_data_integrity.js` and a dedicated catalog audit.
- Homepage destination rendering and feedback migration in `app.js`.
- Matching runtime files and assets under `deploy_live`.
- Production data stored through the existing Mockbolt synchronization endpoint.
