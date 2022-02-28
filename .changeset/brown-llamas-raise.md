---
'braid-design-system': patch
---

---
updated:
  - Columns
---

**Columns:** Make child Column optional and default internally

As an optimisation to the default use of `Columns`, it is now only necessary use `Column` as a child element when customising the `width` property. If the use case is equally distributed columns, wrapping in `Columns` will now be enough.

**EXAMPLE USAGE:**
The following will now result in two columns equally distributed:
```jsx
<Columns space="medium">
  <Card>...</Card>
  <Card>...</Card>
</Columns>
```

or wrap a single child in a `Column` to customise it's width:

```jsx
<Columns space="medium">
  <Card>...</Card>
  <Card>...</Card>
  <Column width="content">
    <OverflowMenu />
  </Column>
</Columns>
```

**BREAKING CHANGE:**
This is only a breaking change if you have abstracted individual `Column` components into separate components. If you have, read on.

Given `Columns` wraps each child in a `Column` if it is not already an instance of one, this breaks any consumer that had previously abstracted a `Column` into its own component, e.g.

```tsx
const DateColumn = () => <Column width="content">...</Column>

const Page = () => (
  <Columns space="medium">
    <DateColumn />
    ...
  </Columns>
)
```

In this case, `Columns` cannot recognise `DateColumn` as a `Column` and would wrap it again, breaking the desired layout and not honouring the `width` prop. It is recommended as best practice that the layout is kept inline with the parent layout component (i.e. `Columns`), and the column content is abstracted to its own component, e.g.

```tsx
const DateColumn = () => <>...</>

const Page = () => (
  <Columns space="medium">
    <Column width="content">
      <DateColumn />
    </Column>
    ...
  </Columns>
)
```

**MIGRATION GUIDE:**
If you want to automate the removal of unneccessary `Column` components, you can run the Braid upgrade command, which will make a best-effort at removing these in the simple case.

```
yarn braid-upgrade v32 "**/*.{ts,tsx}"
```
