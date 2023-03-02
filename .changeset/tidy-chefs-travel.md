---
'braid-design-system': patch
---

---
updated:
  - TextField
---

**TextField:** Highlight characters exceeding the `characterLimit`

Uses the new `highlightRanges` feature internally to highlight the characters that exceed the provided `characterLimit` in a critical tone. This aligns the behaviour with the `Textarea` component.

**EXAMPLE USAGE:**
```jsx
<TextField
  characterLimit={50}
/>
```
