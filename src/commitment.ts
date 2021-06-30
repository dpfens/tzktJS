/// <reference path="types.ts"/>

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

/**
 * Endpoints for fetching Commitments. For more information see the {@link https://api.tzkt.io/#tag/Commitments | Commitment API documentation } on {@link https://tzkt.io/ | tzKT }.
 *
 */
class Commitment {
  address: string | null;
  balance: number;
  activated: boolean;
  activationLevel: number | null;
  activationTime: Date | null;
  activatedAccount: any | null;

  /**
  * @internal
  */
  constructor(address: string | null, balance: number, activated: boolean, activationLevel: number | null, activationTime: Date | null, activatedAccount: any | null) {
    this.address = address;
    this.balance = balance;
    this.activated = activated;
    this.activationLevel = activationLevel;
    this.activationTime = activationTime;
    this.activatedAccount = activatedAccount;
  }

  /**
  * @internal
  */
  static fromAPI(data: any): Commitment {
    let address = data.address,
    balance = data.balance,
    activated = data.activated,
    activationLevel = data.activationLevel,
    activationTime = data.activationTime,
    activatedAccount = data.activatedAccount;
    if (activationTime) {
      activationTime = new Date(activationTime);
    }
    return new Commitment(address, balance, activated, activationLevel, activationTime, activatedAccount);
  }

  /**
  * Fetches commitments from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a list of commitments.
  * @see {@link https://api.tzkt.io/#operation/Commitments_GetAll | get commitments }.
  *
  * @example Fetch Commitments
  * # Usage
  * ```typescript
  * let parameters: GetCommitmentParameters = {'activated': true, 'activationLevel.gt': 1500000};
  * let commitments: Commitment[] = await Commitment.get(parameters);
  * ```
  *
  */
  static async get(parameters: GetCommitmentParameters, domain: string = 'https://api.tzkt.io'): Promise<Commitment[]> {
    let url: URL = new URL(`${domain}/v1/commitments`);
    url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    var output: Commitment[] = [];
    for (var i = 0; i < data.length; i++) {
      var commitment: Commitment = Commitment.fromAPI(data[i]);
      output.push(commitment);
    };
    return output;
  }

  /**
  * Fetches a number of commitments from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a number of commitments.
  * @see {@link https://api.tzkt.io/#operation/Commitments_GetCount | get commitments count }.
  *
  * @example Fetch Commitment Count
  * # Usage
  * ```typescript
  * let parameters: GetCommitmentParameters = {'activated': true, 'balance.gt': 100000000};
  * let commitmentCount: number = await Commitment.count(parameters);
  * ```
  *
  */
  static async count(parameters?: GetCommitmentCountParameters, domain: string = 'https://api.tzkt.io'): Promise<number> {
    let url: URL = new URL(`${domain}/v1/commitments/count`);
    if (parameters) {
      url.search = new URLSearchParams(parameters as Record<string, string>).toString();
    }
    let response: Response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let value: string = await response.text();
    return parseInt(value);
  }

  /**
  * Fetches commitments from {@link https://tzkt.io/ | tzKT }.
  * @public
  *
  * @returns Returns a commitment with the specified blinded address.
  * @see {@link https://api.tzkt.io/#operation/Commitments_Get | get commitment by blinded address }.
  */
  static async byBlindedAddress(address: string, domain: string = 'https://api.tzkt.io'): Promise<Commitment> {
    let url: string = `${domain}/v1/commitments/${address}`;
    let response = await fetch(<any>url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return Commitment.fromAPI(data);
  }
}
