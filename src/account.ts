/// <reference path="types.ts"/>

interface GetAccountParameters extends PaginationParameters, Sortable {
  accountType?: AccountTypeParameter;
  contractKind?: ContractKindParameter;
  delegate?: string;
  balance?: number;
  staked?: boolean;
  lastActivity?: Date;
  select?: string[];
}


class  AccountMetadata {
  public readonly kind: ContractKindParameter | null;
  public readonly alias: string | null;
  public readonly address: string | null;
  public readonly balance: number;
  public readonly delegate: any;
  public readonly creationLevel: number | null;
  public readonly creationTime: Date | null;

  constructor(kind: ContractKindParameter | null, alias: string | null, address: string | null, balance: number, delegate: any, creationLevel: number | null, creationTime: Date | null) {
    this.kind = kind;
    this.alias = alias;
    this.address = address;
    this.balance = balance;
    this.delegate = delegate;
    this.creationLevel = creationLevel;
    this.creationTime = creationTime;
  }

  static fromAPI(data: any): AccountMetadata {
    let kind: ContractKindParameter | null = data.kind;
    let alias: string | null = data.alias;
    let address: string | null = data.address;
    let balance: number = data.balance;
    let delegate: any = data.delegate;
    let creationLevel: number | null = data.creationLevel;
    let creationTime: any = data.creationTime;
    if (creationTime) {
      creationTime = new Date(creationTime);
    }
    return new AccountMetadata(kind, alias, address, balance, delegate, creationLevel, creationTime);
  }
}


interface GetBalanceHistoryParameters extends Sortable {
  step?: number;
  select?: string[];
}


interface GetBalanceReportParameters extends PaginationParameters {
  from?: Date;
  to?: Date;
  currency?: string;
  historical?: boolean;
  delimiter?: 'comma' | 'semicolon';
  separator?: 'comma' | 'point';
  quote?: string;
}

/**
 * Balance information from {@link https://tzkt.io/ | tzKT }.  For more information see the {@link https://api.tzkt.io/#operation/Accounts_GetBalanceHistory| balance API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 */
class Balance {
  public readonly level: number;
  public readonly timestamp: Date;
  public readonly quote: BalanceShort | null;
  public readonly balance: number;

  /**
   * @internal
   */
  constructor(balance: number, level: number, quote: BalanceShort | null, timestamp: Date) {
    this.balance = balance;
    this.level = level;
    this.quote = quote;
    this.timestamp = timestamp;
  }

  /**
   * Converts data returned from API endpoints to Balance instances;
   * @internal
   */
  static fromAPI(data: any): Balance {
    let balance: number = data.balance;
    let level: number = data.level;
    let quote: BalanceShort = data.quote || null;
    let timestamp: any = data.timestamp;
    if (timestamp) {
      timestamp = new Date(timestamp);
    }
    return new Balance(balance, level, quote, timestamp);
  }

  /**
  * Fetches balance history of an account from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns time series with historical balances (only changes, without duplicates).
  * @see {@link https://api.tzkt.io/#operation/Accounts_GetBalanceHistory | get balance history }.
  *
  * @example Fetch balance history of an address
  * # Usage
  * ## History by Date Range
  * ```typescript
  * let address: string = 'tz1WEHHVMWxQUtkWAgrJBFGXjJ5YqZVgfPVE',
        steps: number = 100;
  * let balanceHistory: Balance[] = await Balance.history(address, {'steps': steps});
  * ```
  *
  */
  static async history(address: string, parameters: GetBalanceHistoryParameters | null, domain: string = 'https://api.tzkt.io'): Promise<Balance[]> {
    let url: URL = new URL(`${domain}/v1/accounts/${address}/balance_history`);
    if (parameters) {
      url.search = new URLSearchParams(<any>parameters).toString();
    }
    let response: Response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    let output: Balance[] = [];
    for (var i = 0; i < data.length; i++) {
      var balance: Balance = Balance.fromAPI(data[i]);
      output.push(balance);
    }
    return output;
  }

  /**
  * Fetches balance history of an account from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns time series with historical balances (only changes, without duplicates).
  * @see {@link https://api.tzkt.io/#operation/Accounts_GetBalanceHistory | get balance history }.
  *
  * @example Fetch balance at a given block level
  * ```typescript
  * let address: string = 'tz1WEHHVMWxQUtkWAgrJBFGXjJ5YqZVgfPVE';
  * let level: number = 1500000;
  * let balance: number = Balance.byLevel(address, level);
  * ```
  */
  static async byLevel(address: string, level: number, domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: string = `${domain}/v1/accounts/${address}/balance_history/${level}`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.text();
    return parseFloat(data);
  }

