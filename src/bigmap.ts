/// <reference path="types.ts"/>

interface GetBigMapParameters extends PaginationParameters, Sortable {
  contract?: AccountTypeParameter;
  path?: string;
  tags?: string[];
  active?: boolean;
  lastLevel?: number;
  select?: string[];
  micheline?: number;
};

interface GetBigMapUpdatesParameters extends PaginationParameters, Sortable {
  bigmap?: number;
  contract?: AccountTypeParameter;
  path?: string;
  tags?: string[];
  action?: any[];
  value?: any;
  level?: number;
  micheline?: number;
};

/**
 * Endpoints for fetching BigMaps.  For more information see the {@link https://api.tzkt.io/#tag/BigMaps | BigMap API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 * BigMaps are data storage structures on the {@link https://tezos.com/ | Tezos blockchain }.
 */
class BigMap {
  public readonly ptr: number;
  public readonly contract: string | null;
  public readonly path: string | null;
  public readonly tags: string[] | null;
  public readonly active: boolean;
  public readonly firstLevel: number;
  public readonly lastLevel: number;
  public readonly totalKeys: number;
  public readonly activeKeys: number;
  public readonly updates: number;
  public readonly keyType: any | null;
  public readonly valueType: any | null;

  constructor (ptr: number, contract: string | null, path: string | null, tags: string[] | null, active: boolean, firstLevel: number, lastLevel: number, totalKeys: number, activeKeys: number, updates: number, keyType: any | null, valueType: any | null) {
    this.ptr = ptr;
    this.contract = contract;
    this.path = path;
    this.tags = tags;
    this.active = active;
    this.firstLevel = firstLevel;
    this.lastLevel = lastLevel;
    this.totalKeys = totalKeys;
    this.activeKeys = activeKeys;
    this.updates = updates;
    this.keyType = keyType;
    this.valueType = valueType;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): BigMap {
    let ptr = data.ptr;
    let contract = data.contract;
    let path = data.path;
    let tags = data.tags;
    let active = data.active;
    let firstLevel = data.firstLevel;
    let lastLevel = data.lastLevel;
    let totalKeys = data.totalKeys;
    let activeKeys = data.activeKeys;
    let updates = data.updates;
    let keyType = data.keyType;
    let valueType = data.valueType;
    return new BigMap(ptr, contract, path, tags, active, firstLevel, lastLevel, totalKeys, activeKeys, updates, keyType, valueType);
  }

  /**
  * Fetches a list of bigmaps from {@link https://tzkt.io/ | tzKT }.
  *
  * @returns Returns a list of bigmaps.
  * @public
  *
  * @see {@link https://api.tzkt.io/#operation/BigMaps_GetBigMaps | get bigmaps }.
  */
  static async get(parameters: GetBigMapParameters, domain: string = 'https://api.tzkt.io'): Promise<BigMap[]> {
    let url: URL = new URL(`${domain}/v1/bigmaps`);
    url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: BigMap[] = [];
    for (var i = 0; i < data.length; i++) {
      var bigMap: BigMap = BigMap.fromAPI(data[i]);
      output.push(bigMap);
    };
    return output;
  }

  /**
  * Fetches bigmap by ID from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the bigmap corresponding to the given ID.
  * @see {@link https://api.tzkt.io/#operation/BigMaps_GetBigMapById | get bigmap by ID }.
  */
  static async byID(id: number, micheline: number=0, domain: string = 'https://api.tzkt.io'): Promise<BigMap> {
    let url: URL = new URL(`${domain}/v1/bigmaps/${id}`);
    let queryParameters: any = {'micheline': micheline.toString() };
    url.search = new URLSearchParams(queryParameters).toString();
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return BigMap.fromAPI(data);;
  }
}


class BigMapType {
  public readonly prim: number;
  public readonly args: object[] | null;
  public readonly annots: object[] | null;

