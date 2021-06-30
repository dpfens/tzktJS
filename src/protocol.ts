/// <reference path="types.ts"/>


interface GetProtocolParameters extends PaginationParameters, Sortable {
  offset?: number;
  limit?: number;
}

/**
 * Protocols define the application running on the {@link https://tezos.com/ | Tezos blockchain }.  For more information see the {@link https://api.tzkt.io/#tag/Protocols | Protocols API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 * @remark Protocols can be upgraded without interrupting or forking the blockchain.
 */
class Protocol {
  public readonly code: number;
  public readonly hash: string | null;
  public readonly firstLevel: number;
  public readonly lastLevel: number | null;
  public readonly constants: any[] | null;
  public readonly metadata: any | null;

  /**
  * @internal
  */
  constructor(code: number, hash: string | null, firstLevel: number, lastLevel: number | null, constants: any[] | null, metadata: any | null) {
    this.code = code;
    this.hash = hash;
    this.firstLevel = firstLevel;
    this.lastLevel = lastLevel;
    this.constants = constants;
    this.metadata = metadata;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Protocol {
    let code = data.code,
        hash = data.hash,
        firstLevel = data.firstLevel,
        lastLevel = data.lastLevel,
        constants = data.constants,
        metadata = data.metadata;
    return new Protocol(code, hash, firstLevel, lastLevel, constants, metadata);
  }

  /**
  * Fetches a number of protocols from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of protocols.
  * @see {@link https://api.tzkt.io/#operation/Protocols_GetCount | get protocols count }.
  *
  * @example Fetch Protocol Count
  * # Usage
  * ```typescript
  * let protocolCount: number = await Protocol.count();
  * ```
  *
  */
  static async count(domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: string = `${domain}/v1/protocols/count`;
    let response: Response = await fetch(url, {
      method: 'GET',
    });
    let data = await response.text();
    return parseInt(data);
  }

  /**
  * Fetches protocols from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of protocols.
  * @see {@link https://api.tzkt.io/#operation/Protocols_Get | get protocols }.
  *
  * @example Fetch Protocols
  * # Usage
  * ```typescript
  * let protocols: Protocol[] = await Protocol.get();
  * ```
  *
  */
  static async get(parameters: GetProtocolParameters | null, domain: string = 'https://api.tzkt.io'): Promise<Protocol[]> {
    let url: URL = new URL(`${domain}/v1/protocols`);
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
    var output: Protocol[] = [];
    for (var i = 0; i < data.length; i++) {
      var protocol: Protocol = Protocol.fromAPI(data[i]);
      output.push(protocol);
    };
    return output;
  }

  /**
  * Fetches protocols by proto code from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a protocol with the specified proto code.
  * @see {@link https://api.tzkt.io/#operation/Protocols_GetByCode | get protocol by code }.
  *
  * @example Fetch Protocol By Code
  * # Usage
  * ```typescript
  * let protocol: Protocol = await Protocol.byCode(0);
  * ```
  *
  */
  static async byCode(code: number, domain: string = 'https://api.tzkt.io'): Promise<Protocol> {
    let url: string = `${domain}/v1/voting/protocols/${code}`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Protocol.fromAPI(data);
  }

  /**
  * Fetches protocols with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a protocol with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Protocols_GetByHash | get protocol by hash }.
  *
  * @example Fetch Protocol By Hash
  * # Usage
  * ```typescript
  * let hash: string = 'Ps9mPmXaRzmzk35gbAYNCAw6UXdE2qoABTHbN2oEEc1qM7CwT9P';
  * let protocol: Protocol = await Protocol.byHash(hash);
  * ```
  *
  */
  static async byHash(hash: string, domain: string = 'https://api.tzkt.io'): Promise<Protocol> {
    let url: string = `${domain}/v1/voting/protocols/${hash}`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Protocol.fromAPI(data);
  }

  /**
  * Fetches protocols at the specified cycle from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a protocol at the specified cycle.
  * @see {@link https://api.tzkt.io/#operation/Protocols_GetByCycle | get protocol by cycle }.
  *
  * @example Fetch Protocol By Cycle
  * # Usage
  * ```typescript
  * let cycle: number = 30000;
  * let protocol: Protocol = await Protocol.byCycle(cycle);
  * ```
  *
  */
  static async byCycle(cycle: number, domain: string = 'https://api.tzkt.io'): Promise<Protocol> {
    let url: string = `${domain}/v1/protocols/cycles/${cycle}`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Protocol.fromAPI(data);
  }

  /**
  * Fetches the current protocol from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the current protocol
  * @see {@link https://api.tzkt.io/#operation/Protocols_GetCurrent | get current protocol }.
  *
  * @example Fetch Current Protocol
  * # Usage
  * ```typescript
  * let currentProtocol: Protocol = await Protocol.current();
  * ```
  *
  */
  static async current(domain: string = 'https://api.tzkt.io'): Promise<Protocol> {
    let url: string = `${domain}/v1/protocols/current`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Protocol.fromAPI(data);
  }

  /**
  * Suggests known protocols by part of alias. This endpoint is useful for autocomplete.
  *
  * @returns proposal suggestions.
  * @see {@link https://api.tzkt.io/#operation/Suggest_GetProtocols | Suggest protocols }
  *
  * @example Fetch Protocol Suggestions
  * # Usage
  * ```typescript
  * let suggestions: any[] = await Protocol.suggestions('Flo');
  * ```
  *
  * @public
  */
  static async suggestions(query: string, domain: string = 'https://api.tzkt.io'): Promise<any[]> {
    let url: string = `${domain}/v1/suggest/protocols/${query}`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  }
}
