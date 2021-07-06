/// <reference path="types.d.ts" />
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
