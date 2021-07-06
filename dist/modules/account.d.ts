/// <reference path="types.d.ts" />
interface GetAccountParameters extends PaginationParameters, Sortable {
    accountType?: AccountTypeParameter;
    contractKind?: ContractKindParameter;
    delegate?: string;
    balance?: number;
    staked?: boolean;
    lastActivity?: Date;
    select?: string[];
}
declare class AccountMetadata {
    readonly kind: ContractKindParameter | null;
    readonly alias: string | null;
    readonly address: string | null;
    readonly balance: number;
    readonly delegate: any;
    readonly creationLevel: number | null;
    readonly creationTime: Date | null;
    constructor(kind: ContractKindParameter | null, alias: string | null, address: string | null, balance: number, delegate: any, creationLevel: number | null, creationTime: Date | null);
    static fromAPI(data: any): AccountMetadata;
}
interface GetBalanceHistoryParameters extends Sortable {
    step?: number;
    select?: string[];
}
interface GetBalanceReportParameters extends PaginationParameters {
    from?: Date;
    to?: Date;
    currency?: string;
    historical?: boolean;
    delimiter?: 'comma' | 'semicolon';
    separator?: 'comma' | 'point';
    quote?: string;
}
declare class Balance {
    readonly level: number;
    readonly timestamp: Date;
    readonly quote: BalanceShort | null;
    readonly balance: number;
    constructor(balance: number, level: number, quote: BalanceShort | null, timestamp: Date);
    static fromAPI(data: any): Balance;
    static history(address: string, parameters: GetBalanceHistoryParameters | null, domain?: string): Promise<Balance[]>;
    static byLevel(address: string, level: number, domain?: string): Promise<number>;
    static byDate(address: string, date: Date, domain?: string): Promise<number>;
    static report(address: string, options: GetBalanceReportParameters | null, domain?: string): Promise<string>;
}
interface CountParameters {
    type?: AccountTypeParameter;
    kind?: ContractKindParameter;
    balance?: number;
    staked?: boolean;
}
declare class AccountBase {
    readonly type: AccountTypeParameter | null;
    readonly alias: string | null;
    readonly address: string | null;
    readonly publicKey: string | null;
    readonly revealed: boolean;
    readonly balance: number;
    readonly counter: number;
    readonly delegationLevel: number | null;
    readonly delegationTime: Date | null;
    readonly numContracts: number | null;
    readonly numActivations: number | null;
    readonly numDelegations: number | null;
    readonly numOriginations: number | null;
    readonly numTransactions: number | null;
    readonly numReveals: number | null;
    readonly numMigrations: number | null;
    readonly firstActivity: number | null;
    readonly firstActivityTime: Date | null;
    readonly lastActivity: number | null;
    readonly lastActivityTime: Date | null;
    readonly contracts: Contract[] | null;
    readonly operations: Operation[] | null;
    readonly metadata: any | null;
    constructor(type: AccountTypeParameter | null, alias: string | null, address: string | null, publicKey: string | null, revealed: boolean, balance: number, counter: number, delegationLevel: number | null, delegationTime: Date | null, numContracts: number | null, numActivations: number | null, numDelegations: number | null, numOriginations: number | null, numTransactions: number | null, numReveals: number | null, numMigrations: number | null, firstActivity: number | null, firstActivityTime: Date | null, lastActivity: number | null, lastActivityTime: Date | null, contracts: Contract[] | null, operations: Operation[] | null, metadata: any | null);
    toString(): string | null;
    static fromAPI(data: any): AccountBase;
}
declare class Account extends AccountBase {
    constructor(type: AccountTypeParameter | null, alias: string | null, address: string | null, publicKey: string | null, revealed: boolean, balance: number, counter: number, delegationLevel: number | null, delegationTime: Date | null, numContracts: number | null, numActivations: number | null, numDelegations: number | null, numOriginations: number | null, numTransactions: number | null, numReveals: number | null, numMigrations: number | null, firstActivity: number | null, firstActivityTime: Date | null, lastActivity: number | null, lastActivityTime: Date | null, contracts: Contract[] | null, operations: Operation[] | null, metadata: any | null);
    static fromAPI(data: any): Account;
    static get(options: GetAccountParameters, domain?: string): Promise<Account[]>;
    static count(parameters: CountParameters | null, domain?: string): Promise<number>;
    static byAddress(address: string, metadata?: boolean, domain?: string): Promise<Account>;
    static getMetadata(address: string, domain?: string): Promise<any>;
    static suggestions(query: string, domain?: string): Promise<any>;
}
