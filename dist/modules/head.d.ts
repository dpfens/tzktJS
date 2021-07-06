/// <reference path="types.d.ts" />
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
