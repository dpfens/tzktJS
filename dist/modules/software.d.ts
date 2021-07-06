/// <reference path="types.d.ts" />
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
