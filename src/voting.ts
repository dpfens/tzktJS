/// <reference path="types.ts"/>

interface GetProposalParameters extends PaginationParameters, Sortable {
  epoch?: number;
  select?: string[];
}

/**
 * Proposals are potential changes to the {@link https://tezos.com/ | Tezos blockchain }.  For more information see the {@link https://api.tzkt.io/#tag/Voting | Voting API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 */
class Proposal {
  hash: string | null;
  initiator: string | null;
  firstPeriod: number;
  lastPeriod: number;
  epoch: number;
  upvotes: number;
  rolls: number;
  status: string | null;
  metadata: any | null;

  /**
  * @internal
  */
  constructor(hash: string | null, initiator: string | null, firstPeriod: number, lastPeriod: number, epoch: number, upvotes: number, rolls: number,  status: string | null, metadata: any | null) {
    this.hash = hash;
    this.initiator = initiator;
    this.firstPeriod = firstPeriod;
    this.lastPeriod = lastPeriod;
    this.epoch = epoch;
    this.upvotes = upvotes;
    this.rolls = rolls;
    this.status = status;
    this.metadata = metadata;
  }

  /**
  * Suggests known proposals by part of alias. This endpoint is useful for autocomplete.
  * @public
  * @returns proposal suggestions.
  * @see {@link https://api.tzkt.io/#operation/Suggest_GetProposals| Suggest proposals }
  *
  * @example Fetch Proposal Suggestions
  * ```typescript
  * let query: string = 'Gran'
  let suggestions: any[] = await Proposal.suggestions(query);
  * ```
  *
  */
  static async suggestions(query: string, domain: string = 'https://api.tzkt.io'): Promise<any[]> {
    let url: string = `${domain}/v1/suggest/proposals/${query}`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Proposal {
    let hash = data.hash,
    initiator = data.initiator,
    firstPeriod = data.firstPeriod,
    lastPeriod = data.lastPeriod,
    epoch = data.epoch,
    upvotes = data.upvotes,
    rolls = data.rolls,
    status = data.status,
    metadata = data.metadata;
    return new Proposal(hash, initiator, firstPeriod, lastPeriod, epoch, upvotes, rolls, status, metadata);
  }

  /**
  * Fetches proposals from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of Proposals.
  * @see {@link https://api.tzkt.io/#operation/Voting_GetProposals | get proposals }.
  *
  * @example Fetch Proposals
  * # Fetch list of Proposals
  * ```typescript
  * let epoch: number = 3;
  * let parameters: GetProtocolParameters = {'epoch.lt': epoch};
  * let proposals: Proposal[] = await Proposal.get(parameters);
  * ```
  *
  */
  static async get(parameters: GetProposalParameters, domain: string = 'https://api.tzkt.io'): Promise<Proposal[]> {
    let url: URL = new URL(`${domain}/v1/voting/proposals`);
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
    var output: Proposal[] = [];
    for (var i = 0; i < data.length; i++) {
      var proposal: Proposal = Proposal.fromAPI(data[i]);
      output.push(proposal);
    };
    return output;
  }

  /**
  * Fetches total number of proposals from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of protocol proposals.
  * @see {@link https://api.tzkt.io/#operation/Voting_GetProposalsCount | get proposals count }.
  *
  * @example Fetch Proposal Count
  * ```typescript
  * let proposalCount: number = await Proposal.count();
  * ```
  *
  */
  static async count(domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: URL = new URL(`${domain}/v1/voting/proposals/count`);
    let response: Response = await fetch(<any>url, {
      method: 'GET',
    });
    let data = await response.text();
    return parseInt(data);
  }

  /**
  * Fetches a Proposal by the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a protocol proposal with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Voting_GetProposalsCount | get proposals count }.
  *
  * @example Fetch Proposal by Hash
  * ```typescript
  * let hash: string = 'Pt24m4xiPbLDhVgVfABUjirbmda3yohdN82Sp9FeuAXJ4eV9otd';
  * let proposal: Proposal = await Proposal.byHash(hash);
  * ```
  *
  */
  static async byHash(hash: string, domain: string = 'https://api.tzkt.io'): Promise<Proposal> {
    let url: string = `${domain}/v1/voting/proposals/${hash}`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Proposal.fromAPI(data);
  }
}

interface GetVotingPeriodParameters extends PaginationParameters, Sortable {
  select?: string[];
}

/**
 * VotingPeriod are segments when a Proposal can be voted for application to the {@link https://tezos.com/ | Tezos blockchain }.  For more information see the {@link https://api.tzkt.io/#tag/Voting | Voting API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 *
 */
class VotingPeriod {
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

