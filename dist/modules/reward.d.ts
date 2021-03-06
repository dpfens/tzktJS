/// <reference path="types.d.ts" />
interface GetBakerCycleRewardsParameters extends PaginationParameters, Sortable {
    cycle?: number;
    select?: string[];
    quote?: string;
}
declare class Reward {
    cycle: number;
    stakingBalance: number;
    delegatedBalance: number;
    numDelegators: number;
    expectedBlocks: number;
    expectedEndorsements: number;
    futureBlocks: number;
    futureBlockRewards: number;
    futureBlockDeposits: number;
    ownBlocks: number;
    ownBlockRewards: number;
    extraBlocks: number;
    extraBlockRewards: number;
    missedOwnBlocks: number;
    missedOwnBlockRewards: number;
    missedExtraBlocks: number;
    missedExtraBlockRewards: number;
    uncoveredOwnblocks: number;
    uncoveredOwnBlockRewards: number;
    uncoveredExtraBlocks: number;
    uncoveredExtraBlockRewards: number;
    blockDeposits: number;
    futureEndorsements: number;
    futureEndorsementRewards: number;
    futureEndorsementDeposits: number;
    endorsements: number;
    endorsementRewards: number;
    missedEndorsements: number;
    missedEndorsementRewards: number;
    uncoveredEndorsements: number;
    uncoveredEndorsementRewards: number;
    endorsementDeposits: number;
    ownBlockFees: number;
    extraBlockFees: number;
    missedOwnBlockFees: number;
    missedExtraBlockFees: number;
    uncoveredOwnBlockFees: number;
    uncoveredExtraBlockFees: number;
    doubleBakingRewards: number;
    doubleBakingLostDeposits: number;
    doubleBakingLostRewards: number;
    doubleBakingLostFees: number;
    doubleEndorsingRewards: number;
    doubleEndorsingLostDeposits: number;
    doubleEndorsingLostFees: number;
    revelationRewards: number;
    revelationLostFees: number;
    quote: BalanceShort | null;
    constructor(cycle: number, stakingBalance: number, delegatedBalance: number, numDelegators: number, expectedBlocks: number, expectedEndorsements: number, futureBlocks: number, futureBlockRewards: number, futureBlockDeposits: number, ownBlocks: number, ownBlockRewards: number, extraBlocks: number, extraBlockRewards: number, missedOwnBlocks: number, missedOwnBlockRewards: number, missedExtraBlocks: number, missedExtraBlockRewards: number, uncoveredOwnblocks: number, uncoveredOwnBlockRewards: number, uncoveredExtraBlocks: number, uncoveredExtraBlockRewards: number, blockDeposits: number, futureEndorsements: number, futureEndorsementRewards: number, futureEndorsementDeposits: number, endorsements: number, endorsementRewards: number, missedEndorsements: number, missedEndorsementRewards: number, uncoveredEndorsements: number, uncoveredEndorsementRewards: number, endorsementDeposits: number, ownBlockFees: number, extraBlockFees: number, missedOwnBlockFees: number, missedExtraBlockFees: number, uncoveredOwnBlockFees: number, uncoveredExtraBlockFees: number, doubleBakingRewards: number, doubleBakingLostDeposits: number, doubleBakingLostRewards: number, doubleBakingLostFees: number, doubleEndorsingRewards: number, doubleEndorsingLostDeposits: number, doubleEndorsingLostFees: number, revelationRewards: number, revelationLostFees: number, quote: BalanceShort | null);
    static fromAPI(data: any): Reward;
    static bakerCount(address: string, domain?: string): Promise<number>;
    static byBaker(address: string, parameters: GetBakerCycleRewardsParameters | null, domain?: string): Promise<Reward[]>;
    static byBakerCycle(address: string, cycle: number, quote: string | null, domain?: string): Promise<Reward>;
    static byDelegator(address: string, parameters: GetBakerCycleRewardsParameters | null, domain?: string): Promise<Reward[]>;
    static byDelegatorCycle(address: string, cycle: number, quote: string | null, domain?: string): Promise<Reward>;
    static bakerRewardSplits(address: string, cycle: number, parameters: PaginationParameters | null, domain?: string): Promise<Reward>;
    static rewardSplitsDelegator(baker: string, cycle: number, delegator: string, domain?: string): Promise<any>;
}
