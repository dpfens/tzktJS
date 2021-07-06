/// <reference path="types.d.ts" />
/// <reference path="account.d.ts" />
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
