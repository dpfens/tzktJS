/// <reference path="types.d.ts" />
interface GetCommitmentParameters extends PaginationParameters, Sortable {
    activated?: boolean;
    activationLevel?: number;
    balance?: number;
    select?: string;
}
interface GetCommitmentCountParameters {
    activated?: boolean;
    balance?: number;
}
declare class Commitment {
    address: string | null;
    balance: number;
    activated: boolean;
    activationLevel: number | null;
    activationTime: Date | null;
    activatedAccount: any | null;
    constructor(address: string | null, balance: number, activated: boolean, activationLevel: number | null, activationTime: Date | null, activatedAccount: any | null);
    static fromAPI(data: any): Commitment;
    static get(parameters: GetCommitmentParameters, domain?: string): Promise<Commitment[]>;
    static count(parameters?: GetCommitmentCountParameters, domain?: string): Promise<number>;
    static byBlindedAddress(address: string, domain?: string): Promise<Commitment>;
}
