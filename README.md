# Helpers

Helpers is a collection of TypeScript helper functions I use commonly throughout applications.

## Install

```bash
$ npm install @xlexiwolf/helpers
```

## Helper Functions

### mapObject

Works just like ES6 array.map() but for objects.

```tsx
const cardOutput = mapObject(cards, ({name, email}, k) => (
  <Card key={k} name={name} email={email} />
))
```

### toCurrencyString

Formats a number and returns it as a currency string.

```ts
const totalPrice = toCurrencyString(total * vat)
```