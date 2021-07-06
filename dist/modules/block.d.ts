/// <reference path="types.d.ts" />
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
