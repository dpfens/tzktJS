# tzktJS
A Promise-based Typescript wrapper for the [tzKT API](https://tzkt.io/).

# Module Usage
Create the following `main.js` file for your project:

```javascript
import * as tzkt from "./dist/modules/quote";

let quote = await Quote.last();
console.log(quote);```
which should produce output similar to the following:
```json
{
    "level": 1540039,
    "timestamp": "2021-07-02T06:12:18.000Z",
    "btc": 0.00008502634076488495,
    "eur": 2.364919870348515,
    "usd": 2.8003953491122076,
    "cny": 18.147962059921642,
    "jpy": 312.4811815749048,
    "krw": 3176.293749811731,
    "eth": 0.0013720118075705567
}
```

Then add it as a module to your markup:
```html
<html>
    ...
    <script type="module" src="dist/modules/quote."></script>
    ...
</html>
```

Alternatively, the `tzkt.js` can be included instead:
```html
<script type="text/javascript" src="dist/tzkt.js"></script>
```

### Pagination
While tzKT offers multiple ways of paginating, this wrapper implementation paginates using `offset` and `limit` values.

Here is an example of how to paginate through all Tezos accounts:
```typescript
let accounts: Account[] = [],
    parameters: PaginationParameters = {
      'limit': 10000,
      'offset': 0
    },
    page: Account[] = await Account.get(parameters);
while (page.length) {
  parameters.offset += page.length,
  page = await Account.get(parameters);
  for (var i = 0; i < page.length; i++) {
    accounts.push(page[i]);
  }
}
console.log(accounts);
```

### Using modifiers
Currently this library does not have full support for parameter modifiers (ex. `eq`, `ne`, `gt`, `ge`, `lt`, `le`, `in`, `ni`).  This means:

*  In the case of `Date` parameters, developers must convert the `Date` instance to a `string` (using `toISOString`) when using modifiers, instead of passing in a `Date` instance:
   ```typescript
   let valentinesDay: Date = new Date(2021, 1, 14),
       parameters: GetQuoteParameters = {'timestamp.gt': valentinesDay.toISOString()},
       quotes: Quote[] = await Quote.get(parameters);
   ```

### Changing Networks
To change the network the API runs against, change the `domain` argument in the function/method to use a different base URL listed on the [tzKT API home page](https://api.tzkt.io/#section/Introduction).

```typescript
let lastQuote: Quote = await Quote.last('https://api.florencenet.tzkt.io')
```