  /**
  * Fetches account balance at a given datetime from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns account balance at the specified datetime
  * @see {@link https://api.tzkt.io/#operation/Accounts_GetBalanceAtDate | get balance at date }.
  *
  * @example Fetch balance at a given Date
  * ```typescript
  * let address: string = 'tz1WEHHVMWxQUtkWAgrJBFGXjJ5YqZVgfPVE';
  * let today: Date = new Date;
  * let balance: number = Balance.byDate(address, today);
  * ```
  */
  static async byDate(address: string, date: Date, domain: string = 'https://api.tzkt.io'): Promise<number> {
    let dateString: string = date.toISOString(),
    url: string = `${domain}/v1/accounts/${address}/balance_history/${dateString}`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.text();
    return parseFloat(data);
  }

  /**
  * Exports account balance report in .csv format.
  *
  * @returns The account balance of the given account in csv format.
  * @see {@link https://api.tzkt.io/#operation/Accounts_GetBalanceReport | GetBalanceReport }
  *
  * @example Fetch balance report for an Address
  * # Usage
  * ## Fetch Report by Date Range
  * ```typescript
  * let address: string = 'tz1WEHHVMWxQUtkWAgrJBFGXjJ5YqZVgfPVE',
        fromDate: Date = new Date(2021, 0, 1),
        toDate: Date = new Date(2021, 5, 1),
        parameters: GetBalanceReportParameters = {'from': fromDate, 'to': toDate};
  * let report: string = await Balance.report(address, parameters);
  * ```
  *
  * @public
  */
  static async report(address: string, options: GetBalanceReportParameters | null, domain: string = 'https://api.tzkt.io'): Promise<string> {
    let url: URL = new URL(`${domain}/v1/accounts/${address}/report`);
    if (options) {
      let parameters: any = JSON.parse(JSON.stringify(options))
      if (options.from) {
        parameters.from = options.from.toISOString().split('T')[0];
      }
      if (options.to) {
        parameters.to =  options.to.toISOString().split('T')[0];
      }
      url.search = new URLSearchParams(<any>parameters).toString();
    }
    let response: Response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    }),
    blob: Blob = await response.blob();
    return await blob.text();
  }
}


interface CountParameters {
  type?: AccountTypeParameter,
  kind?: ContractKindParameter,
  balance?: number,
  staked?: boolean
}


class AccountBase {
  public readonly type: AccountTypeParameter | null;
  public readonly alias: string | null;
  public readonly address: string | null;
  public readonly publicKey: string | null;
  public readonly revealed: boolean;
  public readonly balance: number;
  public readonly counter: number;
  public readonly delegationLevel: number | null;
  public readonly delegationTime: Date | null;
  public readonly numContracts: number | null;
  public readonly numActivations: number | null;
  public readonly numDelegations: number | null;
  public readonly numOriginations: number | null;
  public readonly numTransactions : number | null;
  public readonly numReveals: number | null;
  public readonly numMigrations: number | null;
  public readonly firstActivity: number | null;
  public readonly firstActivityTime: Date | null;
  public readonly lastActivity: number | null;
  public readonly lastActivityTime: Date | null;
  public readonly contracts: Contract[] | null;
  public readonly operations: Operation[] | null;
  public readonly metadata: any | null;

  /**
   * @internal
   */
  constructor (type: AccountTypeParameter | null, alias: string | null, address: string | null, publicKey: string | null, revealed: boolean, balance: number, counter: number, delegationLevel: number | null, delegationTime: Date | null, numContracts: number | null, numActivations: number | null, numDelegations: number | null, numOriginations: number | null, numTransactions : number | null, numReveals: number | null, numMigrations: number | null, firstActivity: number | null, firstActivityTime: Date | null, lastActivity: number | null, lastActivityTime: Date | null, contracts: Contract[] | null, operations: Operation[] | null, metadata: any | null) {
    this.type = type;
    this.alias = alias;
    this.address = address;
    this.publicKey = publicKey;
    this.revealed = revealed;
    this.balance = balance;
    this.counter = counter;
    this.delegationLevel = delegationLevel;
    this.delegationTime = delegationTime;
    this.numContracts = numContracts;
    this.numActivations = numActivations;
    this.numDelegations = numDelegations;
    this.numOriginations = numOriginations;
    this.numTransactions = numTransactions;
    this.numReveals = numReveals;
    this.numMigrations = numMigrations;
    this.firstActivity = firstActivity;
    this.firstActivityTime= firstActivityTime;
    this.lastActivity = lastActivity;
    this.lastActivityTime = lastActivityTime;
    this.contracts = contracts;
    this.operations = operations;
    this.metadata = metadata;
  }

