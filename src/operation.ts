/// <reference path="types.ts"/>

interface GetByAddressParameters extends Sortable {
  type?: string;
  initiator?: string;
  target?: string;
  prevDelegate?: string;
  newDelegate?: string;
  contractManager?: string;
  contractDelegate?: string;
  originatedContract?: string;
  accuser?: string;
  offender?: string;
  baker?: string;
  level?: number;
  timestamp?: Date;
  entrypoint?: string;
  parameter?: any;
  status?: string;
  lastId?: number;
  limit?: number;
  micheline?: number;
  quote?: string;
}

interface GetEndorsementsParameters extends PaginationParameters, Sortable {
  delegate?: string;
  level?: number;
  timestamp?: Date;
  select?: string[];
  quote?: string;
}

/**
 * Operations are actions that can/have been taken on the {@link https://tezos.com/ | Tezos blockchain }.  Operations can include transactions, activations, originations, accusations, and delegations and more.  For more information on the endpoints see the {@link https://api.tzkt.io/#tag/Operations | Operations API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 */
class Operation {
  public readonly type: string | null;
  public readonly id: number;
  public readonly level: number;
  public readonly timestamp: Date;
  public readonly block: string | null;
  public readonly hash: string | null;
  public readonly delegate: string | null;
  public readonly slots: number;
  public readonly deposit: number;
  public readonly rewards: number;
  public readonly quote: BalanceShort | null;

