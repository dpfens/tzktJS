/// <reference path="types.ts"/>

interface GetQuoteParameters extends PaginationParameters, Sortable {
  level?: number;
  timestamp?: Date;
  select?: string;
}

/**
 * Quotes are prices of the Tezos token price.  For more information see the {@link https://api.tzkt.io/#tag/Quotes | Quotes API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 */
class Quote {
  level: number;
  timestamp: Date;
  btc: number;
  eur: number;
  usd: number;
  cny: number;
  jpy: number;
  krw: number;
  eth: number;

  /**
  * @internal
  */
  constructor(level: number, timestamp: Date, btc: number, eur: number, usd: number, cny: number, jpy: number, krw: number, eth: number) {
    this.level = level;
    this.timestamp = timestamp;
    this.btc = btc;
    this.eur = eur;
    this.usd = usd;
    this.cny = cny;
    this.jpy = jpy;
    this.krw = krw;
    this.eth = eth;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Quote {
    let level: number = data.level,
    timestamp: any = data.timestamp,
    btc: number = data.btc,
    eur: number = data.eur,
    usd: number = data.usd,
    cny: number = data.cny,
    jpy: number = data.jpy,
    krw: number = data.krw,
    eth: number = data.eth;
    if (timestamp) {
      timestamp = new Date(timestamp);
    }
    return new Quote(level, timestamp, btc, eur, usd, cny, jpy, krw, eth);
  }

  /**
  * Fetches last known quote from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the last known quote.
  * @see {@link https://api.tzkt.io/#operation/Quotes_GetLast | get last quote }.
  *
  * @example Fetch Last Price Quote
  * # Usage
  * ```typescript
  * let lastQuote: Quote = await Quote.last();
  * ```
  *
  */
  static async last(domain: string = 'https://api.tzkt.io'): Promise<Quote> {
    let url: string = `${domain}/v1/quotes/last`;
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Quote.fromAPI(data);
  }

  /**
  * Fetches a list of quotes aligned with blocks from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of quotes aligned with blocks.
  * @see {@link https://api.tzkt.io/#operation/Quotes_Get | get quotes }.
  *
  * @example Fetch List of Quotes
  * # Usage
  * ```typescript
  * let lowerBound: Date = new Date(2021, 0, 1);
  * let upperBound: Date = new Date(2021, 5, 1);
  * let parameters: GetQuoteParameters = {'timestamp.ge': lowerBound, 'timestamp.le': upperBound};
  * let quotes: Quote[] = await Quote.get(parameters);
  * ```
  *
  */
  static async get(parameters: GetQuoteParameters, domain: string = 'https://api.tzkt.io'): Promise<Quote[]> {
    let url: URL = new URL(`${domain}/v1/quotes`);
    url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Quote[] = [];
    for (var i = 0; i < data.length; i++) {
      var quote: Quote = Quote.fromAPI(data[i]);
      output.push(quote);
    };
    return output;
  }

  /**
  * Fetches total number of quotes aligned with blocks from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of quotes aligned with blocks.
  * @see {@link https://api.tzkt.io/#operation/Quotes_GetCount | get quotes count }.
  *
  * @example Fetch total number of quotes
  * # Usage
  * ```typescript
  * let quoteCount: number = await Quote.count();
  * ```
  *
  */
  static async count(domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: string = `${domain}/v1/quotes/count`;
    let response: Response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let value: string = await response.text();
    return parseInt(value);
  }
}
