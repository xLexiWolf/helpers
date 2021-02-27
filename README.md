# Helpers

Helpers is a collection of TypeScript helper functions I use commonly throughout applications.

## Install

```bash
$ npm install @xlexiwolf/helpers
```

## Helper Functions

### encrypt

Encrypts a string.

```ts
console.log(encrypt('secret', 'Hello world!'))
```

### decrypt

Decrypts a string.

```ts
console.log(decrypt('secret', 'KwQCCBZDNgEWFQdA'))
```

### formatDate

Changes date from SQL to UK format.

```ts
const formattedDate = formatDate(data.date, '/')
```

### getDate

Gets current date.

```ts
const date = getDate('/')
```

### getDateDifference

Gets the difference in a date to now.

```ts
const difference = getDateDifference(date)
```

### getTime

Gets current Time.

```ts
const time = getTime()
```

### getTrafficColor

Gets traffic light color based on percent.

```ts
const color = getTrafficColor(passed, total)
```

### leadingZero

Adds leading zero to number.

```ts
const formattedNumber = leadingZero(1)
```

### mapObject

Works just like ES6 array.map() but for objects.

```tsx
const cardOutput = mapObject(cards, ({name, email}, k) => (
  <Card key={k} name={name} email={email} />
))
```

### scrollToTop

Smooth scrolls to the top of the window.

```tsx
const button = <button onClick={scrollToTop}>Back to top</button>
```

### toCurrencyString

Formats a number and returns it as a currency string.

```ts
const totalPrice = toCurrencyString(total * vat)
```
