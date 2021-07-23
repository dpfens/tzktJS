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

interface GetBallotsParameters extends PaginationParameters, Sortable {
  delegate?: string;
  level?: number;
  timestamp?: Date;
  epoch?: number;
  period?: number;
  proposal?: string;
  select?: string[];
  quote?: string;
}


interface GetProposalsParameters extends PaginationParameters, Sortable {
  delegate?: string;
  level?: number;
  timestamp?: Date;
  epoch?: number;
  period?: number;
  proposal?: string;
  duplicated?: boolean;
  select?: string[];
  quote?: string;
}


interface GetActivationParameters extends PaginationParameters, Sortable {
  account?: string;
  level?: number;
  timestamp?: Date;
  select?: string[];
  quote?: string;
}


interface GetDoubleBakingParameters extends PaginationParameters, Sortable {
  accuser?: string;
  offender?: string;
  level?: number;
  timestamp?: Date;
  select?: string[];
  quote?: string;
}


interface GetDoubleEndorsingParameters extends PaginationParameters, Sortable {
  accuser?: string;
  offender?: string;
  level?: number;
  timestamp?: Date;
  select?: string[];
  quote?: string;
}


interface GetNonceRevelationParameters extends PaginationParameters, Sortable {
  baker?: string;
  sender?: string;
  level?: number;
  timestamp?: Date;
  select?: string[];
  quote?: string;
}


interface GetDelegationParameters extends PaginationParameters, Sortable {
  initiator?: string;
  sender?: string;
  prevDelegate?: string;
  newDelegate?: string;
  level?: number;
  timestamp?: Date;
  select?: string[];
  quote?: string;
}


interface GetOriginationParameters extends PaginationParameters, Sortable {
  initiator?: string;
  sender?: string;
  contractManager?: string;
  contractDelegate?: string;
  originatedContract?: string;
  typeHash?: string;
  codeHash?: string;
  level?: number;
  timestamp?: Date;
  status?: string;
  micheline?: number;
  select?: string[];
  quote?: string;
}


interface GetTransactionParameters extends PaginationParameters, Sortable {
  initiator?: string;
  sender?: string;
  target?: string;
  amount?: number;
  level?: number;
  timestamp?: Date;
  entrypoint?: string;
  parameters?: any;
  hasInternals?: boolean;
  status?: string;
  micheline?: number;
  select?: string[];
  quote?: string;
}


interface GetRevealParameters extends PaginationParameters, Sortable {
  sender?: string;
  level?: number;
  timestamp?: Date;
  select?: string[];
  quote?: string;
}


interface GetMigrationParameters extends PaginationParameters, Sortable {
  account?: string;
  kind?: string;
  balanceChange?: string;
  level?: number;
  timestamp?: Date;
  select?: string[];
  quote?: string;
}


interface GetRevelationPenaltyParameters extends PaginationParameters, Sortable {
  baker?: string;
  level?: number;
  timestamp?: Date;
  select?: string[];
  quote?: string;
}


