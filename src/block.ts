/// <reference path="types.ts"/>

interface GetBlockParameters extends PaginationParameters, Sortable {
  baker?: string;
  level?: number;
  timestamp?: Date;
  priority?: number;
  select?: string;
  quote?: string;
}


/**
 * Blocks are sets of multiple Operations on the {@link https://tezos.com/ | Tezos blockchain }.  Block headers consists of generic information such as the block predecessor’s hash and the block’s timestamp.  For more information see the {@link https://api.tzkt.io/#tag/Blocks | Block API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 */
class Block {
  public readonly level: number;
  public readonly hash: string | null;
  public readonly timestamp: Date;
  public readonly proto: number;
  public readonly priority: number;
  public readonly validations: number;
  public readonly deposit: number;
  public readonly reward: number;
  public readonly fees: number;
  public readonly nonceRevealed: boolean;
  public readonly baker: any | null;
  public readonly software: any | null;
  public readonly endorsements: Operation[];
  public readonly proposals: Operation[];
  public readonly ballots: Operation[];
  public readonly activations: Operation[];
  public readonly doubleBaking: Operation[];
  public readonly doubleEndorsing: Operation[];
  public readonly nonceRevelations: Operation[];
  public readonly delegations: Operation[];
  public readonly originations: Operation[];
  public readonly transactions: Operation[];
  public readonly reveals: Operation[];
  public readonly quote: BalanceShort;

  /**
  * @internal
  */
  constructor(level: number, hash: string | null, timestamp: Date, proto: number, priority: number, validations: number, deposit: number, reward: number, fees: number, nonceRevealed: boolean, baker: any | null, software: any | null, endorsements: Operation[], proposals: Operation[], ballots: Operation[], activations: Operation[], doubleBaking: Operation[], doubleEndorsing: Operation[], nonceRevelations: Operation[], delegations: Operation[], originations: Operation[], transactions: Operation[], reveals: Operation[], quote: BalanceShort) {
    this.level = level;
    this.hash = hash;
    this.timestamp = timestamp;
    this.proto = proto;
    this.priority = priority;
    this.validations = validations;
    this.deposit = deposit;
    this.reward = reward;
    this.fees = fees;
    this.nonceRevealed = nonceRevealed;
    this.baker = baker;
    this.software = software;
    this.endorsements = endorsements;
    this.proposals = proposals;
    this.ballots = ballots;
    this.activations = activations;
    this.doubleBaking = doubleBaking;
    this.doubleEndorsing = doubleEndorsing;
    this.nonceRevelations = nonceRevelations;
    this.delegations = delegations;
    this.originations = originations;
    this.transactions = transactions;
    this.reveals = reveals;
    this.quote = quote;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Block {
    let level = data.level,
    hash = data.hash,
    timestamp = data.timestamp,
    proto = data.proto,
    priority = data.priority,
    validations = data.validations,
    deposit = data.deposit,
    reward = data.reward,
    fees = data.fees,
    nonceRevealed = data.nonceRevealed,
    baker = data.baker,
    software = data.software,
    endorsements = data.endorsements,
    proposals = data.proposals,
    ballots = data.ballots,
    activations = data.activations,
    doubleBaking = data.doubleBaking,
    doubleEndorsing = data.doubleEndorsing,
    nonceRevelations = data.nonceRevelations,
    delegations = data.delegations,
    originations = data.originations,
    transactions = data.transactions,
    reveals = data.reveals,
    quote = data.quote;
    if (timestamp) {
      timestamp = new Date(timestamp);
    }
    return new Block(level, hash, timestamp, proto, priority, validations, deposit, reward, fees, nonceRevealed, baker, software, endorsements, proposals, ballots, activations, doubleBaking, doubleEndorsing, nonceRevelations, delegations, originations, transactions, reveals, quote);
  }

  /**
  * Fetches blocks from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of blocks.
  * @see {@link https://api.tzkt.io/#operation/Blocks_Get | get blocks}.
  *
  * @example Fetch list of Blocks
  * # Usage
  * ```typescript
  * let blocks: Block[] = await Block.get({'level.gt': 1000000, 'level.lt': 1000050});
  * ```
  *
  */
  static async get(parameters: GetBlockParameters, domain: string = 'https://api.tzkt.io'): Promise<Block[]> {
    let url: URL = new URL(`${domain}/v1/blocks`);
    url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Block[] = [];
    for (var i = 0; i < data.length; i++) {
      var block: Block = Block.fromAPI(data[i]);
      output.push(block);
    };
    return output;
  }

  /**
  * Fetches a block with the specified hash from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a block with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Blocks_GetByHash| get block by hash }.
  *
  * @example Fetch Blocks by Hash
  * # Usage
  * ```typescript
  * let hash: string = 'BLtBd1Jbv4KttVdYjGeA22qDwUZk9AWKgP13MpGgkfE3FFHbumW'
  * let block: Block = await Block.byHash(hash);
  * ```
  *
  */
  static async byHash(hash: string, domain: string = 'https://api.tzkt.io'): Promise<Block> {
    let url: string = `${domain}/v1/blocks/${hash}`;
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Block.fromAPI(data);
  }

  /**
  * Fetches a block at the specified level from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a block with the specified hash.
  * @see {@link https://api.tzkt.io/#operation/Blocks_GetByLevel | get block by level }.
  *
  * @example Fetch Block by Level
  * # Usage
  * ```typescript
  * let level: number = 1000001;
  * let block: Block = await Block.byLevel(level);
  * ```
  *
  */
  static async byLevel(level: number, domain: string = 'https://api.tzkt.io'): Promise<Block> {
    let url: string = `${domain}/v1/blocks/${level}`;
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Block.fromAPI(data);
  }

  /**
  * Fetches the total number of blocks from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns the total number of blocks.
  * @see {@link https://api.tzkt.io/#operation/Blocks_GetCount | get blocks count }.
  *
  * @example Fetch Block count
  * # Usage
  * ```typescript
  * let bakerAddress: string = 'tz3S6BBeKgJGXxvLyZ1xzXzMPn11nnFtq5L9';
  * let level: number = 1000001;
  * let block: Block = await Block.count({'level.gt': level, 'baker': bakerAddress});
  * ```
  *
  */
  static async count(domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: string = `${domain}/v1/blocks/count`;
    let response: Response = await fetch(url, {method: 'GET'});
    let value: string = await response.text();
    return parseInt(value);
  }
}
