/// <reference path="types.ts"/>
/// <reference path="account.ts"/>


interface GetContractParameters extends PaginationParameters, Sortable {
  kind?: ContractKindParameter;
  creator?: string;
  manager?: string;
  delegate?: string;
  lastActivity?: number;
  typeHash?: number;
  codeHash?: number;
  incudeStorage?: boolean;
  select?: string[];
}

interface SimilarParameters extends PaginationParameters, Sortable {
  select?: string[];
  includeStorage?: boolean;
}

interface EntryPointByNameParameters {
  json: boolean | null;
  micheline: boolean | null;
  michelson: boolean | null;
}

/**
*
*/
class EntryPoint {
  public readonly name: string;
  public readonly jsonParameters: any;
  public readonly michelineParameters: any;
  public readonly michelsonParameters: string | null;
  public readonly unused: boolean;

  /**
  * @internal
  */
  constructor(name: string, jsonParameters: any, michelineParameters: any, michelsonParameters: string| null, unused: boolean) {
    this.name = name;
    this.jsonParameters = jsonParameters;
    this.michelineParameters = michelineParameters;
    this.michelsonParameters = michelsonParameters;
    this.unused = unused;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): EntryPoint {
    let name: string = data.name;
    let jsonParameters: any = data.jsonParameters;
    let michelineParameters: any = data.michelineParameters;
    let michelsonParameters: any = data.michelsonParameters;
    let unused: boolean = data.unused;
    return new EntryPoint(name,jsonParameters, michelineParameters, michelsonParameters, unused);
  }

  /**
  * Fetches the entrypoint which have the same name as the specified one from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns contract's entrypoint with specified name.
  * @see {@link https://api.tzkt.io/#operation/Contracts_GetEntrypointByName | get entrypoint by name }.
  */
  async byName(address: string, name: string, parameters: EntryPointByNameParameters | null, domain: string = 'https://api.tzkt.io'): Promise<EntryPoint> {
    let url: URL = new URL(`${domain}/v1/contracts/${address}/entrypoints/${name}`);
    url.search = new URLSearchParams(<any>parameters).toString();
    let response: Response = await fetch(<any>url, {
      method: 'GET',
    });
    let data = await response.text();
    return EntryPoint.fromAPI(data);
  }
}

interface getRelatedToAddressParameters extends PaginationParameters, Sortable {}

/**
 * Contracts are accounts associated with Michelson scripts on the {@link https://tezos.com/ | Tezos blockchain }.  They are created with an explicit origination operation and are therefore sometimes called originated accounts.  For more information see the {@link https://api.tzkt.io/#tag/Contracts | Contracts API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 * @remark The address of a smart contract always starts with the letters "KT1".
 */
class Contract extends AccountBase {
  public readonly delegate: number | null;