  toString() {
    return this.address;
  }

  /**
   * Converts data returned from API endpoints to AccountBase instances;
   * @internal
   */
  static fromAPI(data: any): AccountBase {
    let type: AccountTypeParameter | null = data.type;
    let alias: string | null = data.alias;
    let address: string | null = data.address;
    let publicKey: string | null = data.publicKey;
    let revealed: boolean = data.revealed;
    let balance: number = data.balance;
    let counter: number = data.counter;
    let delegationLevel: number | null = data.delegationLevel;
    let delegationTime: any = data.delegationTime;
    if (delegationTime) {
      delegationTime = new Date(delegationTime);
    }
    let numContracts: number | null = data.numContracts;
    let numActivations: number | null = data.numActivations;
    let numDelegations: number | null = data.numDelegations;
    let numOriginations: number | null = data.numOriginations;
    let numTransactions: number | null = data.numTransactions;
    let numReveals: number | null = data.numReveals;
    let numMigrations: number | null = data.numMigrations;
    let firstActivity: number | null = data.firstActivity;
    let firstActivityTime: any = data.firstActivityTime;
    if (firstActivityTime) {
      firstActivityTime = new Date(firstActivityTime);
    }
    let lastActivity: number | null = data.lastActivity;
    let lastActivityTime: any = data.lastActivityTime;
    if (lastActivityTime) {
      lastActivityTime = new Date(lastActivityTime);
    }
    let contracts: Contract[] | null = data.contracts;
    let operations: Operation[] | null = data.operations;
    let metadata: AccountMetadata | null = data.metadata;
    let timestamp: any = data.timestamp;
    if (timestamp) {
      timestamp = new Date(timestamp);
    }
    return new AccountBase(type, alias, address, publicKey, revealed, balance, counter, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata);
  }
}


/**
 * An account is a unique identifier on the {@link https://tezos.com/ | Tezos blockchain }.  For more information see the {@link https://api.tzkt.io/#tag/Accounts | Accounts API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 */
class Account extends AccountBase {

  /**
   * @internal
   */
  constructor (type: AccountTypeParameter | null, alias: string | null, address: string | null, publicKey: string | null, revealed: boolean, balance: number, counter: number, delegationLevel: number | null, delegationTime: Date | null, numContracts: number | null, numActivations: number | null, numDelegations: number | null, numOriginations: number | null, numTransactions : number | null, numReveals: number | null, numMigrations: number | null, firstActivity: number | null, firstActivityTime: Date | null, lastActivity: number | null, lastActivityTime: Date | null, contracts: Contract[] | null, operations: Operation[] | null, metadata: any | null) {
    super(type, alias, address, publicKey, revealed, balance, counter, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata);
  }

  /**
   * Converts data returned from API endpoints to Account instances;
   * @internal
   */
  static fromAPI(data: any): Account {
    let type: AccountTypeParameter | null = data.type;
    let alias: string | null = data.alias;
    let address: string | null = data.address;
    let publicKey: string | null = data.publicKey;
    let revealed: boolean = data.revealed;
    let balance: number = data.balance;
    let counter: number = data.counter;
    let delegationLevel: number | null = data.delegationLevel;
    let delegationTime: any = data.delegationTime;
    if (delegationTime) {
      delegationTime = new Date(delegationTime);
    }
    let numContracts: number | null = data.numContracts;
    let numActivations: number | null = data.numActivations;
    let numDelegations: number | null = data.numDelegations;
    let numOriginations: number | null = data.numOriginations;
    let numTransactions: number | null = data.numTransactions;
    let numReveals: number | null = data.numReveals;
    let numMigrations: number | null = data.numMigrations;
    let firstActivity: number | null = data.firstActivity;
    let firstActivityTime: any = data.firstActivityTime;
    if (firstActivityTime) {
      firstActivityTime = new Date(firstActivityTime);
    }
    let lastActivity: number | null = data.lastActivity;
    let lastActivityTime: any = data.lastActivityTime;
    if (lastActivityTime) {
      lastActivityTime = new Date(lastActivityTime);
    }
    let contracts: Contract[] | null = data.contracts;
    let operations: Operation[] | null = data.operations;
    let metadata: AccountMetadata | null = data.metadata;
    let timestamp: any = data.timestamp;
    if (timestamp) {
      timestamp = new Date(timestamp);
    }
    return new Account(type, alias, address, publicKey, revealed, balance, counter, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata);
  }

