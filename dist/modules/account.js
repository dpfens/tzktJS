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
class AccountMetadata {
    constructor(kind, alias, address, balance, delegate, creationLevel, creationTime) {
        this.kind = kind;
        this.alias = alias;
        this.address = address;
        this.balance = balance;
        this.delegate = delegate;
        this.creationLevel = creationLevel;
        this.creationTime = creationTime;
    }
    static fromAPI(data) {
        let kind = data.kind;
        let alias = data.alias;
        let address = data.address;
        let balance = data.balance;
        let delegate = data.delegate;
        let creationLevel = data.creationLevel;
        let creationTime = data.creationTime;
        if (creationTime) {
            creationTime = new Date(creationTime);
        }
        return new AccountMetadata(kind, alias, address, balance, delegate, creationLevel, creationTime);
    }
}
class Balance {
    constructor(balance, level, quote, timestamp) {
        this.balance = balance;
        this.level = level;
        this.quote = quote;
        this.timestamp = timestamp;
    }
    static fromAPI(data) {
        let balance = data.balance;
        let level = data.level;
        let quote = data.quote || null;
        let timestamp = data.timestamp;
        if (timestamp) {
            timestamp = new Date(timestamp);
        }
        return new Balance(balance, level, quote, timestamp);
    }
    static history(address, parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/accounts/${address}/balance_history`);
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
            let output = [];
            for (var i = 0; i < data.length; i++) {
                var balance = Balance.fromAPI(data[i]);
                output.push(balance);
            }
            return output;
        });
    }
    static byLevel(address, level, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/accounts/${address}/balance_history/${level}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.text();
            return parseFloat(data);
        });
    }
    static byDate(address, date, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let dateString = date.toISOString(), url = `${domain}/v1/accounts/${address}/balance_history/${dateString}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.text();
            return parseFloat(data);
        });
    }
    static report(address, options, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/accounts/${address}/report`);
            if (options) {
                let parameters = JSON.parse(JSON.stringify(options));
                if (options.from) {
                    parameters.from = options.from.toISOString().split('T')[0];
                }
                if (options.to) {
                    parameters.to = options.to.toISOString().split('T')[0];
                }
                url.search = new URLSearchParams(parameters).toString();
            }
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/octet-stream'
                }
            }), blob = yield response.blob();
            return yield blob.text();
        });
    }
}
class AccountBase {
    constructor(type, alias, address, publicKey, revealed, balance, counter, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata) {
        this.type = type;
        this.alias = alias;
        this.address = address;
        this.publicKey = publicKey;
        this.revealed = revealed;
        this.balance = balance;
        this.counter = counter;
        this.delegationLevel = delegationLevel;
        this.delegationTime = delegationTime;
        this.numContracts = numContracts;
        this.numActivations = numActivations;
        this.numDelegations = numDelegations;
        this.numOriginations = numOriginations;
        this.numTransactions = numTransactions;
        this.numReveals = numReveals;
        this.numMigrations = numMigrations;
        this.firstActivity = firstActivity;
        this.firstActivityTime = firstActivityTime;
        this.lastActivity = lastActivity;
        this.lastActivityTime = lastActivityTime;
        this.contracts = contracts;
        this.operations = operations;
        this.metadata = metadata;
    }
    toString() {
        return this.address;
    }
    static fromAPI(data) {
        let type = data.type;
        let alias = data.alias;
        let address = data.address;
        let publicKey = data.publicKey;
        let revealed = data.revealed;
        let balance = data.balance;
        let counter = data.counter;
        let delegationLevel = data.delegationLevel;
        let delegationTime = data.delegationTime;
        if (delegationTime) {
            delegationTime = new Date(delegationTime);
        }
        let numContracts = data.numContracts;
        let numActivations = data.numActivations;
        let numDelegations = data.numDelegations;
        let numOriginations = data.numOriginations;
        let numTransactions = data.numTransactions;
        let numReveals = data.numReveals;
        let numMigrations = data.numMigrations;
        let firstActivity = data.firstActivity;
        let firstActivityTime = data.firstActivityTime;
        if (firstActivityTime) {
            firstActivityTime = new Date(firstActivityTime);
        }
        let lastActivity = data.lastActivity;
        let lastActivityTime = data.lastActivityTime;
        if (lastActivityTime) {
            lastActivityTime = new Date(lastActivityTime);
        }
        let contracts = data.contracts;
        let operations = data.operations;
        let metadata = data.metadata;
        let timestamp = data.timestamp;
        if (timestamp) {
            timestamp = new Date(timestamp);
        }
        return new AccountBase(type, alias, address, publicKey, revealed, balance, counter, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata);
    }
}
class Account extends AccountBase {
    constructor(type, alias, address, publicKey, revealed, balance, counter, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata) {
        super(type, alias, address, publicKey, revealed, balance, counter, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata);
    }
    static fromAPI(data) {
        let type = data.type;
        let alias = data.alias;
        let address = data.address;
        let publicKey = data.publicKey;
        let revealed = data.revealed;
        let balance = data.balance;
        let counter = data.counter;
        let delegationLevel = data.delegationLevel;
        let delegationTime = data.delegationTime;
        if (delegationTime) {
            delegationTime = new Date(delegationTime);
        }
        let numContracts = data.numContracts;
        let numActivations = data.numActivations;
        let numDelegations = data.numDelegations;
        let numOriginations = data.numOriginations;
        let numTransactions = data.numTransactions;
        let numReveals = data.numReveals;
        let numMigrations = data.numMigrations;
        let firstActivity = data.firstActivity;
        let firstActivityTime = data.firstActivityTime;
        if (firstActivityTime) {
            firstActivityTime = new Date(firstActivityTime);
        }
        let lastActivity = data.lastActivity;
        let lastActivityTime = data.lastActivityTime;
        if (lastActivityTime) {
            lastActivityTime = new Date(lastActivityTime);
        }
        let contracts = data.contracts;
        let operations = data.operations;
        let metadata = data.metadata;
        let timestamp = data.timestamp;
        if (timestamp) {
            timestamp = new Date(timestamp);
        }
        return new Account(type, alias, address, publicKey, revealed, balance, counter, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata);
    }
    static get(options, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/accounts`);
            if (options) {
                let parameters = JSON.parse(JSON.stringify(options));
                if (options.lastActivity) {
                    parameters.lastActivity = options.lastActivity.toISOString().split('T')[0];
                }
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
                var account = Account.fromAPI(data[i]);
                output.push(account);
            }
            ;
            return output;
        });
    }
    static count(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/accounts/count`);
            url.search = new URLSearchParams(parameters).toString();
            let response = yield fetch(url, {
                method: 'GET',
            });
            let data = yield response.text();
            return parseInt(data);
        });
    }
    static byAddress(address, metadata = false, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/accounts/${address}`), parameters = { 'metadata': metadata };
            url.search = new URLSearchParams(parameters).toString();
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Account.fromAPI(data);
        });
    }
    static getMetadata(address, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/accounts/${address}/metadata`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return data;
        });
    }
    static suggestions(query, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/suggest/accounts/${query}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
        });
    }
}
//# sourceMappingURL=account.js.map