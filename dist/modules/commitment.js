"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Commitment {
    constructor(address, balance, activated, activationLevel, activationTime, activatedAccount) {
        this.address = address;
        this.balance = balance;
        this.activated = activated;
        this.activationLevel = activationLevel;
        this.activationTime = activationTime;
        this.activatedAccount = activatedAccount;
    }
    static fromAPI(data) {
        let address = data.address, balance = data.balance, activated = data.activated, activationLevel = data.activationLevel, activationTime = data.activationTime, activatedAccount = data.activatedAccount;
        if (activationTime) {
            activationTime = new Date(activationTime);
        }
        return new Commitment(address, balance, activated, activationLevel, activationTime, activatedAccount);
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/commitments`);
            url.search = new URLSearchParams(parameters).toString();
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            var output = [];
            for (var i = 0; i < data.length; i++) {
                var commitment = Commitment.fromAPI(data[i]);
                output.push(commitment);
            }
            ;
            return output;
        });
    }
    static count(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/commitments/count`);
            if (parameters) {
                url.search = new URLSearchParams(parameters).toString();
            }
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let value = yield response.text();
            return parseInt(value);
        });
    }
    static byBlindedAddress(address, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/commitments/${address}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Commitment.fromAPI(data);
        });
    }
}
//# sourceMappingURL=commitment.js.map