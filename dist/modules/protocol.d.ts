/// <reference path="types.d.ts" />
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
