/// <reference path="types.d.ts" />
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
