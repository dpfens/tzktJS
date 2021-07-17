/// <reference path="types.ts"/>

interface GetBakerCycleRewardsParameters extends PaginationParameters, Sortable {
  cycle?: number;
  select?: string[];
  quote?: string;
}

/**
* Rewards are the baking rewards given for securing blocks on the {@link https://tezos.com/ | Tezos blockchain }.  For more information see the {@link https://api.tzkt.io/#tag/Rewards | Rewards API documentation } on {@link https://tzkt.io/ | tzKT }.
*/
class Reward {
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

  /**
  * @internal
  */
  constructor(cycle: number, stakingBalance: number, delegatedBalance: number, numDelegators: number, expectedBlocks: number, expectedEndorsements: number, futureBlocks: number, futureBlockRewards: number, futureBlockDeposits: number, ownBlocks: number, ownBlockRewards: number, extraBlocks: number, extraBlockRewards: number, missedOwnBlocks: number, missedOwnBlockRewards: number, missedExtraBlocks: number, missedExtraBlockRewards: number, uncoveredOwnblocks: number, uncoveredOwnBlockRewards: number, uncoveredExtraBlocks: number, uncoveredExtraBlockRewards: number, blockDeposits: number, futureEndorsements: number, futureEndorsementRewards: number, futureEndorsementDeposits: number, endorsements: number, endorsementRewards: number, missedEndorsements: number, missedEndorsementRewards: number, uncoveredEndorsements: number, uncoveredEndorsementRewards: number, endorsementDeposits: number, ownBlockFees: number, extraBlockFees: number, missedOwnBlockFees: number, missedExtraBlockFees: number, uncoveredOwnBlockFees: number, uncoveredExtraBlockFees: number, doubleBakingRewards: number, doubleBakingLostDeposits: number, doubleBakingLostRewards: number, doubleBakingLostFees: number, doubleEndorsingRewards: number, doubleEndorsingLostDeposits: number, doubleEndorsingLostFees: number, revelationRewards: number, revelationLostFees: number, quote: BalanceShort | null) {
    this.cycle = cycle;
    this.stakingBalance = stakingBalance;
    this.delegatedBalance = delegatedBalance;
    this.numDelegators = numDelegators;
    this.expectedBlocks = expectedBlocks;
    this.expectedEndorsements = expectedEndorsements;
    this.futureBlocks = futureBlocks;
    this.futureBlockRewards = futureBlockRewards;
    this.futureBlockDeposits = futureBlockDeposits;
    this.ownBlocks = ownBlocks;
    this.ownBlockRewards = ownBlockRewards;
    this.extraBlocks = extraBlocks;
    this.extraBlockRewards = extraBlockRewards;
    this.missedOwnBlocks = missedOwnBlocks;
    this.missedOwnBlockRewards = missedOwnBlockRewards;
    this.missedExtraBlocks = missedExtraBlocks;
    this.missedExtraBlockRewards = missedExtraBlockRewards;
    this.uncoveredOwnblocks = uncoveredOwnblocks;
    this.uncoveredOwnBlockRewards = uncoveredOwnBlockRewards;
    this.uncoveredExtraBlocks = uncoveredExtraBlocks;
    this.uncoveredExtraBlockRewards = uncoveredExtraBlockRewards;
    this.blockDeposits = blockDeposits;
    this.futureEndorsements = futureEndorsements;
    this.futureEndorsementRewards = futureEndorsementRewards;
    this.futureEndorsementDeposits = futureEndorsementDeposits;
    this.endorsements = endorsements;
    this.endorsementRewards = endorsementRewards;
    this.missedEndorsements = missedEndorsements;
    this.missedEndorsementRewards = missedEndorsementRewards;
    this.uncoveredEndorsements = uncoveredEndorsements;
    this.uncoveredEndorsementRewards = uncoveredEndorsementRewards;
    this.endorsementDeposits = endorsementDeposits;
    this.ownBlockFees = ownBlockFees;
    this.extraBlockFees = extraBlockFees;
    this.missedOwnBlockFees = missedOwnBlockFees;
    this.missedExtraBlockFees = missedExtraBlockFees;
    this.uncoveredOwnBlockFees = uncoveredOwnBlockFees;
    this.uncoveredExtraBlockFees = uncoveredExtraBlockFees;
    this.doubleBakingRewards = doubleBakingRewards;
    this.doubleBakingLostDeposits = doubleBakingLostDeposits;
    this.doubleBakingLostRewards = doubleBakingLostRewards;
    this.doubleBakingLostFees = doubleBakingLostFees;
    this.doubleEndorsingRewards = doubleEndorsingRewards;
    this.doubleEndorsingLostDeposits = doubleEndorsingLostDeposits;
    this.doubleEndorsingLostFees = doubleEndorsingLostFees;
    this.revelationRewards = revelationRewards;
    this.revelationLostFees = revelationLostFees;
    this.quote = quote;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Reward {
    let cycle = data.cycle,
    stakingBalance = data.stakingBalance,
    delegatedBalance = data.delegatedBalance,
    numDelegators = data.numDelegators,
    expectedBlocks = data.expectedBlocks,
    expectedEndorsements = data.expectedEndorsements,
    futureBlocks = data.futureBlocks,
    futureBlockRewards = data.futureBlockRewards,
    futureBlockDeposits = data.futureBlockDeposits,
    ownBlocks = data.ownBlocks,
    ownBlockRewards = data.ownBlockRewards,
    extraBlocks = data.extraBlocks,
    extraBlockRewards = data.extraBlockRewards,
    missedOwnBlocks = data.missedOwnBlocks,
    missedOwnBlockRewards = data.missedOwnBlockRewards,
    missedExtraBlocks = data.missedExtraBlocks,
    missedExtraBlockRewards = data.missedExtraBlockRewards,
    uncoveredOwnblocks = data.uncoveredOwnblocks,
    uncoveredOwnBlockRewards = data.uncoveredOwnBlockRewards,
    uncoveredExtraBlocks = data.uncoveredExtraBlocks,
    uncoveredExtraBlockRewards = data.uncoveredExtraBlockRewards,
    blockDeposits = data.blockDeposits,
    futureEndorsements = data.futureEndorsements,
    futureEndorsementRewards = data.futureEndorsementRewards,
    futureEndorsementDeposits = data.futureEndorsementDeposits,
    endorsements = data.endorsements,
    endorsementRewards = data.endorsementRewards,
    missedEndorsements = data.missedEndorsements,
    missedEndorsementRewards = data.missedEndorsementRewards,
    uncoveredEndorsements = data.uncoveredEndorsements,
    uncoveredEndorsementRewards = data.uncoveredEndorsementRewards,
    endorsementDeposits = data.endorsementDeposits,
    ownBlockFees = data.ownBlockFees,
    extraBlockFees = data.extraBlockFees,
    missedOwnBlockFees = data.missedOwnBlockFees,
    missedExtraBlockFees = data.missedExtraBlockFees,
    uncoveredOwnBlockFees = data.uncoveredOwnBlockFees,
    uncoveredExtraBlockFees = data.uncoveredExtraBlockFees,
    doubleBakingRewards = data.doubleBakingRewards,
    doubleBakingLostDeposits = data.doubleBakingLostDeposits,
    doubleBakingLostRewards = data.doubleBakingLostRewards,
    doubleBakingLostFees = data.doubleBakingLostFees,
    doubleEndorsingRewards = data.doubleEndorsingRewards,
    doubleEndorsingLostDeposits = data.doubleEndorsingLostDeposits,
    doubleEndorsingLostFees = data.doubleEndorsingLostFees,
    revelationRewards = data.revelationRewards,
    revelationLostFees = data.revelationLostFees,
    quote = data.quote;
    return new Reward(cycle, stakingBalance, delegatedBalance, numDelegators, expectedBlocks, expectedEndorsements, futureBlocks, futureBlockRewards, futureBlockDeposits, ownBlocks, ownBlockRewards, extraBlocks, extraBlockRewards, missedOwnBlocks, missedOwnBlockRewards, missedExtraBlocks, missedExtraBlockRewards, uncoveredOwnblocks, uncoveredOwnBlockRewards, uncoveredExtraBlocks, uncoveredExtraBlockRewards, blockDeposits, futureEndorsements, futureEndorsementRewards, futureEndorsementDeposits, endorsements, endorsementRewards, missedEndorsements, missedEndorsementRewards, uncoveredEndorsements, uncoveredEndorsementRewards, endorsementDeposits, ownBlockFees, extraBlockFees, missedOwnBlockFees, missedExtraBlockFees, uncoveredOwnBlockFees, uncoveredExtraBlockFees, doubleBakingRewards, doubleBakingLostDeposits, doubleBakingLostRewards, doubleBakingLostFees, doubleEndorsingRewards, doubleEndorsingLostDeposits, doubleEndorsingLostFees, revelationRewards, revelationLostFees, quote);
  }

  /**
  * Fetches total number of cycles where the baker was active from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of cycles where the baker was active
  * @see {@link https://api.tzkt.io/#operation/Rewards_GetBakerRewardsCount | get quotes count }.
  *
  * @example Usage
  * ```typescript
  * let address: string = '';
  * let bakerCount: number = await Reward.bakerCount(address);
  * ```
  *
  */
  static async bakerCount(address: string, domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: string = `${domain}/v1/rewards/bakers/${address}/count`;
    let response: Response = await fetch(url, {
      method: 'GET',
    });
    let data = await response.text();
    return parseInt(data);
  }

  /**
  * Fetches baker rewards from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of baker rewards for every cycle, including future cycles.
  * @see {@link https://api.tzkt.io/#operation/Rewards_GetBakerRewards | get baker cycle rewards }.
  *
  * @example Usage
  * ```typescript
  * let address: string = 'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo';
  * let bakerRewards: Reward[] = await Reward.byBaker(address);
  * ```
  *
  */
  static async byBaker(address: string, parameters: GetBakerCycleRewardsParameters | null, domain: string = 'https://api.tzkt.io'): Promise<Reward[]> {
    let url: URL = new URL(`${domain}/v1/rewards/bakers/${address}`);
    if (parameters) {
      url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Reward[] = [];
    for (var i = 0; i < data.length; i++) {
      var reward: Reward = Reward.fromAPI(data[i]);
      output.push(reward);
    };
    return output;
  }

  /**
  * Fetches baker rewards by cycle from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns  baker cycle rewards for the specified cycle.
  * @see {@link https://api.tzkt.io/#operation/Rewards_GetBakerRewardsByCycle | get baker rewards by cycle }.
  *
  * @example Usage
  * ```typescript
  * let address: string = 'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo';
  * let cycle: number = 14;
  * let bakerRewards: Reward[] = await Reward.byBakerCycle(address, cycle);
  * ```
  *
  */
  static async byBakerCycle(address: string, cycle: number, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Reward> {
    let url: URL = new URL(`${domain}/v1/rewards/bakers/${address}/${cycle}`);
    if (quote) {
      url.search = new URLSearchParams({'quote': quote} as Record<string, string>).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Reward.fromAPI(data);
  }

  /**
  * Fetches delegator rewards from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of delegator rewards for every cycle, including future cycles.
  * @see {@link https://api.tzkt.io/#operation/Rewards_GetDelegatorRewards | get delegator cycle rewards }.
  *
  * @example Usage
  * ```typescript
  * let address: string = '';
  * let delegatorRewards: Reward[] = await Reward.byDelegator(address);
  * ```
  *
  */
  static async byDelegator(address: string, parameters: GetBakerCycleRewardsParameters | null, domain: string = 'https://api.tzkt.io'): Promise<Reward[]> {
    let url: URL = new URL(`${domain}/v1/rewards/delegators/${address}`);
    if (parameters) {
      url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Reward[] = [];
    for (var i = 0; i < data.length; i++) {
      var reward: Reward = Reward.fromAPI(data[i]);
      output.push(reward);
    };
    return output;
  }

  /**
  * Fetches delegator rewards by cycle from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns delegator cycle rewards for the specified cycle.
  * @see {@link https://api.tzkt.io/#operation/Rewards_GetDelegatorRewardsByCycle | get delegator rewards by cycle }.
  *
  * @example Usage
  * ```typescript
  * let address: string = '';
  * let cycle: number = 2;
  * let delegatorRewards: Reward[] = await Reward.byDelegatorCycle(address, cycle);
  * ```
  *
  */
  static async byDelegatorCycle(address: string, cycle: number, quote: string | null, domain: string = 'https://api.tzkt.io'): Promise<Reward> {
    let url: URL = new URL(`${domain}/v1/rewards/delegators/${address}/${cycle}`);
    if (quote) {
      url.search = new URLSearchParams({'quote': quote} as Record<string, string>).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Reward.fromAPI(data);
  }

  /**
  * Fetches baker rewards for the specified cycle from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns baker rewards for the specified cycle with all delegator balances at that cycle to allow rewards distribution in proportion to shares.
  * @see {@link https://api.tzkt.io/#operation/Rewards_GetRewardSplit | get reward splits }.
  *
  * @example Usage
  * ```typescript
  * let address: string = '';
  * let cycle: number = 2;
  * let bakerRewardSplit: Reward = await Reward.bakerRewardSplits(address, cycle);
  * ```
  *
  */
  static async bakerRewardSplits(address: string, cycle: number, parameters: PaginationParameters | null, domain: string = 'https://api.tzkt.io'): Promise<Reward> {
    let url: URL = new URL(`${domain}/v1/rewards/delegators/${address}/${cycle}`);
    if (parameters) {
      url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    }
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Reward.fromAPI(data);
  }

  /**
  * Fetches delegator from the reward split for the specified cycle from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns delegator from the reward split for the specified cycle.
  * @see {@link https://api.tzkt.io/#operation/Rewards_GetRewardSplitDelegator | get reward split delegator }.
  *
  * @example Usage
  * ```typescript
  * let bakerAddress: string = '';
  * let cycle: number = 2;
  * let delegatorAddress: string = '';
  * let delegatorRewardSplit: any = await Reward.rewardSplitsDelegator(bakerAddress, cycle, delegatorAddress);
  * ```
  *
  */
  static async rewardSplitsDelegator(baker: string, cycle: number, delegator: string, domain: string = 'https://api.tzkt.io'): Promise<any> {
    `https://api.tzkt.io/v1/rewards/split/{baker}/{cycle}/{delegator}`
    let url: string = `${domain}/v1/rewards/split/${baker}/${cycle}/${delegator}`;
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  }
}
