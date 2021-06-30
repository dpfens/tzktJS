/// <reference path="types.ts"/>

interface GetStatisticParameters extends PaginationParameters, Sortable {
  level?: number;
  timestamp?: Date;
  select?: string;
  quote?: string;
}

interface GetDailyStatisticParameters extends PaginationParameters, Sortable {
  date?: Date;
  select?: string[];
  quote?: string;
}

interface GetCyclicStatisticParameters extends PaginationParameters, Sortable {
  cycle?: number;
  select?: string;
  quote?: string;
}

/**
 * Statistics are data points describing states of the {@link https://tezos.com/ | Tezos blockchain }.  For more information see the {@link https://api.tzkt.io/#tag/Statistics | Statistics API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 */
class Statistics {
  cycle: number | null;
  date: Date | null;
  level: number;
  timestamp: Date;
  totalSupply: number;
  circulatingSupply: number;
  totalBootstrapped: number;
  totalCommitments: number;
  totalActivated: number;
  totalCreated: number;
  totalBurned: number;
  totalVested: number;
  totalFrozen: number;
  quote: BalanceShort | null;

  /**
  * @internal
  */
  constructor(cycle: number | null, date: Date | null, level: number, timestamp: Date, totalSupply: number, circulatingSupply: number, totalBootstrapped: number, totalCommitments: number, totalActivated: number, totalCreated: number, totalBurned: number, totalVested: number, totalFrozen: number, quote: BalanceShort | null) {
    this.cycle = cycle;
    this.date = date;
    this.level = level;
    this.timestamp = timestamp;
    this.totalSupply = totalSupply;
    this.circulatingSupply = circulatingSupply;
    this.totalBootstrapped = totalBootstrapped;
    this.totalCommitments = totalCommitments;
    this.totalActivated = totalActivated;
    this.totalCreated = totalCreated;
    this.totalBurned = totalBurned;
    this.totalVested = totalVested;
    this.totalFrozen = totalFrozen;
    this.quote = quote;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Statistics {
    let cycle: number | null = data.cycle,
    date: any = data.date,
    level: number = data.level,
    timestamp: any = data.timestamp,
    totalSupply: number = data.totalSupply,
    circulatingSupply: number = data.circulatingSupply,
    totalBootstrapped: number = data.totalBootstrapped,
    totalCommitments: number = data.totalCommitments,
    totalActivated: number = data.totalActivated,
    totalCreated: number = data.totalCreated,
    totalBurned: number = data.totalBurned,
    totalVested: number = data.totalVested,
    totalFrozen: number = data.totalFrozen,
    quote: BalanceShort | null = data.quote;
    if (date) {
      date = new Date(data.date);
    }
    if (data.timestamp) {
      timestamp = new Date(data.timestamp);
    }
    return new Statistics(cycle, date, level, timestamp, totalSupply, circulatingSupply, totalBootstrapped, totalCommitments, totalActivated, totalCreated, totalBurned, totalVested, totalFrozen, quote);
  }

  /**
  * Fetches end-of-block statistics from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of end-of-block statistics.
  * @see {@link https://api.tzkt.io/#operation/Statistics_Get | get statistics }.
  *
  * @example Fetch Statistics
  * # Fetch list of Statistics
  * ```typescript
  * let lowerBound: Date = new Date(2021, 0, 1);
  * let upperBound: Date = new Date(2021, 5, 1);
  * let parameters: GetStatisticParameters = {'timestamp.gt': lowerBound, 'timestamp.lt': upperBound};
  * let statistics: Statistics[] = await Statistics.get(parameters);
  * ```
  *
  */
  static async get(parameters: GetStatisticParameters, domain: string = 'https://api.tzkt.io'): Promise<Statistics[]> {
    let url: URL = new URL(`${domain}/v1/statistics`),
        urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    url.search = new URLSearchParams(urlParameters).toString();
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Statistics[] = [];
    for (var i = 0; i < data.length; i++) {
      var statistics: Statistics = Statistics.fromAPI(data[i]);
      output.push(statistics);
    };
    return output;
  }

  /**
  * Fetches end-of-day statistics from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of end-of-day statistics.
  * @see {@link https://api.tzkt.io/#operation/Statistics_GetDaily | get daily statistics }.
  *
  * @example Fetch Daily Statistics
  * # Fetch list of daily Statistics
  * ```typescript
  * let lowerBound: Date = new Date(2021, 0, 1);
  * let upperBound: Date = new Date(2021, 5, 1);
  * let parameters: GetStatisticParameters = {'timestamp.gt': lowerBound, 'timestamp.lt': upperBound};
  * let statistics: Statistics[] = await Statistics.daily(parameters);
  * ```
  *
  */
  static async daily(options: GetDailyStatisticParameters | null, domain: string = 'https://api.tzkt.io'): Promise<Statistics[]> {
    var url: URL = new URL(`${domain}/v1/statistics/daily`);
    if (options) {
      let parameters: any = JSON.parse(JSON.stringify(options));
      if (options.date) {
        parameters.date = parameters.date.toISOString().split('T')[0];
      }
      url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Statistics[] = [];
    for (var i = 0; i < data.length; i++) {
      var statistics: Statistics = Statistics.fromAPI(data[i]);
      output.push(statistics);
    };
    return output;
  }

  /**
  * Fetches end-of-cycle statistics. from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of end-of-cycle statistics.
  * @see {@link https://api.tzkt.io/#operation/Statistics_GetCyclesAll | get cyclic statistics }.
  *
  * @example Fetch End-of-Cycle Statistics
  * ```typescript
  * let statistics: Statistics[] = await Statistics.cyclic();
  * ```
  *
  */
  static async cyclic(parameters: GetCyclicStatisticParameters | null, domain: string = 'https://api.tzkt.io'): Promise<Statistics[]> {
    let url: URL = new URL(`${domain}/v1/statistics/cyclic`);
    if(parameters) {
      url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Statistics[] = [];
    for (var i = 0; i < data.length; i++) {
      var statistics: Statistics = Statistics.fromAPI(data[i]);
      output.push(statistics);
    };
    return output;
  }

  /**
  * Fetches statistics at the end of a head block from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns statistics at the end of a head block.
  * @see {@link https://api.tzkt.io/#operation/Statistics_GetCycles | get current statistics }.
  *
  * @example Fetch Current Statistics
  * ```typescript
  * let statistics: Statistics = await Statistics.current();
  * ```
  *
  */
  static async current(select: string | null, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Statistics> {
    let url: URL = new URL(`${domain}/v1/statistics/current`);
    let parameters: any = {};
    if (select) {
      parameters.select = select;
    }
    if (quote) {
      parameters.quote = quote;
    }
    url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Statistics.fromAPI(data);
  }
}