  /**
  * @internal
  */
  constructor(index: number, epoch: number, firstLevel: number, startTime: Date, lastLevel: number, endTime: Date, kind: string | null, status: string | null, totalBakers: number | null, totalRolls: number | null, upvotesQuorum: number | null, proposalsCount: number | null, topUpvotes: number | null, topRolls: number | null, ballotQuorum: number | null, supermajority: number | null, yayBallots: number | null, yayRolls: number | null, nayBallots: number | null, nayRolls: number | null, passBallots: number | null, passRolls: number | null) {
    this.index = index;
    this.epoch = epoch;
    this.firstLevel = firstLevel;
    this.startTime = startTime;
    this.lastLevel = lastLevel;
    this.endTime = endTime;
    this.kind = kind;
    this.status = status;
    this.totalBakers = totalBakers;
    this.totalRolls = totalRolls;
    this.upvotesQuorum = upvotesQuorum;
    this.proposalsCount = proposalsCount;
    this.topUpvotes = topUpvotes;
    this.topRolls = topRolls;
    this.ballotQuorum = ballotQuorum;
    this.supermajority = supermajority;
    this.yayBallots = yayBallots;
    this.yayRolls = yayRolls;
    this.nayBallots = nayBallots;
    this.nayRolls = nayRolls;
    this.passBallots = passBallots;
    this.passRolls = passRolls;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): VotingPeriod {
    let index = data.index,
    epoch = data.epoch,
    firstLevel = data.firstLevel,
    startTime = data.startTime,
    lastLevel = data.lastLevel,
    endTime = data.endTime,
    kind = data.kind,
    status = data.status,
    totalBakers = data.totalBakers,
    totalRolls = data.totalRolls,
    upvotesQuorum = data.upvotesQuorum,
    proposalsCount = data.proposalsCount,
    topUpvotes = data.topUpvotes,
    topRolls = data.topRolls,
    ballotQuorum = data.ballotQuorum,
    supermajority = data.supermajority,
    yayBallots = data.yayBallots,
    yayRolls = data.yayRolls,
    nayBallots = data.nayBallots,
    nayRolls = data.nayRolls,
    passBallots = data.passBallots,
    passRolls = data.passRolls;
    if(startTime) {
      startTime = new Date(startTime);
    }
    if(endTime) {
      endTime = new Date(endTime);
    }
    return new VotingPeriod(index, epoch, firstLevel, startTime, lastLevel, endTime, kind, status, totalBakers, totalRolls, upvotesQuorum, proposalsCount, topUpvotes, topRolls, ballotQuorum, supermajority, yayBallots, yayRolls, nayBallots, nayRolls, passBallots, passRolls);
  }

  /**
  * Fetches a list of voting periods from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of voting periods.
  * @see {@link https://api.tzkt.io/#operation/Voting_GetPeriods | get voting periods }.
  *
  * @example Fetch Voting Periods
  * ```typescript
  * let periods: VotingPeriod[] = await VotingPeriod.get();
  * ```
  *
  */
  static async get(parameters: GetVotingPeriodParameters, domain: string = 'https://api.tzkt.io'): Promise<VotingPeriod[]> {
    let url: URL = new URL(`${domain}/v1/voting/periods`);
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
    var output: VotingPeriod[] = [];
    for (var i = 0; i < data.length; i++) {
      var period: VotingPeriod = VotingPeriod.fromAPI(data[i]);
      output.push(period);
    };
    return output;
  }

  /**
  * Fetches a voting period at the specified index from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a voting period at the specified index.
  * @see {@link https://api.tzkt.io/#operation/Voting_GetPeriod | get voting period by index }.
  *
  * @example Fetch Voting Periods by Index
  * ```typescript
  * let index: number = 28;
  * let period: VotingPeriod = await VotingPeriod.byIndex(index);
  * ```
  *
  */
  static async byIndex(index: number, domain: string = 'https://api.tzkt.io'): Promise<VotingPeriod> {
    let url: string = `${domain}/v1/voting/periods/${index}`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return VotingPeriod.fromAPI(data);
  }

