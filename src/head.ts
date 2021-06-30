/// <reference path="types.ts"/>

/**
 * Endpoints for fetching the indexer Head.  For more information see the {@link https://api.tzkt.io/#operation/Head_Get | Head API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 * Head represents the current state of the {@link https://tezos.com/ | Tezos blockchain }.
 */
class Head {
  public readonly cycle: number;
  public readonly level: number;
  public readonly hash: string | null;
  public readonly protocol: string | null;
  public readonly timestamp: Date;
  public readonly votingEpoch: number;
  public readonly votingPeriod: number;
  public readonly knownLevel: number;
  public readonly lastSync: Date;
  public readonly synced: boolean;
  public readonly quoteLevel: number;
  public readonly quoteBtc: number;
  public readonly quoteEur: number;
  public readonly quoteUsd: number;
  public readonly quoteCny: number;
  public readonly quoteJpy: number;
  public readonly quoteKrw: number;
  public readonly quoteEth: number;

  /**
  * @internal
  */
  constructor(cycle: number, level: number, hash: string | null, protocol: string | null, timestamp: Date, votingEpoch: number, votingPeriod: number, knownLevel: number, lastSync: Date, synced: boolean, quoteLevel: number, quoteBtc: number, quoteEur: number, quoteUsd: number, quoteCny: number, quoteJpy: number, quoteKrw: number, quoteEth: number) {
    this.cycle = cycle;
    this.level = level;
    this.hash = hash;
    this.protocol = protocol;
    this.timestamp = timestamp;
    this.votingEpoch = votingEpoch;
    this.votingPeriod = votingPeriod;
    this.knownLevel = knownLevel;
    this.lastSync = lastSync;
    this.synced = synced;
    this.quoteLevel = quoteLevel;
    this.quoteBtc = quoteBtc;
    this.quoteEur = quoteEur;
    this.quoteUsd = quoteUsd;
    this.quoteCny = quoteCny;
    this.quoteJpy = quoteJpy;
    this.quoteKrw = quoteKrw;
    this.quoteEth = quoteEth;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Head {
    let cycle = data.cycle,
    level = data.level,
    hash = data.hash,
    protocol = data.protocol,
    timestamp = data.timestamp,
    votingEpoch = data.votingEpoch,
    votingPeriod = data.votingPeriod,
    knownLevel = data.knownLevel,
    lastSync = data.lastSync,
    synced = data.synced,
    quoteLevel = data.quoteLevel,
    quoteBtc = data.quoteBtc,
    quoteEur = data.quoteEur,
    quoteUsd = data.quoteUsd,
    quoteCny = data.quoteCny,
    quoteJpy = data.quoteJpy,
    quoteKrw = data.quoteKrw,
    quoteEth = data.quoteEth;
    if (timestamp) {
      timestamp = new Date(timestamp);
    }
    if(lastSync) {
      lastSync = new Date(lastSync);
    }
    return new Head(cycle, level, hash, protocol, timestamp, votingEpoch, votingPeriod, knownLevel, lastSync, synced, quoteLevel, quoteBtc, quoteEur, quoteUsd, quoteCny, quoteJpy, quoteKrw, quoteEth);
  }

  /**
  * Fetches indexer head from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns indexer head and synchronization status.
  * @see {@link https://api.tzkt.io/#operation/Head_Get | get indexer head }.
  *
  * @example Fetch current Head
  * # Usage
  * ```typescript
  * let head: Head = await Head.get();
  * ```
  *
  */
  static async get(domain: string = 'https://api.tzkt.io'): Promise<Head> {
    let url: string = `${domain}/v1/head`;
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Head.fromAPI(data);
  }

}
