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
