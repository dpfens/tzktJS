/// <reference path="types.ts"/>


interface GetRightCountParameters {
  type?: BakingRightTypeParameter;
  baker?: string;
  cycle?: number;
  level?: number;
  slots?: number;
  priority?: number;
  status?: BakingRightStatusParameter;
}

interface GetRightsParameters extends PaginationParameters, Sortable {
  type?: BakingRightTypeParameter;
  baker?: string;
  cycle?: number;
  level?: number;
  slots?: number;
  priority?: number;
  status?: BakingRightStatusParameter;
  select?: string[];
}

/**
 * Rights are baking rights on the {@link https://tezos.com/ | Tezos blockchain }.  Some rights (ex. baking rights,  endorsing rights, etc.) are calculated based on the total balance that an account has been delegated to.  For more information see the {@link https://api.tzkt.io/#tag/Rights | Rights API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 */
class Right {
  public readonly type: string | null;
  public readonly cycle: number;
  public readonly level: number;
  public readonly timestamp: Date;
  public readonly priority: number | null;
  public readonly slots: number | null;
  public readonly baker: any | null;
  public readonly status: BakingRightStatusParameter | null;

  /**
  * @internal
  */
  constructor(type: string | null, cycle: number, level: number, timestamp: Date, priority: number | null, slots: number | null, baker: any | null, status: BakingRightStatusParameter | null) {
    this.type = type;
    this.cycle = cycle;
    this.level = level;
    this.timestamp = timestamp;
    this.priority = priority;
    this.slots = slots;
    this.baker = baker;
    this.status = status;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Right {
    let type = data.type,
    cycle = data.cycle,
    level = data.level,
    timestamp = data.timestamp,
    priority = data.priority,
    slots = data.slots,
    baker = data.baker,
    status = data.status;
    if (timestamp){
      timestamp = new Date(timestamp);
    }
    return new Right(type, cycle, level, timestamp, priority, slots, baker, status);
  }

  /**
  * Fetches baking rights from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of rights.
  * @see {@link https://api.tzkt.io/#operation/Rights_Get | get rights }.
  *
  * @example Usage
  * ```typescript
  * let type: string = 'baking';
  * let status: string = 'realized'
  * let parameters: GetRightsParameters = {'type': type, 'status': status};
  * let rights: Right[] = await Right.get(parameters);
  * ```
  *
  */
  static async get(parameters: GetRightsParameters, domain: string = 'https://api.tzkt.io'): Promise<Right[]> {
    let url: URL = new URL(`${domain}/v1/rights`);
    if(parameters) {
      url.search = new URLSearchParams(<any>parameters).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Right[] = [];
    for (var i = 0; i < data.length; i++) {
      var right: Right = Right.fromAPI(data[i]);
      output.push(right);
    };
    return output;
  }

  /**
  * Fetches total number of stored rights from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of stored rights.
  * @see {@link https://api.tzkt.io/#operation/Rights_GetCount | get rights count }.
  *
  * @example Usage
  * ```typescript
  * let type: string = 'baking';
  * let status: string = 'realized'
  * let parameters: GetRightsParameters = {'type': type, 'status': status};
  * let rightCount: number = await Right.count(parameters);
  * ```
  *
  */
  static async count(parameters: GetRightCountParameters | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: URL = new URL(`${domain}/v1/rights/count`);
    if(parameters) {
      url.search = new URLSearchParams(<any>parameters).toString();
    }
    let response: Response = await fetch(<any>url, {
      method: 'GET',
    });
    let data = await response.text();
    return parseInt(data);
  }
}
