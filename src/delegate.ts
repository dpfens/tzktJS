/// <reference path="types.ts"/>
/// <reference path="account.ts"/>


interface GetDelegateParameters extends PaginationParameters, Sortable {
  active?: boolean;
  lastActivity?: number;
  select?: string[];
}


class ShortSoftware {
  public readonly version: string;
  public readonly date: Date;

  /**
  * @internal
  */
  constructor (version: string, date: Date) {
    this.version = version;
    this.date = date;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): ShortSoftware {
    let version: string = data.version,
        date: Date = new Date(data.date);
    return new ShortSoftware(version, date);
  }
}

/**
* A delegate is an account to which another account has delegated their baking and endorsement rights.
*/
class Delegate extends AccountBase {
  public readonly frozenDeposits: number;
  public readonly frozenRewards: number;
  public readonly frozenFees: number;
  public readonly delegate: any | null;
  public readonly stakingBalance: number;
  public readonly numDelegators: number;
  public readonly numBlocks: number;
  public readonly numEndorsements: number;
  public readonly numBallots: number;
  public readonly numProposals: number;
  public readonly numDoubleBaking: number;
  public readonly numDoubleEndorsing: number;
  public readonly numNonceRevelations: number;
  public readonly numRelevationPenalties: number;
  public readonly metadata: any | null;
  public readonly software: ShortSoftware | null;

  /**
  * @internal
  */
  constructor(type: AccountTypeParameter | null, alias: string | null, address: string | null, publicKey: string | null, revealed: boolean, balance: number, frozenDeposits: number, frozenRewards: number, frozenFees: number, counter: number, delegate: any | null, delegationLevel: number | null, delegationTime: Date | null, stakingBalance: number, numContracts: number, numDelegators: number, numBlocks: number, numEndorsements: number, numBallots: number, numProposals: number, numActivations: number, numDoubleBaking: number, numDoubleEndorsing: number, numNonceRevelations: number, numRelevationPenalties: number, numDelegations: number, numOriginations: number, numTransactions: number, numReveals: number, numMigrations: number, firstActivity: number | null, firstActivityTime: Date | null, lastActivity: number | null, lastActivityTime: Date | null, contracts: Contract[] | null, operations: Operation[] | null, metadata: any | null, software: ShortSoftware | null) {
    super(type, alias, address, publicKey, revealed, balance, counter, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata);
    this.frozenDeposits = frozenDeposits;
    this.frozenRewards = frozenRewards;
    this.frozenFees = frozenFees;
    this.delegate = delegate;
    this.stakingBalance = stakingBalance;
    this.numDelegators = numDelegators;
    this.numBlocks = numBlocks;
    this.numBallots = numBallots;
    this.numEndorsements = numEndorsements;
    this.numProposals = numProposals;
    this.numDoubleBaking = numDoubleBaking;
    this.numDoubleEndorsing = numDoubleEndorsing;
    this.numNonceRevelations = numNonceRevelations;
    this.numRelevationPenalties = numRelevationPenalties;
    this.software = software;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Delegate {
    let type = data.type,
    alias = data.alias,
    address = data.address,
    publicKey = data.publicKey,
    revealed = data.revealed,
    balance = data.balance,
    frozenDeposits = data.frozenDeposits,
    frozenRewards = data.frozenRewards,
    frozenFees = data.frozenFees,
    counter = data.counter,
    delegate = data.delegate,
    delegationLevel = data.delegationLevel,
    delegationTime = data.delegationTime,
    stakingBalance = data.stakingBalance,
    numContracts = data.numContracts,
    numDelegators = data.numDelegators,
    numBlocks = data.numBlocks,
    numEndorsements = data.numEndorsements,
    numBallots = data.numBallots,
    numProposals = data.numProposals,
    numActivations = data.numActivations,
    numDoubleBaking = data.numDoubleBaking,
    numDoubleEndorsing = data.numDoubleEndorsing,
    numNonceRevelations = data.numNonceRevelations,
    numRelevationPenalties = data.numRelevationPenalties,
    numDelegations = data.numDelegations,
    numOriginations = data.numOriginations,
    numTransactions = data.numTransactions,
    numReveals = data.numReveals,
    numMigrations = data.numMigrations,
    firstActivity = data.firstActivity,
    firstActivityTime = data.firstActivityTime,
    lastActivity = data.lastActivity,
    lastActivityTime = data.lastActivityTime,
    contracts = data.contracts,
    operations = data.operations,
    metadata = data.metadata,
    software = data.software;
    if (software) {
      software = ShortSoftware.fromAPI(software);
    }
    if (firstActivityTime) {
      firstActivityTime = new Date(firstActivityTime);
    }
    if (lastActivityTime) {
      lastActivityTime = new Date(lastActivityTime);
    }

    return new Delegate(type, alias, address, publicKey, revealed, balance, frozenDeposits, frozenRewards, frozenFees, counter, delegate, delegationLevel, delegationTime, stakingBalance, numContracts, numDelegators, numBlocks, numEndorsements, numBallots, numProposals, numActivations, numDoubleBaking, numDoubleEndorsing, numNonceRevelations, numRelevationPenalties, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata, software);
  }

  /**
  * Fetches delegates from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of Delegates.
  * @see {@link https://api.tzkt.io/#operation/Delegates_Get | get delegates }.
  *
  * @example Fetching/Filtering Delegates
  * # Usage
  * ## Filter by snapshotIndex range
  * ```typescript
  * let delegates: Delegate[] = await Delegate.get({'active': false});
  * ```
  *
  */
  static async get(parameters: GetDelegateParameters | null, domain: string = 'https://api.tzkt.io'): Promise<Delegate[]> {
    let url: URL = new URL(`${domain}/v1/delegates`);
    if (parameters) {
      parameters = parameters as Record<string, string>;
      url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Delegate[] = [];
    for (var i = 0; i < data.length; i++) {
      var delegate: Delegate = Delegate.fromAPI(data[i]);
      output.push(delegate);
    };
    return output;
  }

  /**
  * Fetches a number of delegate accounts from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a number of delegate accounts.
  * @see {@link https://api.tzkt.io/#operation/Delegates_GetCount | get delegates count }.
  *
  * @example Fetching Delegate Count
  * # Usage
  * ## Filter by Active Status
  * ```typescript
  * let activeDelegateCount: number = await Delegate.count(true);
  * let inactiveDelegateCount: number = await Delegate.count(false);
  * let allDelegateCount: number = await Delegate.count();
  * ```
  *
  */
  static async count(active?: boolean, domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: URL = new URL(`${domain}/v1/delegates/count`);
    if (typeof active !== 'undefined') {
      let parameters: any = {'active': active};
      url.search = new URLSearchParams(parameters).toString();
    }
    let response: Response = await fetch(<any>url, {
      method: 'GET',
    });
    let data = await response.text();
    return parseInt(data);
  }

  /**
  * Returns a delegate with the specified address from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a delegate with the specified address.
  * @see {@link https://api.tzkt.io/#operation/Delegates_GetByAddress | get delegate by address }.
  *
  * @example Fetching Delegate Count
  * # Usage
  * ```typescript
  * let address: string = 'tz1VA615KkeXTfZVAxsjAXfnozt3gMzYk8Zv';
  * let delegate: Delegate = await Delegate.byAddress(address);
  * ```
  *
  */
  static async byAddress(address: string, domain: string = 'https://api.tzkt.io'): Promise<Delegate> {
    let url: string = `${domain}/v1/delegates/${address}`;
    let response: Response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Delegate.fromAPI(data);
  }
}