interface GetBakingParameters extends PaginationParameters, Sortable {
  baker?: string;
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
  * Fetches endorsement operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Endorsement operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetEndorsements | get endorsements }
  *
  * @example Fetch Endorsements Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: GetEndorsementsParameters = { 'level': level };
  * let op: Operation[] = await Operation.getEndorsements(parameters);
  * ```
  *
  */
  static async getEndorsements(parameters?: GetEndorsementsParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/endorsements/`),
    urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
  * Fetches ballot operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Ballot operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetBallots | get ballots }
  *
  * @example Fetch Ballot Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: GetBallotsParameters = { 'level': level };
  * let op: Operation[] = await Operation.getBallots(parameters);
  * ```
  *
  */
  static async getBallots(parameters?: GetBallotsParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/ballots/`),
        urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
  * Fetches proposal operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Proposal operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetProposals | get proposals }
  *
  * @example Fetch Proposal Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: GetProposalParameters = { 'level': level };
  * let op: Operation[] = await Operation.getProposals(parameters);
  * ```
  *
  */
  static async getProposals(parameters?: GetProposalParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/proposals/`),
    urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
  * Fetches activation operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Activation operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetActivations | get activations }
  *
  * @example Fetch Activation Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: GetActivationParameters = { 'level': level };
  * let op: Operation[] = await Operation.getActivations(parameters);
  * ```
  *
  */
  static async getActivations(parameters?: GetActivationParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/activations/`),
    urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
  * Fetches double baking operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Double Baking operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetDoubleBaking | get double baking }
  *
  * @example Fetch Double Baking Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: GetDoubleBakingParameters = { 'level': level };
  * let op: Operation[] = await Operation.getDoubleBakings(parameters);
  * ```
  *
  */
  static async getDoubleBakings(parameters?: GetDoubleBakingParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/double_baking/`),
    urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
  * Fetches double endorsing operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Double Endorsing operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetDoubleEndorsing | get double endorsing }
  *
  * @example Fetch Double Endorsing Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: GetDoubleBakingParameters = { 'level': level };
  * let op: Operation[] = await Operation.getDoubleEndorsings(parameters);
  * ```
  *
  */
  static async getDoubleEndorsings(parameters?: GetDoubleEndorsingParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/double_endorsing/`),
        urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
  * Fetches nonce revelation operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Nonce Revelation operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetNonceRevelations | get nonce revelations }
  *
  * @example Fetch Nonce Revelation Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: getNonceRevelationsParameters = { 'level': level };
  * let op: Operation[] = await Operation.getNonceRevelations(parameters);
  * ```
  *
  */
  static async getNonceRevelations(parameters?: GetNonceRevelationParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/nonce_revelations/`),
    urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
  * Fetches delegation operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Delegation operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetDelegations | get delegation }
  *
  * @example Fetch Delegation Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: getDelegationParameters = { 'level': level };
  * let op: Operation[] = await Operation.getDelegations(parameters);
  * ```
  *
  */
  static async getDelegations(parameters?: GetDelegationParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/delegations/`),
    urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
  * Fetches origination operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Origination operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetOriginations | get originations }
  *
  * @example Fetch Origination Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: getOriginationParameters = { 'level': level };
  * let op: Operation[] = await Operation.getOriginations(parameters);
  * ```
  *
  */
  static async getOriginations(parameters?: GetOriginationParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/originations/`),
        urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
  * Fetches transaction operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Transaction operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetTransactions | get transactions }
  *
  * @example Fetch Transaction Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: getTransactionParameters = { 'level': level };
  * let op: Operation[] = await Operation.getTransactions(parameters);
  * ```
  *
  */
  static async getTransactions(parameters?: GetTransactionParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/transactions/`),
        urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
  * Fetches reveal operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Reveal operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetReveals | get reveals }
  *
  * @example Fetch Reveal Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: getRevealParameters = { 'level': level };
  * let op: Operation[] = await Operation.getReveals(parameters);
  * ```
  *
  */
  static async getReveals(parameters?: GetRevealParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/reveals/`),
        urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
  * Fetches migration operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Migration operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetMigrations | get migrations }
  *
  * @example Fetch Migration Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: getMigrationParameters = { 'level': level };
  * let op: Operation[] = await Operation.getMigrations(parameters);
  * ```
  *
  */
  static async getMigrations(parameters?: GetMigrationParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/migrations/`),
        urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
  * Fetches revelation penalties operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Migration operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetRevelationPenalties | get revelation penalties }
  *
  * @example Fetch RevelationPenalty Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: getRevelationPenaltyParameters = { 'level': level };
  * let op: Operation[] = await Operation.getRevelationPenalties(parameters);
  * ```
  *
  */
  static async getRevelationPenalties(parameters?: GetRevelationPenaltyParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/revelation_penalties/`),
        urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
  * Fetches baking operations with the specified criteria from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns matching Baking operations
  * @see {@link https://api.tzkt.io/#operation/Operations_GetBaking | get baking }
  *
  * @example Fetch Baking Operations
  * # Usage
  * ```typescript
  * let level: number = 1500000;
  * let parameters: getBakingParameters = { 'level': level };
  * let op: Operation[] = await Operation.getBakings(parameters);
  * ```
  *
  */
  static async getBakings(parameters?: GetBakingParameters, domain: string = 'https://api.tzkt.io'): Promise<Operation[]> {
    let url: URL = new URL(`${domain}/v1/operations/baking/`),
        urlParameters: any = JSON.parse(JSON.stringify(parameters));
    if (urlParameters.timestamp) {
      let dateString: string = urlParameters.timestamp.toISOString().split('T')[0];
      urlParameters.timestamp = dateString;
    }
    if (parameters) {
      url.search = new URLSearchParams(urlParameters).toString();
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