  /**
  * @internal
  */
  constructor(type: string | null, id: number, level: number, timestamp: Date, block: string | null, hash: string | null, delegate: string | null, slots: number, deposit: number, rewards: number, quote: BalanceShort | null) {
    this.type = type;
    this.id = id;
    this.level = level;
    this.timestamp = timestamp;
    this.block = block;
    this.hash = hash;
    this.delegate = delegate;
    this.slots = slots;
    this.deposit = deposit;
    this.rewards = rewards;
    this.quote = quote;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Operation {
    let type: string | null = data.type,
        id: number = data.id,
        level: number = data.level,
        timestamp: Date = data.timestamp,
        block: string | null = data.blocks,
        hash: string | null = data.hash,
        delegate: string | null = data.delegate,
        slots: number = data.slots,
        deposit: number = data.deposit,
        rewards: number = data.rewards,
        quote: BalanceShort | null = data.quote;
    return new Operation(type, id, level, timestamp, block, hash, delegate, slots, deposit, rewards, quote);
  }

  /**
  * Fetches an operation with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns an operation with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetByHash | get operations by hash }.
  *
  * @example Fetch Operation by Hash
  * # Usage
  * ```typescript
  * let hash: string = 'ooQf6zZhvkydbx48hJeZzG8uW1VGL6aR354F5asvcrJZ1XcLGQm';
  * let op: Operation = await Operation.byHash(hash);
  * ```
  *
  */
  static async byHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/${hash}`);
    if (quote) {
      url.search = new URLSearchParams(<any>{'quote': quote}).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Operation[] = [];
    for (var i = 0; i < data.length; i++) {
      var operation: Operation = Operation.fromAPI(data[i]);
      output.push(operation);
    };
    return output;
  }

  /**
  * Fetches an operation with the specified hash and counter from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns an operation with the specified hash and counter.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetByHashCounter | get operations by hash and counter }.
  */
  static async ByHashCounter(hash: string, counter: number, quote: string="None", domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/${hash}/${counter}`),
        parameters: any = {'micheline': 0, 'quote': quote};
    url.search = new URLSearchParams(parameters).toString();
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Operation[] = [];
    for (var i = 0; i < data.length; i++) {
      var operation: Operation = Operation.fromAPI(data[i]);
      output.push(operation);
    };
    return output;
  }

  /**
  * Returns a list of operations created by (or related to) the specified account from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @remarks For better flexibility this endpoint accumulates query parameters (filters) of each /operations/{type} endpoint, so a particular filter may affect several operation types containing this filter. For example, if you specify an initiator it will affect all transactions, delegations and originations, because all these types have an initiator field.
  *
  * @returns Returns a list of operations related to the specified account.
  * @see {@link https://api.tzkt.io/#operation/Accounts_GetOperations | get account operations }.
  *
  * @example Fetch Operations related to an Account
  * # Usage
  * ```typescript
  * let address: string = 'tz1WEHHVMWxQUtkWAgrJBFGXjJ5YqZVgfPVE';
  * let op: Operation = await Operation.byAccount(address);
  * ```
  *
  */
  static async byAccount(address: string, options: GetByAddressParameters | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/accounts/${address}/operations`);
    if (options) {
      let parameters: any = JSON.parse(JSON.stringify(options));
      if (options.timestamp) {
        parameters.timestamp = options.timestamp.toISOString();
      }
      url.search = new URLSearchParams(<any>parameters).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Operation[] = [];
    for (var i = 0; i < data.length; i++) {
      var operation: Operation = Operation.fromAPI(data[i]);
      output.push(operation);
    };
    return output;
  }

  /**
  * Fetches an operation with the specified operation type and hash from {@link https://tzkt.io/ | tzKT }.
  * @internal
  *
  * @returns Returns an operation with the specified operation type and hash.
  */
  static async typeByHash(type: string, hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/${type}/${hash}`);
    if (quote) {
      url.search = new URLSearchParams(<any>{'quote': quote}).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Operation[] = [];
    for (var i = 0; i < data.length; i++) {
      var operation: Operation = Operation.fromAPI(data[i]);
      output.push(operation);
    };
    return output;
  }

  /**
  * Fetches an operation count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @internal
  *
  * @returns Returns an operation count with the specified operation type.
  */
  static async typeCount(type: string, level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: URL = new URL(`${domain}/v1/operations/${type}/count`),
        parameters: any = {};
    if (level) {
      parameters.level = level;
    }
    if (timestamp) {
      parameters.timestamp = timestamp.toISOString();
    }
    if (parameters) {
      url.search = new URLSearchParams(<any>parameters).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.text();
    return parseInt(data);
  }

  /**
  * Fetches endorsement operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns endorsement operations with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetEndorsementByHash | get endorsements by hash }.
  *
  * @example Fetch Endorsements Operations by Hash
  * # Usage
  * ```typescript
  * let address: string = 'tz1WEHHVMWxQUtkWAgrJBFGXjJ5YqZVgfPVE';
  * let op: Operation = await Operation.byAccount(address);
  * ```
  *
  */
  static async endorsementsByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('endorsements', hash, quote, domain);
  }

  /**
  * Fetches an endorsement operation count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of endorsement operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetEndorsementsCount | get endorsements count }
  *
  * @example Fetch Endorsement Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.endorsementsCount(level);
  * ```
  *
  */
  static async endorsementsCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('endorsements', level, timestamp, domain);
  }

  /**
  * Fetches ballot operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns ballot operations with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetBallotByHash | get ballot by hash }.
  */
  static async ballotsByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('ballots', hash, quote, domain);
  }

  /**
  * Fetches an ballot operation count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of ballot operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetBallotsCount | get ballots count }
  *
  * @example Fetch Ballot Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.ballotsCount(level);
  * ```
  *
  */
  static async ballotsCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('ballots', level, timestamp, domain);
  }

  /**
  * Fetches proposal operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns proposal operations with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetProposalByHash | get proposal by hash }.
  */
  static async proposalsByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('proposals', hash, quote, domain);
  }

  /**
  * Fetches proposal operations count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of proposal operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetProposalsCount | get proposal count }
  *
  * @example Fetch Proposal Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.proposalsCount(level);
  * ```
  *
  */
  static async proposalsCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('proposals', level, timestamp, domain);
  }

  /**
  * Fetches activation operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns activation operations with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetActivationByHash | get activation by hash }.
  */
  static async activationsByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('activations', hash, quote, domain);
  }

  /**
  * Fetches activation operations count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of activation operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetActivationsCount | get activations count }
  *
  * @example Fetch Activation Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.activationsCount(level);
  * ```
  *
  */
  static async activationsCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('activations', level, timestamp, domain);
  }

  /**
  * Fetches double baking operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns double baking operations with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetDoubleBakingByHash | get double baking by hash }.
  */
  static async doubleBakingByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('double_baking', hash, quote, domain);
  }

  /**
  * Fetches double baking operations count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of double baking operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetDoubleBakingCount | get double baking count }
  *
  * @example Fetch Double Baking Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.doubleBakingCount(level);
  * ```
  *
  */
  static async doubleBakingCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('double_baking', level, timestamp, domain);
  }

  /**
  * Fetches double endorsing operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns double endorsing operations with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetDoubleBakingByHash | get double endorsing by hash }.
  */
  static async doubleEndorsingByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('double_endorsing', hash, quote, domain);
  }

  /**
  * Fetches double endorsing operations count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of double endorsing operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetDoubleEndorsingCount | get double endorsing count }
  *
  * @example Fetch Double Endorsing Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.doubleEndorsingCount(level);
  * ```
  *
  */
  static async doubleEndorsingCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('double_endorsing', level, timestamp, domain);
  }

  /**
  * Fetches nonce revelations operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns nonce revelations operations with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetDoubleBakingByHash | get double baking by hash }.
  */
  static async nonceRevelationsByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('nonce_revelations', hash, quote, domain);
  }

  /**
  * Fetches nonce revelation operations count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of nonce revelation operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetNonceRevelationsCount | get nonce revelations count }
  *
  * @example Fetch Nonce Revelation Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.nonceRevelationsCount(level);
  * ```
  *
  */
  static async nonceRevelationsCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('nonce_revelations', level, timestamp, domain);
  }

  /**
  * Fetches delegations operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns delegations operations with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetDelegationByHash | get delegations by hash }.
  */
  static async delegationsByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('delegations', hash, quote, domain);
  }

  /**
  * Fetches delegation operations count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of delegation operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetDelegationsCount | get delegations count }
  *
  * @example Fetch Delegation Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.delegationsCount(level);
  * ```
  *
  */
  static async delegationsCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('delegations', level, timestamp, domain);
  }

  /**
  * Fetches origination operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns originations operations with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetDelegationByHash | get originations by hash }.
  */
  static async originationsByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('originations', hash, quote, domain);
  }

  /**
  * Fetches origination operations count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of origination operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetOriginationsCount | get originations count }
  *
  * @example Fetch Origination Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.originationsCount(level);
  * ```
  *
  */
  static async originationsCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('originations', level, timestamp, domain);
  }

  /**
  * Fetches transaction operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns transaction operations with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetTransactionByHash | get transaction by hash }.
  *
  * @example Fetch Transaction Operation by Hash
  * # Usage
  * ```typescript
  * let hash: string = 'ooQf6zZhvkydbx48hJeZzG8uW1VGL6aR354F5asvcrJZ1XcLGQm';
  * let op: Operation = await Operation.transactionsByHash(hash);
  * ```
  *
  */
  static async transactionsByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('transactions', hash, quote, domain);
  }

  /**
  * Fetches transaction operations count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of transaction operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetTransactionsCount | get transactions count }
  *
  @example Fetch Transaction Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.transactionsCount(level);
  * ```
  *
  */
  static async transactionsCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('transactions', level, timestamp, domain);
  }

  /**
  * Fetches reveal operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns reveal operations with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetRevealByHash | get reveal by hash }.
  */
  static async revealsByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('reveals', hash, quote, domain);
  }

  /**
  * Fetches reveal operations count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of reveal operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetRevealsCount | get reveals count }
  *
  * @example Fetch Reveal Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.revealsCount(level);
  * ```
  *
  */
  static async revealsCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('reveals', level, timestamp, domain);
  }

  /**
  * Fetches migration operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns migration operations with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetRevealByHash | get reveal by hash }.
  */
  static async migrationsByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('migrations', hash, quote, domain);
  }

  /**
  * Fetches migration operations count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of migration operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetMigrationsCount | get migrations count }
  *
  * @example Fetch Migration Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.migrationsCount(level);
  * ```
  *
  */
  static async migrationsCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('migrations', level, timestamp, domain);
  }

  /**
  * Fetches revelation penalties operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns revelation penalties operations with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetRevealByHash | get reveal by hash }.
  */
  static async revelationPenaltiesByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('revelation_penalties', hash, quote, domain);
  }

  /**
  * Fetches revelation penalty operations count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of revelation penalty operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetRevelationPenaltiesCount | get revelation penalties count }
  *
  * @example Fetch Revelation Penalty Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.revelationPenaltiesCount(level);
  * ```
  *
  */
  static async revelationPenaltiesCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('revelation_penalties', level, timestamp, domain);
  }

  /**
  * Fetches baking operations with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns baking operations with the specified hash.
  */
  static async bakingByHash(hash: string, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    return await Operation.typeByHash('baking', hash, quote, domain);
  }

  /**
  * Fetches baking operations count with the specified operation type from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of baking operations.
  * @see {@link https://api.tzkt.io/#operation/Operations_GetBakingCount | get baking count }
  *
  * @example Fetch Baking Operations Count
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let op: Operation = await Operation.bakingCount(level);
  * ```
  *
  */
  static async bakingCount(level: number | null, timestamp: Date | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    return await Operation.typeCount('baking', level, timestamp, domain);
  }
}
