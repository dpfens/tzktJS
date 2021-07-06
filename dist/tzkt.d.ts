declare type AccountTypeParameter = 'user' | 'delegate' | 'contract';
declare type AccountSortParameter = 'Id' | 'balance' | 'firstActivity' | 'lastActivity' | 'numTransactions' | 'numContracts';
declare type BakingRightTypeParameter = 'baking' | 'endorsing';
declare type BakingRightStatusParameter = 'future' | 'realized' | 'uncovered' | 'missed';
declare type BlockSortParameter = 'id' | 'level' | 'priority' | 'validations' | 'reward' | 'fees';
declare type BigMapSortParameter = 'ptr' | 'firstLevel' | 'lastLevel' | 'totalKeys' | 'activeKeys' | 'updates';
declare type CommitmentSortParameter = 'id' | 'balance' | 'activationLevel';
declare type ContractKindParameter = 'delegator_contract' | 'smart_contract';
declare type CycleSortParameter = 'index';
declare type ContractSortParameter = 'id' | 'balance' | 'firstActivity' | 'lastActivity' | 'numTransactions';
declare type DelegateSortParameter = 'id' | 'activationLevel' | 'deactivationLevel' | 'stakingBalance' | 'balance' | 'numDelegators';
declare type ProposalSortParameter = 'id' | 'upvotes' | 'roll';
declare type SoftwareSortParameter = 'id' | 'firstLevel' | 'lastLevel' | 'blocksCount';
declare type StatisticSortParameter = 'id' | 'level' | 'cycle' | 'date';
declare type VotingStatus = 'none' | 'upvoted' | 'voted_yay' | 'voted_nay' | 'voted_pass';
interface BalanceShort {
    btc: number;
    eur: number;
    usd: number;
    cny: number;
    jpy: number;
    krw: number;
    eth: number;
}
interface Sortable {
    sort?: string;
    'sort.desc'?: string;
    'sort.asc'?: string;
}
interface PaginationParameters {
    offset?: number;
    'offset.pg'?: number;
    'offset.cr'?: number;
    limit?: number;
}
interface GetAccountParameters extends PaginationParameters, Sortable {
    accountType?: AccountTypeParameter;
    contractKind?: ContractKindParameter;
    delegate?: string;
    balance?: number;
    staked?: boolean;
    lastActivity?: Date;
    select?: string[];
}
declare class AccountMetadata {
    readonly kind: ContractKindParameter | null;
    readonly alias: string | null;
    readonly address: string | null;
    readonly balance: number;
    readonly delegate: any;
    readonly creationLevel: number | null;
    readonly creationTime: Date | null;
    constructor(kind: ContractKindParameter | null, alias: string | null, address: string | null, balance: number, delegate: any, creationLevel: number | null, creationTime: Date | null);
    static fromAPI(data: any): AccountMetadata;
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
declare class Balance {
    readonly level: number;
    readonly timestamp: Date;
    readonly quote: BalanceShort | null;
    readonly balance: number;
    constructor(balance: number, level: number, quote: BalanceShort | null, timestamp: Date);
    static fromAPI(data: any): Balance;
    static history(address: string, parameters: GetBalanceHistoryParameters | null, domain?: string): Promise<Balance[]>;
    static byLevel(address: string, level: number, domain?: string): Promise<number>;
    static byDate(address: string, date: Date, domain?: string): Promise<number>;
    static report(address: string, options: GetBalanceReportParameters | null, domain?: string): Promise<string>;
}
interface CountParameters {
    type?: AccountTypeParameter;
    kind?: ContractKindParameter;
    balance?: number;
    staked?: boolean;
}
declare class AccountBase {
    readonly type: AccountTypeParameter | null;
    readonly alias: string | null;
    readonly address: string | null;
    readonly publicKey: string | null;
    readonly revealed: boolean;
    readonly balance: number;
    readonly counter: number;
    readonly delegationLevel: number | null;
    readonly delegationTime: Date | null;
    readonly numContracts: number | null;
    readonly numActivations: number | null;
    readonly numDelegations: number | null;
    readonly numOriginations: number | null;
    readonly numTransactions: number | null;
    readonly numReveals: number | null;
    readonly numMigrations: number | null;
    readonly firstActivity: number | null;
    readonly firstActivityTime: Date | null;
    readonly lastActivity: number | null;
    readonly lastActivityTime: Date | null;
    readonly contracts: Contract[] | null;
    readonly operations: Operation[] | null;
    readonly metadata: any | null;
    constructor(type: AccountTypeParameter | null, alias: string | null, address: string | null, publicKey: string | null, revealed: boolean, balance: number, counter: number, delegationLevel: number | null, delegationTime: Date | null, numContracts: number | null, numActivations: number | null, numDelegations: number | null, numOriginations: number | null, numTransactions: number | null, numReveals: number | null, numMigrations: number | null, firstActivity: number | null, firstActivityTime: Date | null, lastActivity: number | null, lastActivityTime: Date | null, contracts: Contract[] | null, operations: Operation[] | null, metadata: any | null);
    toString(): string | null;
    static fromAPI(data: any): AccountBase;
}
declare class Account extends AccountBase {
    constructor(type: AccountTypeParameter | null, alias: string | null, address: string | null, publicKey: string | null, revealed: boolean, balance: number, counter: number, delegationLevel: number | null, delegationTime: Date | null, numContracts: number | null, numActivations: number | null, numDelegations: number | null, numOriginations: number | null, numTransactions: number | null, numReveals: number | null, numMigrations: number | null, firstActivity: number | null, firstActivityTime: Date | null, lastActivity: number | null, lastActivityTime: Date | null, contracts: Contract[] | null, operations: Operation[] | null, metadata: any | null);
    static fromAPI(data: any): Account;
    static get(options: GetAccountParameters, domain?: string): Promise<Account[]>;
    static count(parameters: CountParameters | null, domain?: string): Promise<number>;
    static byAddress(address: string, metadata?: boolean, domain?: string): Promise<Account>;
    static getMetadata(address: string, domain?: string): Promise<any>;
    static suggestions(query: string, domain?: string): Promise<any>;
}
interface GetBigMapParameters extends PaginationParameters, Sortable {
    contract?: AccountTypeParameter;
    path?: string;
    tags?: string[];
    active?: boolean;
    lastLevel?: number;
    select?: string[];
    micheline?: number;
}
interface GetBigMapUpdatesParameters extends PaginationParameters, Sortable {
    bigmap?: number;
    contract?: AccountTypeParameter;
    path?: string;
    tags?: string[];
    action?: any[];
    value?: any;
    level?: number;
    micheline?: number;
}
declare class BigMap {
    readonly ptr: number;
    readonly contract: string | null;
    readonly path: string | null;
    readonly tags: string[] | null;
    readonly active: boolean;
    readonly firstLevel: number;
    readonly lastLevel: number;
    readonly totalKeys: number;
    readonly activeKeys: number;
    readonly updates: number;
    readonly keyType: any | null;
    readonly valueType: any | null;
    constructor(ptr: number, contract: string | null, path: string | null, tags: string[] | null, active: boolean, firstLevel: number, lastLevel: number, totalKeys: number, activeKeys: number, updates: number, keyType: any | null, valueType: any | null);
    static fromAPI(data: any): BigMap;
    static get(parameters: GetBigMapParameters, domain?: string): Promise<BigMap[]>;
    static byID(id: number, micheline?: number, domain?: string): Promise<BigMap>;
}
declare class BigMapType {
    readonly prim: number;
    readonly args: object[] | null;
    readonly annots: object[] | null;
    constructor(prim: number, args: object[] | null, annots: object[] | null);
    static fromAPI(data: any): BigMapType;
    static get(id: number, domain?: string): Promise<BigMapType>;
}
declare class BigMapUpdate {
    id: number;
    level: number;
    timestamp: Date;
    bigmap: number;
    contract: any;
    path: string;
    action: string;
    content: any;
    constructor(id: number, level: number, timestamp: Date, bigmap: number, contract: any, path: string, action: string, content: any);
    static fromAPI(data: any): BigMapUpdate;
}
declare class BigMapKey {
    id: number;
    active: boolean;
    hash: string | null;
    key: any | null;
    value: any | null;
    firstLevel: number;
    lastLevel: number;
    updates: number;
    constructor(id: number, active: boolean, hash: string | null, key: any | null, value: any | null, firstLevel: number, lastLevel: number, updates: number);
    static fromAPI(data: any): BigMapKey;
    static byBigMap(bigMapId: string, parameters: any | null, domain?: string): Promise<BigMapKey[]>;
    static byKey(bigMapId: string, key: number, domain?: string): Promise<BigMapKey>;
}
interface GetBlockParameters extends PaginationParameters, Sortable {
    baker?: string;
    level?: number;
    timestamp?: Date;
    priority?: number;
    select?: string;
    quote?: string;
}
declare class Block {
    readonly level: number;
    readonly hash: string | null;
    readonly timestamp: Date;
    readonly proto: number;
    readonly priority: number;
    readonly validations: number;
    readonly deposit: number;
    readonly reward: number;
    readonly fees: number;
    readonly nonceRevealed: boolean;
    readonly baker: any | null;
    readonly software: any | null;
    readonly endorsements: Operation[];
    readonly proposals: Operation[];
    readonly ballots: Operation[];
    readonly activations: Operation[];
    readonly doubleBaking: Operation[];
    readonly doubleEndorsing: Operation[];
    readonly nonceRevelations: Operation[];
    readonly delegations: Operation[];
    readonly originations: Operation[];
    readonly transactions: Operation[];
    readonly reveals: Operation[];
    readonly quote: BalanceShort;
    constructor(level: number, hash: string | null, timestamp: Date, proto: number, priority: number, validations: number, deposit: number, reward: number, fees: number, nonceRevealed: boolean, baker: any | null, software: any | null, endorsements: Operation[], proposals: Operation[], ballots: Operation[], activations: Operation[], doubleBaking: Operation[], doubleEndorsing: Operation[], nonceRevelations: Operation[], delegations: Operation[], originations: Operation[], transactions: Operation[], reveals: Operation[], quote: BalanceShort);
    static fromAPI(data: any): Block;
    static get(parameters: GetBlockParameters, domain?: string): Promise<Block[]>;
    static byHash(hash: string, domain?: string): Promise<Block>;
    static byLevel(level: number, domain?: string): Promise<Block>;
    static count(domain?: string): Promise<number>;
}
interface GetCommitmentParameters extends PaginationParameters, Sortable {
    activated?: boolean;
    activationLevel?: number;
    balance?: number;
    select?: string;
}
interface GetCommitmentCountParameters {
    activated?: boolean;
    balance?: number;
}
declare class Commitment {
    address: string | null;
    balance: number;
    activated: boolean;
    activationLevel: number | null;
    activationTime: Date | null;
    activatedAccount: any | null;
    constructor(address: string | null, balance: number, activated: boolean, activationLevel: number | null, activationTime: Date | null, activatedAccount: any | null);
    static fromAPI(data: any): Commitment;
    static get(parameters: GetCommitmentParameters, domain?: string): Promise<Commitment[]>;
    static count(parameters?: GetCommitmentCountParameters, domain?: string): Promise<number>;
    static byBlindedAddress(address: string, domain?: string): Promise<Commitment>;
}
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
declare class EntryPoint {
    readonly name: string;
    readonly jsonParameters: any;
    readonly michelineParameters: any;
    readonly michelsonParameters: string | null;
    readonly unused: boolean;
    constructor(name: string, jsonParameters: any, michelineParameters: any, michelsonParameters: string | null, unused: boolean);
    static fromAPI(data: any): EntryPoint;
    byName(address: string, name: string, parameters: EntryPointByNameParameters | null, domain?: string): Promise<EntryPoint>;
}
interface getRelatedToAddressParameters extends PaginationParameters, Sortable {
}
declare class Contract extends AccountBase {
    readonly delegate: number | null;
    constructor(type: AccountTypeParameter | null, alias: string | null, address: string | null, publicKey: string | null, revealed: boolean, balance: number, counter: number, delegate: number | null, delegationLevel: number | null, delegationTime: Date | null, numContracts: number | null, numActivations: number | null, numDelegations: number | null, numOriginations: number | null, numTransactions: number | null, numReveals: number | null, numMigrations: number | null, firstActivity: number | null, firstActivityTime: Date | null, lastActivity: number | null, lastActivityTime: Date | null, contracts: Contract[] | null, operations: Operation[] | null, metadata: any | null);
    static fromAPI(data: any): Contract;
    static count(kind: ContractKindParameter, domain?: string): Promise<number>;
    static get(parameters: GetContractParameters | null, domain?: string): Promise<Contract[]>;
    static byAccount(address: string, parameters: getRelatedToAddressParameters | null, domain?: string): Promise<Contract[]>;
    static byAddress(address: string, domain?: string): Promise<Contract>;
    static similar(address: string, parameters: SimilarParameters | null, domain?: string): Promise<Contract[]>;
    static code(address: string, format: number, domain?: string): Promise<string>;
}
interface GetCycleParameters extends PaginationParameters, Sortable {
    snapshotIndex?: number;
    select?: string[];
    quote?: string;
}
declare class Cycle {
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
    constructor(index: number, firstLevel: number, startTime: Date, lastLevel: number, endTime: Date, snapshotIndex: number, snapshotLevel: number, randomSeed: string | null, totalBakers: number, totalRolls: number, totalStaking: number, totalDelegators: number, totalDelegated: number, quote: BalanceShort | null);
    static fromAPI(data: any): Cycle;
    static get(parameters: GetCycleParameters | null, domain?: string): Promise<Cycle[]>;
    static byIndex(index: number, quote: string | null, domain?: string): Promise<Cycle>;
    static count(domain?: string): Promise<number>;
}
interface GetDelegateParameters extends PaginationParameters, Sortable {
    active?: boolean;
    lastActivity?: number;
    select?: string[];
}
declare class ShortSoftware {
    readonly version: string;
    readonly date: Date;
    constructor(version: string, date: Date);
    static fromAPI(data: any): ShortSoftware;
}
declare class Delegate extends AccountBase {
    readonly frozenDeposits: number;
    readonly frozenRewards: number;
    readonly frozenFees: number;
    readonly delegate: any | null;
    readonly stakingBalance: number;
    readonly numDelegators: number;
    readonly numBlocks: number;
    readonly numEndorsements: number;
    readonly numBallots: number;
    readonly numProposals: number;
    readonly numDoubleBaking: number;
    readonly numDoubleEndorsing: number;
    readonly numNonceRevelations: number;
    readonly numRelevationPenalties: number;
    readonly metadata: any | null;
    readonly software: ShortSoftware | null;
    constructor(type: AccountTypeParameter | null, alias: string | null, address: string | null, publicKey: string | null, revealed: boolean, balance: number, frozenDeposits: number, frozenRewards: number, frozenFees: number, counter: number, delegate: any | null, delegationLevel: number | null, delegationTime: Date | null, stakingBalance: number, numContracts: number, numDelegators: number, numBlocks: number, numEndorsements: number, numBallots: number, numProposals: number, numActivations: number, numDoubleBaking: number, numDoubleEndorsing: number, numNonceRevelations: number, numRelevationPenalties: number, numDelegations: number, numOriginations: number, numTransactions: number, numReveals: number, numMigrations: number, firstActivity: number | null, firstActivityTime: Date | null, lastActivity: number | null, lastActivityTime: Date | null, contracts: Contract[] | null, operations: Operation[] | null, metadata: any | null, software: ShortSoftware | null);
    static fromAPI(data: any): Delegate;
    static get(parameters: GetDelegateParameters | null, domain?: string): Promise<Delegate[]>;
    static count(active?: boolean, domain?: string): Promise<number>;
    static byAddress(address: string, domain?: string): Promise<Delegate>;
}
declare class Head {
    readonly cycle: number;
    readonly level: number;
    readonly hash: string | null;
    readonly protocol: string | null;
    readonly timestamp: Date;
    readonly votingEpoch: number;
    readonly votingPeriod: number;
    readonly knownLevel: number;
    readonly lastSync: Date;
    readonly synced: boolean;
    readonly quoteLevel: number;
    readonly quoteBtc: number;
    readonly quoteEur: number;
    readonly quoteUsd: number;
    readonly quoteCny: number;
    readonly quoteJpy: number;
    readonly quoteKrw: number;
    readonly quoteEth: number;
    constructor(cycle: number, level: number, hash: string | null, protocol: string | null, timestamp: Date, votingEpoch: number, votingPeriod: number, knownLevel: number, lastSync: Date, synced: boolean, quoteLevel: number, quoteBtc: number, quoteEur: number, quoteUsd: number, quoteCny: number, quoteJpy: number, quoteKrw: number, quoteEth: number);
    static fromAPI(data: any): Head;
    static get(domain?: string): Promise<Head>;
}
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
declare class Operation {
    readonly type: string | null;
    readonly id: number;
    readonly level: number;
    readonly timestamp: Date;
    readonly block: string | null;
    readonly hash: string | null;
    readonly delegate: string | null;
    readonly slots: number;
    readonly deposit: number;
    readonly rewards: number;
    readonly quote: BalanceShort | null;
    constructor(type: string | null, id: number, level: number, timestamp: Date, block: string | null, hash: string | null, delegate: string | null, slots: number, deposit: number, rewards: number, quote: BalanceShort | null);
    static fromAPI(data: any): Operation;
    static byHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static ByHashCounter(hash: string, counter: number, quote?: string, domain?: string): Promise<Operation[]>;
    static byAccount(address: string, options: GetByAddressParameters | null, domain?: string): Promise<Operation[]>;
    static typeByHash(type: string, hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static typeCount(type: string, level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static endorsementsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static endorsementsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static ballotsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static ballotsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static proposalsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static proposalsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static activationsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static activationsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static doubleBakingByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static doubleBakingCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static doubleEndorsingByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static doubleEndorsingCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static nonceRevelationsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static nonceRevelationsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static delegationsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static delegationsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static originationsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static originationsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static transactionsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static transactionsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static revealsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static revealsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static migrationsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static migrationsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static revelationPenaltiesByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static revelationPenaltiesCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static bakingByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static bakingCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
}
interface GetProtocolParameters extends PaginationParameters, Sortable {
    offset?: number;
    limit?: number;
}
declare class Protocol {
    readonly code: number;
    readonly hash: string | null;
    readonly firstLevel: number;
    readonly lastLevel: number | null;
    readonly constants: any[] | null;
    readonly metadata: any | null;
    constructor(code: number, hash: string | null, firstLevel: number, lastLevel: number | null, constants: any[] | null, metadata: any | null);
    static fromAPI(data: any): Protocol;
    static count(domain?: string): Promise<number>;
    static get(parameters: GetProtocolParameters | null, domain?: string): Promise<Protocol[]>;
    static byCode(code: number, domain?: string): Promise<Protocol>;
    static byHash(hash: string, domain?: string): Promise<Protocol>;
    static byCycle(cycle: number, domain?: string): Promise<Protocol>;
    static current(domain?: string): Promise<Protocol>;
    static suggestions(query: string, domain?: string): Promise<any[]>;
}
interface GetQuoteParameters extends PaginationParameters, Sortable {
    level?: number;
    timestamp?: Date;
    select?: string;
}
declare class Quote {
    level: number;
    timestamp: Date;
    btc: number;
    eur: number;
    usd: number;
    cny: number;
    jpy: number;
    krw: number;
    eth: number;
    constructor(level: number, timestamp: Date, btc: number, eur: number, usd: number, cny: number, jpy: number, krw: number, eth: number);
    static fromAPI(data: any): Quote;
    static last(domain?: string): Promise<Quote>;
    static get(parameters: GetQuoteParameters, domain?: string): Promise<Quote[]>;
    static count(domain?: string): Promise<number>;
}
interface GetBakerCycleRewardsParameters extends PaginationParameters, Sortable {
    cycle?: number;
    select?: string[];
    quote?: string;
}
declare class Reward {
    cycle: number;
    stakingBalance: number;
    delegatedBalance: number;
    numDelegators: number;
    expectedBlocks: number;
    expectedEndorsements: number;
    futureBlocks: number;
    futureBlockRewards: number;
    futureBlockDeposits: number;
    ownBlocks: number;
    ownBlockRewards: number;
    extraBlocks: number;
    extraBlockRewards: number;
    missedOwnBlocks: number;
    missedOwnBlockRewards: number;
    missedExtraBlocks: number;
    missedExtraBlockRewards: number;
    uncoveredOwnblocks: number;
    uncoveredOwnBlockRewards: number;
    uncoveredExtraBlocks: number;
    uncoveredExtraBlockRewards: number;
    blockDeposits: number;
    futureEndorsements: number;
    futureEndorsementRewards: number;
    futureEndorsementDeposits: number;
    endorsements: number;
    endorsementRewards: number;
    missedEndorsements: number;
    missedEndorsementRewards: number;
    uncoveredEndorsements: number;
    uncoveredEndorsementRewards: number;
    endorsementDeposits: number;
    ownBlockFees: number;
    extraBlockFees: number;
    missedOwnBlockFees: number;
    missedExtraBlockFees: number;
    uncoveredOwnBlockFees: number;
    uncoveredExtraBlockFees: number;
    doubleBakingRewards: number;
    doubleBakingLostDeposits: number;
    doubleBakingLostRewards: number;
    doubleBakingLostFees: number;
    doubleEndorsingRewards: number;
    doubleEndorsingLostDeposits: number;
    doubleEndorsingLostFees: number;
    revelationRewards: number;
    revelationLostFees: number;
    quote: BalanceShort | null;
    constructor(cycle: number, stakingBalance: number, delegatedBalance: number, numDelegators: number, expectedBlocks: number, expectedEndorsements: number, futureBlocks: number, futureBlockRewards: number, futureBlockDeposits: number, ownBlocks: number, ownBlockRewards: number, extraBlocks: number, extraBlockRewards: number, missedOwnBlocks: number, missedOwnBlockRewards: number, missedExtraBlocks: number, missedExtraBlockRewards: number, uncoveredOwnblocks: number, uncoveredOwnBlockRewards: number, uncoveredExtraBlocks: number, uncoveredExtraBlockRewards: number, blockDeposits: number, futureEndorsements: number, futureEndorsementRewards: number, futureEndorsementDeposits: number, endorsements: number, endorsementRewards: number, missedEndorsements: number, missedEndorsementRewards: number, uncoveredEndorsements: number, uncoveredEndorsementRewards: number, endorsementDeposits: number, ownBlockFees: number, extraBlockFees: number, missedOwnBlockFees: number, missedExtraBlockFees: number, uncoveredOwnBlockFees: number, uncoveredExtraBlockFees: number, doubleBakingRewards: number, doubleBakingLostDeposits: number, doubleBakingLostRewards: number, doubleBakingLostFees: number, doubleEndorsingRewards: number, doubleEndorsingLostDeposits: number, doubleEndorsingLostFees: number, revelationRewards: number, revelationLostFees: number, quote: BalanceShort | null);
    static fromAPI(data: any): Reward;
    static bakerCount(address: string, domain?: string): Promise<number>;
    static byBaker(address: string, parameters: GetBakerCycleRewardsParameters | null, domain?: string): Promise<Reward[]>;
    static byBakerCycle(address: string, cycle: number, quote: string | null, domain?: string): Promise<Reward>;
    static byDelegator(address: string, parameters: GetBakerCycleRewardsParameters | null, domain?: string): Promise<Reward[]>;
    static byDelegatorCycle(address: string, cycle: number, quote: string | null, domain?: string): Promise<Reward>;
    static bakerRewardSplits(address: string, cycle: number, parameters: PaginationParameters | null, domain?: string): Promise<Reward>;
    static rewardSplitsDelegator(baker: string, cycle: number, delegator: string, domain?: string): Promise<any>;
}
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
declare class Right {
    readonly type: string | null;
    readonly cycle: number;
    readonly level: number;
    readonly timestamp: Date;
    readonly priority: number | null;
    readonly slots: number | null;
    readonly baker: any | null;
    readonly status: BakingRightStatusParameter | null;
    constructor(type: string | null, cycle: number, level: number, timestamp: Date, priority: number | null, slots: number | null, baker: any | null, status: BakingRightStatusParameter | null);
    static fromAPI(data: any): Right;
    static get(parameters: GetRightsParameters, domain?: string): Promise<Right[]>;
    static count(parameters: GetRightCountParameters | null, domain?: string): Promise<number>;
}
interface GetSoftwareParameters extends PaginationParameters, Sortable {
    select?: string[];
}
declare class Software {
    shortHash: string | null;
    firstLevel: number | null;
    firstTime: Date | null;
    lastLevel: number | null;
    lastTime: Date | null;
    blocksCount: number;
    metadata: any;
    constructor(shortHash: string | null, firstLevel: number | null, firstTime: Date | null, lastLevel: number | null, lastTime: Date | null, blocksCount: number, metadata: any);
    static fromAPI(data: any): Software;
    static get(parameters: GetSoftwareParameters, domain?: string): Promise<Software[]>;
    static count(domain?: string): Promise<number>;
}
interface GetStatisticParameters extends PaginationParameters, Sortable {
    level?: number;
    timestamp?: Date;
    select?: string;
    quote?: string;
}
interface GetDailyStatisticParameters extends PaginationParameters, Sortable {
    date?: Date;
    select?: string[];
    quote?: string;
}
interface GetCyclicStatisticParameters extends PaginationParameters, Sortable {
    cycle?: number;
    select?: string;
    quote?: string;
}
declare class Statistics {
    cycle: number | null;
    date: Date | null;
    level: number;
    timestamp: Date;
    totalSupply: number;
    circulatingSupply: number;
    totalBootstrapped: number;
    totalCommitments: number;
    totalActivated: number;
    totalCreated: number;
    totalBurned: number;
    totalVested: number;
    totalFrozen: number;
    quote: BalanceShort | null;
    constructor(cycle: number | null, date: Date | null, level: number, timestamp: Date, totalSupply: number, circulatingSupply: number, totalBootstrapped: number, totalCommitments: number, totalActivated: number, totalCreated: number, totalBurned: number, totalVested: number, totalFrozen: number, quote: BalanceShort | null);
    static fromAPI(data: any): Statistics;
    static get(parameters: GetStatisticParameters, domain?: string): Promise<Statistics[]>;
    static daily(options: GetDailyStatisticParameters | null, domain?: string): Promise<Statistics[]>;
    static cyclic(parameters: GetCyclicStatisticParameters | null, domain?: string): Promise<Statistics[]>;
    static current(select: string | null, quote: string | null, domain?: string): Promise<Statistics>;
}
interface GetProposalParameters extends PaginationParameters, Sortable {
    epoch?: number;
    select?: string[];
}
declare class Proposal {
    hash: string | null;
    initiator: string | null;
    firstPeriod: number;
    lastPeriod: number;
    epoch: number;
    upvotes: number;
    rolls: number;
    status: string | null;
    metadata: any | null;
    constructor(hash: string | null, initiator: string | null, firstPeriod: number, lastPeriod: number, epoch: number, upvotes: number, rolls: number, status: string | null, metadata: any | null);
    static suggestions(query: string, domain?: string): Promise<any[]>;
    static fromAPI(data: any): Proposal;
    static get(parameters: GetProposalParameters, domain?: string): Promise<Proposal[]>;
    static count(domain?: string): Promise<number>;
    static byHash(hash: string, domain?: string): Promise<Proposal>;
}
interface GetVotingPeriodParameters extends PaginationParameters, Sortable {
    select?: string[];
}
declare class VotingPeriod {
    index: number;
    epoch: number;
    firstLevel: number;
    startTime: Date;
    lastLevel: number;
    endTime: Date;
    kind: string | null;
    status: string | null;
    totalBakers: number | null;
    totalRolls: number | null;
    upvotesQuorum: number | null;
    proposalsCount: number | null;
    topUpvotes: number | null;
    topRolls: number | null;
    ballotQuorum: number | null;
    supermajority: number | null;
    yayBallots: number | null;
    yayRolls: number | null;
    nayBallots: number | null;
    nayRolls: number | null;
    passBallots: number | null;
    passRolls: number | null;
    constructor(index: number, epoch: number, firstLevel: number, startTime: Date, lastLevel: number, endTime: Date, kind: string | null, status: string | null, totalBakers: number | null, totalRolls: number | null, upvotesQuorum: number | null, proposalsCount: number | null, topUpvotes: number | null, topRolls: number | null, ballotQuorum: number | null, supermajority: number | null, yayBallots: number | null, yayRolls: number | null, nayBallots: number | null, nayRolls: number | null, passBallots: number | null, passRolls: number | null);
    static fromAPI(data: any): VotingPeriod;
    static get(parameters: GetVotingPeriodParameters, domain?: string): Promise<VotingPeriod[]>;
    static byIndex(index: number, domain?: string): Promise<VotingPeriod>;
    static current(domain?: string): Promise<VotingPeriod>;
}
interface GetVotingEpochParameters extends PaginationParameters, Sortable {
}
declare class VotingEpoch {
    index: number;
    firstLevel: number;
    startTime: Date;
    lastLevel: number;
    endTime: Date;
    status: string | null;
    periods: VotingPeriod[] | null;
    proposals: Proposal[] | null;
    constructor(index: number, firstLevel: number, startTime: Date, lastLevel: number, endTime: Date, status: string | null, periods: VotingPeriod[] | null, proposals: Proposal[] | null);
    static fromAPI(data: any): VotingEpoch;
    static get(parameters: GetVotingPeriodParameters, domain?: string): Promise<VotingEpoch[]>;
    static byIndex(index: number, domain?: string): Promise<VotingEpoch>;
    static current(domain?: string): Promise<VotingEpoch>;
    static latest(domain?: string): Promise<VotingEpoch>;
}
interface GetPeriodVoterParameters extends PaginationParameters, Sortable {
    status?: VotingStatus;
}
declare class PeriodVoter {
    delegate: any;
    rolls: number;
    status: string | null;
    constructor(delegate: any, rolls: number, status: string | null);
    static fromAPI(data: any): PeriodVoter;
    static get(index: number, parameters: GetPeriodVoterParameters | null, domain?: string): Promise<PeriodVoter[]>;
    static byAddress(index: number, address: string, domain?: string): Promise<PeriodVoter>;
    static current(parameters: GetPeriodVoterParameters | null, domain?: string): Promise<PeriodVoter[]>;
    static currentByAddress(address: string, domain?: string): Promise<PeriodVoter>;
}
