/// <reference path="types.d.ts" />
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
    static getEndorsements(parameters?: GetEndorsementsParameters, domain?: string): Promise<Operation[]>;
    static endorsementsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static endorsementsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static getBallots(parameters?: GetBallotsParameters, domain?: string): Promise<Operation[]>;
    static ballotsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static ballotsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static getProposals(parameters?: GetProposalParameters, domain?: string): Promise<Operation[]>;
    static proposalsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static proposalsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static getActivations(parameters?: GetActivationParameters, domain?: string): Promise<Operation[]>;
    static activationsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static activationsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static getDoubleBakings(parameters?: GetDoubleBakingParameters, domain?: string): Promise<Operation[]>;
    static doubleBakingByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static doubleBakingCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static getDoubleEndorsings(parameters?: GetDoubleEndorsingParameters, domain?: string): Promise<Operation[]>;
    static doubleEndorsingByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static doubleEndorsingCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static getNonceRevelations(parameters?: GetNonceRevelationParameters, domain?: string): Promise<Operation[]>;
    static nonceRevelationsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static nonceRevelationsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static getDelegations(parameters?: GetDelegationParameters, domain?: string): Promise<Operation[]>;
    static delegationsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static delegationsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static getOriginations(parameters?: GetOriginationParameters, domain?: string): Promise<Operation[]>;
    static originationsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static originationsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static getTransactions(parameters?: GetTransactionParameters, domain?: string): Promise<Operation[]>;
    static transactionsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static transactionsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static getReveals(parameters?: GetRevealParameters, domain?: string): Promise<Operation[]>;
    static revealsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static revealsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static getMigrations(parameters?: GetMigrationParameters, domain?: string): Promise<Operation[]>;
    static migrationsByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static migrationsCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static getRevelationPenalties(parameters?: GetRevelationPenaltyParameters, domain?: string): Promise<Operation[]>;
    static revelationPenaltiesByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static revelationPenaltiesCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
    static getBakings(parameters?: GetBakingParameters, domain?: string): Promise<Operation[]>;
    static bakingByHash(hash: string, quote: string | null, domain?: string): Promise<Operation[]>;
    static bakingCount(level: number | null, timestamp: Date | null, domain?: string): Promise<number>;
}