  constructor(prim: number, args: object[] | null, annots: object[] | null) {
    this.prim = prim;
    this.args = args;
    this.annots = annots;
  }
  /**
  * @internal
  */
  static fromAPI(data: any): BigMapType {
    let prim: number = data.prim,
    args: object[] | null = data.args,
    annots: object[] | null = data.annots;
    return new BigMapType(prim, args, annots);
  }

  /**
  * Fetches bigmap types from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns bigmap types
  * @see {@link https://api.tzkt.io/#operation/BigMaps_GetBigMapType | get bigmap types }.
  */
  static async get(id: number, domain: string = 'https://api.tzkt.io'): Promise<BigMapType> {
    let url: string = `${domain}/v1/bigmaps/${id}/type`;
    let response: Response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return BigMapType.fromAPI(data);
  }
}


class BigMapUpdate {
  id: number;
  level: number;
  timestamp: Date;
  bigmap: number;
  contract: any;
  path: string;
  action: string;
  content: any;

  constructor(id: number, level: number, timestamp: Date, bigmap: number, contract: any, path: string, action: string,   content: any) {
    this.id = id;
    this.level = level;
    this.timestamp = timestamp;
    this.bigmap = bigmap;
    this.contract = contract;
    this.path = path;
    this.action = action;
    this.content = content;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): BigMapUpdate {
    let id: number = data.id,
    level: number = data.level,
    timestamp: any = data.timestamp,
    bigmap: number = data.bigmap,
    contract: any = data.contract,
    path: string = data.path,
    action: string = data.action,
    content: any = data.content;
    if (timestamp) {
      timestamp = new Date(timestamp);
    }
    return new BigMapUpdate(id, level, timestamp, bigmap, contract, path, action, content);
  }
}


class BigMapKey {
  id: number;
  active: boolean;
  hash: string | null;
  key: any | null;
  value: any | null;
  firstLevel: number;
  lastLevel: number;
  updates: number;

  /**
  * @internal
  */
  constructor(id: number, active: boolean, hash: string | null, key: any | null, value: any | null, firstLevel: number, lastLevel: number, updates: number) {
    this.id = id;
    this.active = active;
    this.hash = hash;
    this.key = key;
    this.value = value;
    this.firstLevel = firstLevel;
    this.lastLevel = lastLevel;
    this.updates = updates;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): BigMapKey {
    let id: number = data.id,
    active: boolean = data.active,
    hash: string | null = data.hash,
    key: any | null = data.key,
    value: any | null = data.value,
    firstLevel: number = data.firstLevel,
    lastLevel: number = data.lastLevel,
    updates: number = data.updates;
    return new BigMapKey(id, active, hash, key, value, firstLevel, lastLevel, updates);
  }

  /**
  * Fetches bigmap key by bigmap from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns bigmap keys
  * @see {@link https://api.tzkt.io/#operation/BigMaps_GetKeys| get bigmap keys }.
  */
  static async byBigMap(bigMapId: string, parameters: any | null, domain: string = 'https://api.tzkt.io'): Promise<BigMapKey[]> {
    let url: URL = new URL(`${domain}/v1/bigmaps/${bigMapId}/keys`);
    url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    let response: Response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    let output: BigMapKey[] = [];
    for (var i = 0; i < data.length; i++) {
      let bigMapKey = BigMapKey.fromAPI(data[i]);
      output.push(bigMapKey);
    }
    return output;
  }

  /**
  * Fetches bigmap key by key from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns bigmap key
  * @see {@link https://api.tzkt.io/#operation/BigMaps_GetKey | get bigmap key }.
  */
  static async byKey(bigMapId: string, key: number, domain: string = 'https://api.tzkt.io'): Promise<BigMapKey> {
    let url: URL = new URL(`${domain}/v1/bigmaps/${bigMapId}/keys/${key}`);
    let response: Response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return BigMapKey.fromAPI(data);
  }
}