  /**
  * Fetches Account instances from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of matching accounts.
  * @see {@link https://api.tzkt.io/#operation/Accounts_Get | get accounts }.

  *
  * @example Fetch list of Accounts
  * # Usage
  * ## user accounts with a balance > 1000000
  * ```typescript
  * let parameters: GetAccountParameters = {'type': 'user', 'balance.gt': 1000000};
  * let accounts: Account[] = await Account.get(parameters);
  * ```
  *
  */
  static async get(options: GetAccountParameters, domain: string = 'https://api.tzkt.io'): Promise<Account[]> {
    let url: URL = new URL(`${domain}/v1/accounts`);
    if (options) {
      let parameters: any = JSON.parse(JSON.stringify(options));
      if (options.lastActivity) {
        parameters.lastActivity = options.lastActivity.toISOString().split('T')[0];
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
    var output: Account[] = [];
    for (var i = 0; i < data.length; i++) {
      var account: Account = Account.fromAPI(data[i]);
      output.push(account);
    };
    return output;
  }

  /**
  * Gets the total number of accounts from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the number of accounts.
  * @see {@link https://api.tzkt.io/#operation/Accounts_GetCount | get accounts count }.
  *
  * @example Fetch Account Count
  * # Usage
  * ## Total number of Accounts
  * ```typescript
  * let accountCount: number = await Account.count();
  * ```
  *
  * ## Total number of matching Accounts
  * The number of accounts with 1000.0 <= balance < 10000.0
  * ```typescript
  * let accountCount: number = await Account.count({'balance.ge': 1000.0, 'balance.lt': 10000.0});
  * ```
  *
  */
  static async count(parameters: CountParameters | null, domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: URL = new URL(`${domain}/v1/accounts/count`);
    url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    let response: Response = await fetch(<any>url, {
      method: 'GET',
    });
    let data = await response.text();
    return parseInt(data);
  }

  /**
  * Gets a single Account from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the Account corresponding to the given address.
  * @see {@link https://api.tzkt.io/#operation/Accounts_GetByAddress | get account by address }.
  *
  * @example Fetch Account by Address
  * # Usage
  * ```typescript
  * let address: string = 'tz1WEHHVMWxQUtkWAgrJBFGXjJ5YqZVgfPVE';
  * let account: Account = await Account.byAddress(address);
  * ```
  *
  */
  static async byAddress(address: string, metadata: boolean=false, domain: string = 'https://api.tzkt.io'): Promise<Account> {
    let url: URL = new URL(`${domain}/v1/accounts/${address}`),
        parameters: any = { 'metadata': metadata };
    url.search = new URLSearchParams(parameters).toString();
    let response: Response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Account.fromAPI(data);
  }

  /**
  * Gets metadata of an Account from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the metadata of an Account corresponding to the given address.
  * @see {@link https://api.tzkt.io/#operation/Accounts_GetMetadata | get account metadata }.
  *
  * @example Fetch metadata for an Account
  * # Usage
  * ```typescript
  * let address: string = 'tz1WEHHVMWxQUtkWAgrJBFGXjJ5YqZVgfPVE';
  * let accountMetadata: any = await Account.getMetadata(address);
  * ```
  *
  */
  static async getMetadata(address: string, domain: string = 'https://api.tzkt.io'): Promise<any> {
    let url: string = `${domain}/v1/accounts/${address}/metadata`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return data;
  }

  /**
  * Suggests known accounts by part of alias. This endpoint is useful for autocomplete.
  *
  * @returns account suggestions.
  * @see {@link https://api.tzkt.io/#operation/Suggest_GetAccounts | Suggest accounts }
  *
  * @example Fetch suggestions for an Account
  * # Usage
  * ```typescript
  * let query: string = 'Quipu';
  * let accountSuggestions: any[] = await Account.getMetadata(query);
  * ```
  *
  * @public
  */
  static async suggestions(query: string, domain: string = 'https://api.tzkt.io'): Promise<any> {
    let url: string = `${domain}/v1/suggest/accounts/${query}`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }
}
