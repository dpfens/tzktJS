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
class EntryPoint {
    constructor(name, jsonParameters, michelineParameters, michelsonParameters, unused) {
        this.name = name;
        this.jsonParameters = jsonParameters;
        this.michelineParameters = michelineParameters;
        this.michelsonParameters = michelsonParameters;
        this.unused = unused;
    }
    static fromAPI(data) {
        let name = data.name;
        let jsonParameters = data.jsonParameters;
        let michelineParameters = data.michelineParameters;
        let michelsonParameters = data.michelsonParameters;
        let unused = data.unused;
        return new EntryPoint(name, jsonParameters, michelineParameters, michelsonParameters, unused);
    }
    byName(address, name, parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/contracts/${address}/entrypoints/${name}`);
            url.search = new URLSearchParams(parameters).toString();
            let response = yield fetch(url, {
                method: 'GET',
            });
            let data = yield response.text();
            return EntryPoint.fromAPI(data);
        });
    }
}
class Contract extends AccountBase {
    constructor(type, alias, address, publicKey, revealed, balance, counter, delegate, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata) {
        super(type, alias, address, publicKey, revealed, balance, counter, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata);
        this.delegate = delegate;
    }
    static fromAPI(data) {
        let type = data.type;
        let alias = data.alias;
        let address = data.address;
        let publicKey = data.publicKey;
        let revealed = data.revealed;
        let balance = data.balance;
        let counter = data.counter;
        let delegate = data.delegate;
        let delegationLevel = data.delegationLevel;
        let delegationTime = data.delegationTime;
        let numContracts = data.numContracts;
        let numActivations = data.numActivations;
        let numDelegations = data.numDelegations;
        let numOriginations = data.numOriginations;
        let numTransactions = data.numTransactions;
        let numReveals = data.numReveals;
        let numMigrations = data.numMigrations;
        let firstActivity = data.firstActivity;
        let firstActivityTime = data.firstActivityTime;
        let lastActivity = data.lastActivity;
        let lastActivityTime = data.lastActivityTime;
        let contracts = data.contracts;
        let operations = data.operations;
        let metadata = data.metadata;
        if (delegationTime) {
            delegationTime = new Date(delegationTime);
        }
        if (firstActivityTime) {
            firstActivityTime = new Date(firstActivityTime);
        }
        if (lastActivityTime) {
            lastActivityTime = new Date(lastActivityTime);
        }
        return new Contract(type, alias, address, publicKey, revealed, balance, counter, delegate, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata);
    }
    static count(kind, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/contracts/count`);
            url.search = new URLSearchParams({ kind: kind }).toString();
            let response = yield fetch(url, {
                method: 'GET',
            });
            let data = yield response.text();
            return parseInt(data);
        });
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/contracts`);
            if (parameters) {
                url.search = new URLSearchParams(parameters).toString();
            }
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            var output = [];
            for (var i = 0; i < data.length; i++) {
                var contract = Contract.fromAPI(data[i]);
                output.push(contract);
            }
            ;
            return output;
        });
    }
    static byAccount(address, parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/accounts/${address}/contracts`);
            if (parameters) {
                url.search = new URLSearchParams(parameters).toString();
            }
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            var output = [];
            for (var i = 0; i < data.length; i++) {
                var contract = Contract.fromAPI(data[i]);
                output.push(contract);
            }
            ;
            return output;
        });
    }
    static byAddress(address, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/contracts/${address}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Contract.fromAPI(data);
        });
    }
    static similar(address, parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/contracts/${address}/similar`);
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
                var contract = Contract.fromAPI(data[i]);
                output.push(contract);
            }
            ;
            return output;
        });
    }
    static code(address, format, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/contracts/${address}/code`);
            url.search = new URLSearchParams({ 'format': format.toString() }).toString();
            let response = yield fetch(url, {
                method: 'GET',
            });
            return yield response.text();
        });
    }
}
//# sourceMappingURL=contract.js.map