  /**
  * @internal
  */
  constructor (type: AccountTypeParameter | null, alias: string | null, address: string | null, publicKey: string | null, revealed: boolean, balance: number, counter: number, delegate: number | null, delegationLevel: number | null, delegationTime: Date | null, numContracts: number | null, numActivations: number | null, numDelegations: number | null, numOriginations: number | null, numTransactions : number | null, numReveals: number | null, numMigrations: number | null, firstActivity: number | null, firstActivityTime: Date | null, lastActivity: number | null, lastActivityTime: Date | null, contracts: Contract[] | null, operations: Operation[] | null, metadata: any | null) {
    super(type, alias, address, publicKey, revealed, balance, counter, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata);
    this.delegate = delegate;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Contract {
    let type: AccountTypeParameter | null = data.type;
    let alias: string | null = data.alias;
    let address: string | null = data.address;
    let publicKey: string | null = data.publicKey;
    let revealed: boolean = data.revealed;
    let balance: number = data.balance;
    let counter: number = data.counter;
    let delegate: number | null = data.delegate;
    let delegationLevel: number | null = data.delegationLevel;
    let delegationTime: any = data.delegationTime;
    let numContracts: number | null = data.numContracts;
    let numActivations: number | null = data.numActivations;
    let numDelegations: number | null = data.numDelegations;
    let numOriginations: number | null = data.numOriginations;
    let numTransactions: number | null = data.numTransactions;
    let numReveals: number | null = data.numReveals;
    let numMigrations: number | null = data.numMigrations;
    let firstActivity: number | null = data.firstActivity;
    let firstActivityTime: any = data.firstActivityTime;
    let lastActivity: number | null = data.lastActivity;
    let lastActivityTime: any = data.lastActivityTime;
    let contracts: Contract[] | null = data.contracts;
    let operations: Operation[] | null = data.operations;
    let metadata: AccountMetadata | null = data.metadata;
    if (delegationTime) {
      delegationTime = new Date(delegationTime);
    }
    if (firstActivityTime) {
      firstActivityTime = new Date(firstActivityTime);
    }
    if (lastActivityTime) {
      lastActivityTime = new Date(lastActivityTime);
    }
    return new Contract(type, alias, address, publicKey, revealed, balance, counter, delegate, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata);
  }

  /**
  * Fetches a number of contract accounts from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a number of contract accounts.
  * @see {@link https://api.tzkt.io/#operation/Contracts_GetCount | get contracts count }.
  *
  * @example Fetch Contract count
  * # Usage
  * ```typescript
  * let contractCount: number = Contract.count('delegator_contract')
  * ```
  *
  */
  static async count(kind: ContractKindParameter, domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: URL = new URL(`${domain}/v1/contracts/count`);
    url.search = new URLSearchParams({kind: kind}).toString();
    let response: Response = await fetch(<any>url, {
      method: 'GET',
    });
    let data = await response.text();
    return parseInt(data);
  }

  /**
  * Fetches contracts from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of contracts.
  * @see {@link https://api.tzkt.io/#operation/Contracts_Get | get contracts }.
  *
  * @example Fetch Contracts
  * # Usage
  * ```typescript
  * let parameters: GetContractParameters = {'kind': 'delegator_contract', includeStorage: true};
  * let contracts: Contract[] = await Contract.get(parameters);
  * ```
  *
  */
  static async get(parameters: GetContractParameters | null, domain: string = 'https://api.tzkt.io'): Promise<Contract[]> {
    let url: URL = new URL(`${domain}/v1/contracts`);
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
    var output: Contract[] = [];
    for (var i = 0; i < data.length; i++) {
      var contract: Contract = Contract.fromAPI(data[i]);
      output.push(contract);
    };
    return output;
  }

  /**
  * Returns a list of contracts created by (or related to) the specified account from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of contracts related to the specified account.
  * @see {@link https://api.tzkt.io/#operation/Accounts_GetByAddress | get account by address }.
  *
  * @example Fetch Contracts related to an Account
  * # Usage
  * ```typescript
  * let accountAddress: string = 'tz1WEHHVMWxQUtkWAgrJBFGXjJ5YqZVgfPVE';
  * let contracts: Contract[] = await Contract.byAccount(accountAddress);
  * ```
  *
  */
  static async byAccount(address: string, parameters: getRelatedToAddressParameters | null, domain: string = 'https://api.tzkt.io'): Promise<Contract[]> {
    let url: URL = new URL(`${domain}/v1/accounts/${address}/contracts`);
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
    var output: Contract[] = [];
    for (var i = 0; i < data.length; i++) {
      var contract: Contract = Contract.fromAPI(data[i]);
      output.push(contract);
    };
    return output;
  }

  /**
  * Fetches contracts by address from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a contract with the specified address.
  * @see {@link https://api.tzkt.io/#operation/Contracts_GetByAddress | get contract by address }.
  *
  * @example Fetch Contract by Address
  * # Usage
  * ```typescript
  * let contractAddress: string = 'KT1Sc5aXe5ZADkbdbXSBo2v6wNDgFP9XafRs';
  * let contract: Contract = await Contract.byAddress(contractAddress);
  * ```
  *
  */
  static async byAddress(address: string, domain: string = 'https://api.tzkt.io'): Promise<Contract> {
    let url: string = `${domain}/v1/contracts/${address}`;
    let response: Response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Contract.fromAPI(data);
  }

  /**
  * Fetches contracts which have the same interface (parameter and storage types) as the specified one from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @remark  Note, contract parameter and storage types are compared by 32-bit hash, so in very rare cases there may be collisions.
  *
  * @returns Returns a list of contracts.
  * @see {@link https://api.tzkt.io/#operation/Contracts_GetSimilar | get similar contracts }.
  *
  * @example Fetch Similar Contracts
  * # Usage
  * ```typescript
  * let contractAddress: string = 'KT1Sc5aXe5ZADkbdbXSBo2v6wNDgFP9XafRs';
  * let contracts: Contract[] = await Contract.similar(contractAddress);
  * ```
  *
  */
  static async similar(address: string, parameters: SimilarParameters | null, domain: string = 'https://api.tzkt.io'): Promise<Contract[]> {
    let url: URL = new URL(`${domain}/v1/contracts/${address}/similar`);
    url.search = new URLSearchParams(<any>parameters).toString();
    let response: Response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Contract[] = [];
    for (var i = 0; i < data.length; i++) {
      var contract: Contract = Contract.fromAPI(data[i]);
      output.push(contract);
    };
    return output;
  }

  /**
  * Fetches code for the specified contract from {@link https://tzkt.io/ | tzKT }.
  * @public

  * @returns Returns a code of the specified contract.
  * @see {@link https://api.tzkt.io/#operation/Contracts_GetCode | get contract code }.
  *
  * @example Fetch Code for a Contract
  * # Usage
  * ```typescript
  * let contractAddress: string = 'KT1Sc5aXe5ZADkbdbXSBo2v6wNDgFP9XafRs',
  *     format: number = 2; // return code in bytes
  * let contractCode: string = await Contract.code(contractAddress, format);
  * ```
  *
  */
  static async code(address: string, format: number, domain: string = 'https://api.tzkt.io'): Promise<string> {
    let url: URL = new URL(`${domain}/v1/contracts/${address}/code`);
    url.search = new URLSearchParams({'format': format.toString()}).toString();
    let response: Response = await fetch(<any>url, {
      method: 'GET',
    });
    return await response.text();
  }
}
