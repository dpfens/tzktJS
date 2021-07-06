/// <reference path="types.d.ts" />
interface GetProposalParameters extends PaginationParameters, Sortable {
    epoch?: number;
    select?: string[];
}
declare class Proposal {
    hash: string | null;
    initiator: string | null;
    firstPeriod: number;
    lastPeriod: number;
    epoch: number;
    upvotes: number;
    rolls: number;
    status: string | null;
    metadata: any | null;
    constructor(hash: string | null, initiator: string | null, firstPeriod: number, lastPeriod: number, epoch: number, upvotes: number, rolls: number, status: string | null, metadata: any | null);
    static suggestions(query: string, domain?: string): Promise<any[]>;
    static fromAPI(data: any): Proposal;
    static get(parameters: GetProposalParameters, domain?: string): Promise<Proposal[]>;
    static count(domain?: string): Promise<number>;
    static byHash(hash: string, domain?: string): Promise<Proposal>;
}
interface GetVotingPeriodParameters extends PaginationParameters, Sortable {
    select?: string[];
}
declare class VotingPeriod {
    index: number;
    epoch: number;
    firstLevel: number;
    startTime: Date;
    lastLevel: number;
    endTime: Date;
    kind: string | null;
    status: string | null;
    totalBakers: number | null;
    totalRolls: number | null;
    upvotesQuorum: number | null;
    proposalsCount: number | null;
    topUpvotes: number | null;
    topRolls: number | null;
    ballotQuorum: number | null;
    supermajority: number | null;
    yayBallots: number | null;
    yayRolls: number | null;
    nayBallots: number | null;
    nayRolls: number | null;
    passBallots: number | null;
    passRolls: number | null;
    constructor(index: number, epoch: number, firstLevel: number, startTime: Date, lastLevel: number, endTime: Date, kind: string | null, status: string | null, totalBakers: number | null, totalRolls: number | null, upvotesQuorum: number | null, proposalsCount: number | null, topUpvotes: number | null, topRolls: number | null, ballotQuorum: number | null, supermajority: number | null, yayBallots: number | null, yayRolls: number | null, nayBallots: number | null, nayRolls: number | null, passBallots: number | null, passRolls: number | null);
    static fromAPI(data: any): VotingPeriod;
    static get(parameters: GetVotingPeriodParameters, domain?: string): Promise<VotingPeriod[]>;
    static byIndex(index: number, domain?: string): Promise<VotingPeriod>;
    static current(domain?: string): Promise<VotingPeriod>;
}
interface GetVotingEpochParameters extends PaginationParameters, Sortable {
}
declare class VotingEpoch {
    index: number;
    firstLevel: number;
    startTime: Date;
    lastLevel: number;
    endTime: Date;
    status: string | null;
    periods: VotingPeriod[] | null;
    proposals: Proposal[] | null;
    constructor(index: number, firstLevel: number, startTime: Date, lastLevel: number, endTime: Date, status: string | null, periods: VotingPeriod[] | null, proposals: Proposal[] | null);
    static fromAPI(data: any): VotingEpoch;
    static get(parameters: GetVotingPeriodParameters, domain?: string): Promise<VotingEpoch[]>;
    static byIndex(index: number, domain?: string): Promise<VotingEpoch>;
    static current(domain?: string): Promise<VotingEpoch>;
    static latest(domain?: string): Promise<VotingEpoch>;
}
interface GetPeriodVoterParameters extends PaginationParameters, Sortable {
    status?: VotingStatus;
}
declare class PeriodVoter {
    delegate: any;
    rolls: number;
    status: string | null;
    constructor(delegate: any, rolls: number, status: string | null);
    static fromAPI(data: any): PeriodVoter;
    static get(index: number, parameters: GetPeriodVoterParameters | null, domain?: string): Promise<PeriodVoter[]>;
    static byAddress(index: number, address: string, domain?: string): Promise<PeriodVoter>;
    static current(parameters: GetPeriodVoterParameters | null, domain?: string): Promise<PeriodVoter[]>;
    static currentByAddress(address: string, domain?: string): Promise<PeriodVoter>;
}
