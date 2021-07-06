/// <reference path="types.d.ts" />
/// <reference path="account.d.ts" />
interface GetContractParameters extends PaginationParameters, Sortable {
    kind?: ContractKindParameter;
    creator?: string;
    manager?: string;
    delegate?: string;
    lastActivity?: number;
    typeHash?: number;
    codeHash?: number;
    incudeStorage?: boolean;
    select?: string[];
}
interface SimilarParameters extends PaginationParameters, Sortable {
    select?: string[];
    includeStorage?: boolean;
}
interface EntryPointByNameParameters {
    json: boolean | null;
    micheline: boolean | null;
    michelson: boolean | null;
}
declare class EntryPoint {
    readonly name: string;
    readonly jsonParameters: any;
    readonly michelineParameters: any;
    readonly michelsonParameters: string | null;
    readonly unused: boolean;
    constructor(name: string, jsonParameters: any, michelineParameters: any, michelsonParameters: string | null, unused: boolean);
    static fromAPI(data: any): EntryPoint;
    byName(address: string, name: string, parameters: EntryPointByNameParameters | null, domain?: string): Promise<EntryPoint>;
}
interface getRelatedToAddressParameters extends PaginationParameters, Sortable {
}
declare class Contract extends AccountBase {
    readonly delegate: number | null;
    constructor(type: AccountTypeParameter | null, alias: string | null, address: string | null, publicKey: string | null, revealed: boolean, balance: number, counter: number, delegate: number | null, delegationLevel: number | null, delegationTime: Date | null, numContracts: number | null, numActivations: number | null, numDelegations: number | null, numOriginations: number | null, numTransactions: number | null, numReveals: number | null, numMigrations: number | null, firstActivity: number | null, firstActivityTime: Date | null, lastActivity: number | null, lastActivityTime: Date | null, contracts: Contract[] | null, operations: Operation[] | null, metadata: any | null);
    static fromAPI(data: any): Contract;
    static count(kind: ContractKindParameter, domain?: string): Promise<number>;
    static get(parameters: GetContractParameters | null, domain?: string): Promise<Contract[]>;
    static byAccount(address: string, parameters: getRelatedToAddressParameters | null, domain?: string): Promise<Contract[]>;
    static byAddress(address: string, domain?: string): Promise<Contract>;
    static similar(address: string, parameters: SimilarParameters | null, domain?: string): Promise<Contract[]>;
    static code(address: string, format: number, domain?: string): Promise<string>;
}
