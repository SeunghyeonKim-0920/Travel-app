## Design

Use the already verified `index.html` as the canonical entry document. Copy its contents to both fallback locations rather than maintaining a second script list. The existing share-link restoration logic remains unchanged; this change only ensures the fallback loads the same resources and cache-busted versions.

The share/mobile verification script will retain a byte-equality assertion between `index.html` and `200.html`, making future deployment drift visible in CI or local verification.
