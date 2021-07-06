/// <reference path="types.d.ts" />
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
