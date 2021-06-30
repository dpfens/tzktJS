/// <reference path="types.ts"/>

interface GetSoftwareParameters extends PaginationParameters, Sortable {
  select?: string[];
}

/**
 * Software are node software versions for the {@link https://tezos.com/ | Tezos blockchain }.  For more information see the {@link https://api.tzkt.io/#tag/Software | Software API documentation } on {@link https://tzkt.io/ | tzKT }.
 */
class Software {
  shortHash: string | null;
  firstLevel: number | null;
  firstTime: Date | null;
  lastLevel: number | null;
  lastTime: Date | null;
  blocksCount: number;
  metadata: any;

  /**
  * @internal
  */
  constructor(shortHash: string | null, firstLevel: number | null, firstTime: Date | null, lastLevel: number | null, lastTime: Date | null, blocksCount: number, metadata: any) {
    this.shortHash = shortHash;
    this.firstLevel = firstLevel;
    this.firstTime = firstTime;
    this.lastLevel = lastLevel;
    this.lastTime = lastTime;
    this.blocksCount = blocksCount;
    this.metadata = metadata;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Software {
    let shortHash = data.shortHash,
    firstLevel = data.firstLevel,
    firstTime = data.firstTime,
    lastLevel = data.lastLevel,
    lastTime = data.lastTime,
    blocksCount = data.blocksCount,
    metadata = data.metadata;
    if (firstTime) {
      firstTime = new Date(firstTime);
    }
    if (lastTime) {
      lastTime = new Date(lastTime);
    }
    return new Software(shortHash, firstLevel, firstTime, lastLevel, lastTime, blocksCount, metadata);
  }

  /**
  * Fetches a list of baker software aligned with blocks from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of baker software.
  * @see {@link https://api.tzkt.io/#operation/Software_Get | get baker software }.
  *
  * @example Usage
  * # Fetch list of Software
  * ```typescript
  * let software: Software[] = await Software.get();
  * ```
  *
  */
  static async get(parameters: GetSoftwareParameters, domain: string = 'https://api.tzkt.io'): Promise<Software[]> {
    let url: URL = new URL(`${domain}/v1/software`);
    if(parameters) {
      let urlParameters: any = JSON.parse(JSON.stringify(parameters));
      url.search = new URLSearchParams(urlParameters).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Software[] = [];
    for (var i = 0; i < data.length; i++) {
      var software: Software = Software.fromAPI(data[i]);
      output.push(software);
    };
    return output;
  }

  /**
  * Fetches a number of software from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a number of software.
  * @see {@link https://api.tzkt.io/#operation/Software_GetCount | get software count }.
  *
  * @example Usage
  * # Fetch total number of Software
  * ```typescript
  * let softwareCount: number = await Software.count();
  * ```
  *
  */
  static async count(domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: string = `${domain}/v1/software/count`;
    let response: Response = await fetch(url, {
      method: 'GET',
    });
    let data = await response.text();
    return parseInt(data);
  }
}
