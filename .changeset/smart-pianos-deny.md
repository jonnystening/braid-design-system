---
'braid-design-system': minor
---

---
updated:
  - TextField
---

**TextField:** Add `highlightRanges` support

Provides support for highlighting a range of characters within the field, highlighting them with a `critical` tone.

**EXAMPLE USAGE:**
```jsx
<TextField
  highlightRanges={[{ start: 7, end: 20 }]}
/>
```
