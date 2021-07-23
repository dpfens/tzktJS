/// <reference path="types.d.ts" />
interface GetBigMapParameters extends PaginationParameters, Sortable {
    contract?: AccountTypeParameter;
    path?: string;
    tags?: string[];
    active?: boolean;
    lastLevel?: number;
    select?: string[];
    micheline?: number;
}
interface GetBigMapUpdatesParameters extends PaginationParameters, Sortable {
    bigmap?: number;
    contract?: AccountTypeParameter;
    path?: string;
    tags?: string[];
    action?: any[];
    value?: any;
    level?: number;
    micheline?: number;
}
interface GetBigMapByContractParameters extends PaginationParameters, Sortable {
    select?: string[];
    tags?: string[];
    micheline?: number;
}
declare class BigMap {
    readonly ptr: number;
    readonly contract: string | null;
    readonly path: string | null;
    readonly tags: string[] | null;
    readonly active: boolean;
    readonly firstLevel: number;
    readonly lastLevel: number;
    readonly totalKeys: number;
    readonly activeKeys: number;
    readonly updates: number;
    readonly keyType: any | null;
    readonly valueType: any | null;
    constructor(ptr: number, contract: string | null, path: string | null, tags: string[] | null, active: boolean, firstLevel: number, lastLevel: number, totalKeys: number, activeKeys: number, updates: number, keyType: any | null, valueType: any | null);
    static fromAPI(data: any): BigMap;
    static get(parameters: GetBigMapParameters, domain?: string): Promise<BigMap[]>;
    static byID(id: number, micheline?: number, domain?: string): Promise<BigMap>;
    static byContract(address: string, parameters: GetBigMapByContractParameters | null, domain?: string): Promise<BigMap[]>;
    static byName(address: string, name: string, micheline?: number, domain?: string): Promise<BigMap>;
}
declare class BigMapType {
    readonly prim: number;
    readonly args: object[] | null;
    readonly annots: object[] | null;
    constructor(prim: number, args: object[] | null, annots: object[] | null);
    static fromAPI(data: any): BigMapType;
    static get(id: number, domain?: string): Promise<BigMapType>;
}
declare class BigMapUpdate {
    id: number;
    level: number;
    timestamp: Date;
    bigmap: number;
    contract: any;
    path: string;
    action: string;
    content: any;
    constructor(id: number, level: number, timestamp: Date, bigmap: number, contract: any, path: string, action: string, content: any);
    static fromAPI(data: any): BigMapUpdate;
    static get(parameters: GetBigMapUpdatesParameters | null, domain?: string): Promise<BigMapUpdate[]>;
}
declare class BigMapKey {
    id: number;
    active: boolean;
    hash: string | null;
    key: any | null;
    value: any | null;
    firstLevel: number;
    lastLevel: number;
    updates: number;
    constructor(id: number, active: boolean, hash: string | null, key: any | null, value: any | null, firstLevel: number, lastLevel: number, updates: number);
    static fromAPI(data: any): BigMapKey;
    static byBigMap(bigMapId: string, parameters: any | null, domain?: string): Promise<BigMapKey[]>;
    static byKey(bigMapId: string, key: number, domain?: string): Promise<BigMapKey>;
}
