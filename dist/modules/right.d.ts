/// <reference path="types.d.ts" />
interface GetRightCountParameters {
    type?: BakingRightTypeParameter;
    baker?: string;
    cycle?: number;
    level?: number;
    slots?: number;
    priority?: number;
    status?: BakingRightStatusParameter;
}
interface GetRightsParameters extends PaginationParameters, Sortable {
    type?: BakingRightTypeParameter;
    baker?: string;
    cycle?: number;
    level?: number;
    slots?: number;
    priority?: number;
    status?: BakingRightStatusParameter;
    select?: string[];
}
declare class Right {
    readonly type: string | null;
    readonly cycle: number;
    readonly level: number;
    readonly timestamp: Date;
    readonly priority: number | null;
    readonly slots: number | null;
    readonly baker: any | null;
    readonly status: BakingRightStatusParameter | null;
    constructor(type: string | null, cycle: number, level: number, timestamp: Date, priority: number | null, slots: number | null, baker: any | null, status: BakingRightStatusParameter | null);
    static fromAPI(data: any): Right;
    static get(parameters: GetRightsParameters, domain?: string): Promise<Right[]>;
    static count(parameters: GetRightCountParameters | null, domain?: string): Promise<number>;
}