  /**
  * Fetches the current voting period from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the current voting period
  * @see {@link https://api.tzkt.io/#operation/Voting_GetCurrentPeriod | get current voting period }.
  *
  * @example Fetch Current Voting Period
  * ```typescript
  * let currentPeriod: VotingPeriod = await VotingPeriod.current();
  * ```
  *
  */
  static async current(domain: string = 'https://api.tzkt.io'): Promise<VotingPeriod> {
    let url: string = `${domain}/v1/voting/periods/current`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return VotingPeriod.fromAPI(data);
  }
}


interface GetVotingEpochParameters extends PaginationParameters, Sortable {}

/**
 * VotingEpoch for fetching VotingPeriod.  For more information see the {@link https://api.tzkt.io/#tag/Voting | Voting API documentation } on {@link https://tzkt.io/ | tzKT }.
 */
class VotingEpoch {
  index: number;
  firstLevel: number;
  startTime: Date;
  lastLevel: number;
  endTime: Date;
  status: string | null;
  periods: VotingPeriod[] | null;
  proposals: Proposal[] | null;

  /**
  * @internal
  */
  constructor(index: number, firstLevel: number, startTime: Date, lastLevel: number, endTime: Date, status: string | null, periods: VotingPeriod[] | null, proposals: Proposal[] | null) {
    this.index = index;
    this.firstLevel = firstLevel;
    this.startTime = startTime;
    this.lastLevel = lastLevel;
    this.endTime = endTime;
    this.status = status;
    this.periods = periods;
    this.proposals = proposals;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): VotingEpoch {
    let index = data.index,
      firstLevel = data.firstLevel,
      startTime = data.startTime,
      lastLevel = data.lastLevel,
      endTime = data.endTime,
      status = data.status,
      periods = data.periods,
      proposals = data.proposals;
    if(startTime) {
      startTime = new Date(startTime);
    }
    if(endTime) {
      endTime = new Date(endTime);
    }
    if (periods) {
      for (var i = 0; i < periods.length; i++) {
        periods[i] = VotingPeriod.fromAPI(periods[i]);
      }
    }
    if (proposals) {
      for (var i = 0; i < proposals.length; i++) {
        proposals[i] = Proposal.fromAPI(proposals[i]);
      }
    }
    return new VotingEpoch(index, firstLevel, startTime, lastLevel, endTime, status, periods, proposals);
  }

  /**
  * Fetches a list of voting epochs aligned with blocks from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of voting epochs.
  * @see {@link https://api.tzkt.io/#operation/Voting_GetEpochs | get voting epochs }.
  *
  * @example Fetch Voting Epochs
  * ```typescript
  * let epochs: VotingEpoch[] = await VotingEpoch.get();
  * ```
  *
  */
  static async get(parameters: GetVotingPeriodParameters, domain: string = 'https://api.tzkt.io'): Promise<VotingEpoch[]> {
    let url: URL = new URL(`${domain}/v1/voting/epochs`);
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
    var output: VotingEpoch[] = [];
    for (var i = 0; i < data.length; i++) {
      var epoch: VotingEpoch = VotingEpoch.fromAPI(data[i]);
      output.push(epoch);
    };
    return output;
  }

  /**
  * Fetches a voting epoch at a specified index from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a voting epoch at the specified index.
  * @see {@link https://api.tzkt.io/#operation/Voting_GetEpoch | get voting epoch by index }.
  *
  * @example Fetch Voting Epoch by Index
  * ```typescript
  * let index: number = 27;
  * let epoch: VotingEpoch = await VotingEpoch.byIndex(index);
  * ```
  *
  */
  static async byIndex(index: number, domain: string = 'https://api.tzkt.io'): Promise<VotingEpoch> {
    let url: string = `${domain}/v1/voting/epochs/${index}`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return VotingEpoch.fromAPI(data);
  }

  /**
  * Fetches the current voting epoch from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the current voting epoch
  * @see {@link https://api.tzkt.io/#operation/Voting_GetCurrentEpoch | get current voting epoch }.
  *
  * @example Fetch current Voting Epoch
  * ```typescript
  * let currentEpoch: VotingEpoch = await VotingEpoch.current();
  * ```
  *
  */
  static async current(domain: string = 'https://api.tzkt.io'): Promise<VotingEpoch> {
    let url: string = `${domain}/v1/voting/epochs/current`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return VotingEpoch.fromAPI(data);
  }

