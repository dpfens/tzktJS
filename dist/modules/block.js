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
class Block {
    constructor(level, hash, timestamp, proto, priority, validations, deposit, reward, fees, nonceRevealed, baker, software, endorsements, proposals, ballots, activations, doubleBaking, doubleEndorsing, nonceRevelations, delegations, originations, transactions, reveals, quote) {
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
    static fromAPI(data) {
        let level = data.level, hash = data.hash, timestamp = data.timestamp, proto = data.proto, priority = data.priority, validations = data.validations, deposit = data.deposit, reward = data.reward, fees = data.fees, nonceRevealed = data.nonceRevealed, baker = data.baker, software = data.software, endorsements = data.endorsements, proposals = data.proposals, ballots = data.ballots, activations = data.activations, doubleBaking = data.doubleBaking, doubleEndorsing = data.doubleEndorsing, nonceRevelations = data.nonceRevelations, delegations = data.delegations, originations = data.originations, transactions = data.transactions, reveals = data.reveals, quote = data.quote;
        if (timestamp) {
            timestamp = new Date(timestamp);
        }
        return new Block(level, hash, timestamp, proto, priority, validations, deposit, reward, fees, nonceRevealed, baker, software, endorsements, proposals, ballots, activations, doubleBaking, doubleEndorsing, nonceRevelations, delegations, originations, transactions, reveals, quote);
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/blocks`);
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
                var block = Block.fromAPI(data[i]);
                output.push(block);
            }
            ;
            return output;
        });
    }
    static byHash(hash, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/blocks/${hash}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Block.fromAPI(data);
        });
    }
    static byLevel(level, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/blocks/${level}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Block.fromAPI(data);
        });
    }
    static count(domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/blocks/count`;
            let response = yield fetch(url, { method: 'GET' });
            let value = yield response.text();
            return parseInt(value);
        });
    }
}
//# sourceMappingURL=block.js.map