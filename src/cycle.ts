/// <reference path="types.ts"/>

interface GetCycleParameters extends PaginationParameters, Sortable {
  snapshotIndex?: number;
  select?: string[];
  quote?: string;
}

/**
 * Cycles are segments of sequential blocks.  Cycles used as a measure of time on the {@link https://tezos.com/ | Tezos blockchain } where cycles are made up of 4096 blocks.  For more information see the {@link https://api.tzkt.io/#tag/Cycles | Cycles API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 * @remark phases in amendment voting are defined in cycles.
 */
class Cycle {
  index: number;
  firstLevel: number;
  startTime: Date;
  lastLevel: number;
  endTime: Date;
  snapshotIndex: number;
  snapshotLevel: number;
  randomSeed: string | null;
  totalBakers: number;
  totalRolls: number;
  totalStaking: number;
  totalDelegators: number;
  totalDelegated: number;
  quote: BalanceShort | null;

  /**
  * @internal
  */
  constructor (index: number, firstLevel: number, startTime: Date, lastLevel: number, endTime: Date, snapshotIndex: number, snapshotLevel: number, randomSeed: string | null, totalBakers: number, totalRolls: number, totalStaking: number, totalDelegators: number, totalDelegated: number, quote: BalanceShort | null) {
    this.index = index;
    this.firstLevel = firstLevel;
    this.startTime = startTime;
    this.lastLevel = lastLevel;
    this.endTime = endTime;
    this.snapshotIndex = snapshotIndex;
    this.snapshotLevel = snapshotLevel;
    this.randomSeed = randomSeed;
    this.totalBakers = totalBakers;
    this.totalRolls = totalRolls;
    this.totalStaking = totalStaking;
    this.totalDelegators = totalDelegators;
    this.totalDelegated = totalDelegated;
    this.quote = quote;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Cycle {
    let index = data.index,
    firstLevel = data.firstLevel,
    startTime = data.startTime,
    lastLevel = data.lastLevel,
    endTime = data.endTime,
    snapshotIndex = data.snapshotIndex,
    snapshotLevel = data.snapshotLevel,
    randomSeed = data.randomSeed,
    totalBakers = data.totalBakers,
    totalRolls = data.totalRolls,
    totalStaking = data.totalStaking,
    totalDelegators = data.totalDelegators,
    totalDelegated = data.totalDelegated,
    quote = data.quote;

    if(startTime) {
      startTime = new Date(startTime);
    }
    if (endTime) {
      endTime = new Date(endTime);
    }
    return new Cycle(index, firstLevel, startTime, lastLevel, endTime, snapshotIndex, snapshotLevel, randomSeed, totalBakers, totalRolls, totalStaking, totalDelegators, totalDelegated, quote);
  }

  /**
  * Fetches cycles from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of cycles.
  * @see {@link https://api.tzkt.io/#operation/Cycles_Get | get cycles }.
  *
  * @example Fetching/Filtering Cycles
  * # Usage
  * ## Filter by snapshotIndex range
  * ```typescript
  * let cycles: Cycles[] = await Cycle.get({'snapshotIndex.gt': 8, 'snapshotIndex.lt': 13});
  * ```
  *
  */
  static async get(parameters: GetCycleParameters | null, domain: string = 'https://api.tzkt.io'): Promise<Cycle[]> {
    let url: URL = new URL(`${domain}/v1/cycles`);
    if (parameters) {
      url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Cycle[] = [];
    for (var i = 0; i < data.length; i++) {
      var cycle: Cycle = Cycle.fromAPI(data[i]);
      output.push(cycle);
    };
    return output;
  }

  /**
  * Fetches a cycle at the specified index from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a cycle at the specified index.
  * @see {@link https://api.tzkt.io/#operation/Cycles_GetByIndex | get cycles by index }.
  *
  * @example Fetch a Cycle by Index
  * # Usage
  * ## Filter by Index
  * ```typescript
  * let cycle: Cycle = await Cycle.byIndex(370);
  * ```
  *
  */
  static async byIndex(index: number, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Cycle> {
    let url: URL = new URL(`${domain}/v1/cycles/${index}`);
    if (quote) {
      url.search = new URLSearchParams({'quote': quote}).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Cycle.fromAPI(data);
  }

  /**
  * Fetches a total number of cycles from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of cycles, including future cycles.
  * @see {@link https://api.tzkt.io/#operation/Cycles_GetCount | get cycles count }.
  *
  * @example Fetch Cycle Count
  * # Usage
  * ```typescript
  * let cycleCount: number = await Cycle.count();
  * ```
  */
  static async count(domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: string = `${domain}/v1/cycles/count`;
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