  /**
  * Fetches the latest voting from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the latest voting.
  * @see {@link https://api.tzkt.io/#operation/Voting_GetLatestVoting | get latest voting }.
  *
  * @example Fetch latest voting
  * ```typescript
  * let latestVoting: any = await VotingEpoch.latest();
  * ```
  *
  */
  static async latest(domain: string = 'https://api.tzkt.io'): Promise<VotingEpoch> {
    let url: string = `${domain}/v1/voting/epochs/latest_voting`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return VotingEpoch.fromAPI(data);
  }
}

interface GetPeriodVoterParameters extends PaginationParameters, Sortable {
  status?: VotingStatus;
}

/**
 * Period Voters are accounts that voted during a VotingEpoch on the {@link https://tezos.com/ | Tezos blockchain }.  For more information see the {@link https://api.tzkt.io/#tag/Voting | Voting API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 */
class PeriodVoter {
  delegate: any;
  rolls: number;
  status: string | null;

  /**
  * @internal
  */
  constructor(delegate: any, rolls: number, status: string | null) {
    this.delegate = delegate;
    this.rolls = rolls;
    this.status = status;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): PeriodVoter {
    let delegate = data.delegate,
        rolls = data.rolls,
        status = data.status;
    return new PeriodVoter(delegate, rolls, status);
  }

  /**
  * Fetches voters from the voting period at the specified index from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns voters from the voting period at the specified index.
  * @see {@link https://api.tzkt.io/#operation/Voting_GetPeriodVotersAll | get period voters }.
  *
  * @example Fetch PeriodVoters in a given Voting Period
  * ```typescript
  * let votingPeriodIndex: number = 33;
  * let voters: PeriodVoter[] = await PeriodVoter.get(votingPeriodIndex);
  * ```
  *
  */
  static async get(index: number, parameters: GetPeriodVoterParameters | null, domain: string = 'https://api.tzkt.io'): Promise<PeriodVoter[]> {
    let url: URL = new URL(`${domain}/v1/voting/periods/${index}/voters`);
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
    var output: PeriodVoter[] = [];
    for (var i = 0; i < data.length; i++) {
      var voter: PeriodVoter = PeriodVoter.fromAPI(data[i]);
      output.push(voter);
    };
    return output;
  }

  /**
  * Fetches a voter with the specified address from the voting period at the specified index from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a voter with the specified address from the voting period at the specified index
  * @see {@link https://api.tzkt.io/#operation/Voting_GetPeriodVoter | get period voter }.
  *
  * @example Fetch PeriodVoters in a given Voting Period
  * ```typescript
  * let votingPeriodIndex: number = 33;
  * let bakerAddress: string = 'tz1c8TSSGtVtg7ANrNVY7G4KnLn7iKdRnUVk';
  * let voter: PeriodVoter = await PeriodVoter.byAddress(votingPeriodIndex, bakerAddress);
  * ```
  *
  */
  static async byAddress(index: number, address: string, domain: string = 'https://api.tzkt.io'): Promise<PeriodVoter> {
    let url: string = `${domain}/v1/voting/periods/${index}/voters/${address}`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return PeriodVoter.fromAPI(data);
  }

  /**
  * Fetches voters from the current period from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns voters from the current period.
  * @see {@link https://api.tzkt.io/#operation/Voting_GetPeriodVoters | get current period voters }.
  *
  * @example Fetch PeriodVoters in the Current Voting Period
  * ```typescript
  * let parameters: GetPeriodVoterParameters = {'status': 'none'};
  * let voter: PeriodVoter = await PeriodVoter.current(parameters);
  * ```
  *
  */
  static async current(parameters: GetPeriodVoterParameters | null, domain: string = 'https://api.tzkt.io'): Promise<PeriodVoter[]> {
    let url: URL = new URL(`${domain}/v1/voting/periods/current/voters`);
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
    var output: PeriodVoter[] = [];
    for (var i = 0; i < data.length; i++) {
      var voter: PeriodVoter = PeriodVoter.fromAPI(data[i]);
      output.push(voter);
    };
    return output;
  }

  /**
  * Fetches a voter with the specified address from the current period from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a voter with the specified address from the current period.
  * @see {@link https://api.tzkt.io/#operation/Voting_GetPeriodVoter2 | get current period voter }.
  *
  * @example Fetch a Specific Voter in the current Voting Period
  * ```typescript
  * let bakerAddress: string = 'tz1c8TSSGtVtg7ANrNVY7G4KnLn7iKdRnUVk';
  * let voter: PeriodVoter = await PeriodVoter.currentByAddress(bakerAddress);
  * ```
  *
  */
  static async currentByAddress(address: string, domain: string = 'https://api.tzkt.io'): Promise<PeriodVoter> {
    let url: string = `${domain}/v1/voting/periods/current/voters/${address}`;
    let response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return PeriodVoter.fromAPI(data);
  }
}
