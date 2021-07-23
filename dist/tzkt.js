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
;
;
;
class BigMap {
    constructor(ptr, contract, path, tags, active, firstLevel, lastLevel, totalKeys, activeKeys, updates, keyType, valueType) {
        this.ptr = ptr;
        this.contract = contract;
        this.path = path;
        this.tags = tags;
        this.active = active;
        this.firstLevel = firstLevel;
        this.lastLevel = lastLevel;
        this.totalKeys = totalKeys;
        this.activeKeys = activeKeys;
        this.updates = updates;
        this.keyType = keyType;
        this.valueType = valueType;
    }
    static fromAPI(data) {
        let ptr = data.ptr;
        let contract = data.contract;
        let path = data.path;
        let tags = data.tags;
        let active = data.active;
        let firstLevel = data.firstLevel;
        let lastLevel = data.lastLevel;
        let totalKeys = data.totalKeys;
        let activeKeys = data.activeKeys;
        let updates = data.updates;
        let keyType = data.keyType;
        let valueType = data.valueType;
        return new BigMap(ptr, contract, path, tags, active, firstLevel, lastLevel, totalKeys, activeKeys, updates, keyType, valueType);
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/bigmaps`);
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
                var bigMap = BigMap.fromAPI(data[i]);
                output.push(bigMap);
            }
            ;
            return output;
        });
    }
    static byID(id, micheline = 0, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/bigmaps/${id}`);
            let queryParameters = { 'micheline': micheline.toString() };
            url.search = new URLSearchParams(queryParameters).toString();
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return BigMap.fromAPI(data);
        });
    }
    static byContract(address, parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/contracts/${address}/bigmaps`);
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
                let instance = BigMap.fromAPI(data[i]);
                output.push(instance);
            }
            return output;
        });
    }
    static byName(address, name, micheline = 0, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/contracts/${address}/bigmaps/${name}`);
            let queryParameters = { 'micheline': micheline.toString() };
            url.search = new URLSearchParams(queryParameters).toString();
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return BigMap.fromAPI(data);
        });
    }
}
class BigMapType {
    constructor(prim, args, annots) {
        this.prim = prim;
        this.args = args;
        this.annots = annots;
    }
    static fromAPI(data) {
        let prim = data.prim, args = data.args, annots = data.annots;
        return new BigMapType(prim, args, annots);
    }
    static get(id, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/bigmaps/${id}/type`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return BigMapType.fromAPI(data);
        });
    }
}
class BigMapUpdate {
    constructor(id, level, timestamp, bigmap, contract, path, action, content) {
        this.id = id;
        this.level = level;
        this.timestamp = timestamp;
        this.bigmap = bigmap;
        this.contract = contract;
        this.path = path;
        this.action = action;
        this.content = content;
    }
    static fromAPI(data) {
        let id = data.id, level = data.level, timestamp = data.timestamp, bigmap = data.bigmap, contract = data.contract, path = data.path, action = data.action, content = data.content;
        if (timestamp) {
            timestamp = new Date(timestamp);
        }
        return new BigMapUpdate(id, level, timestamp, bigmap, contract, path, action, content);
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/bigmaps/updates`);
            url.search = new URLSearchParams(parameters).toString();
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            let output = [];
            for (var i = 0; i < data.length; i++) {
                let bigMapUpdate = BigMapUpdate.fromAPI(data[i]);
                output.push(bigMapUpdate);
            }
            return output;
        });
    }
}
class BigMapKey {
    constructor(id, active, hash, key, value, firstLevel, lastLevel, updates) {
        this.id = id;
        this.active = active;
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.firstLevel = firstLevel;
        this.lastLevel = lastLevel;
        this.updates = updates;
    }
    static fromAPI(data) {
        let id = data.id, active = data.active, hash = data.hash, key = data.key, value = data.value, firstLevel = data.firstLevel, lastLevel = data.lastLevel, updates = data.updates;
        return new BigMapKey(id, active, hash, key, value, firstLevel, lastLevel, updates);
    }
    static byBigMap(bigMapId, parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/bigmaps/${bigMapId}/keys`);
            url.search = new URLSearchParams(parameters).toString();
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            let output = [];
            for (var i = 0; i < data.length; i++) {
                let bigMapKey = BigMapKey.fromAPI(data[i]);
                output.push(bigMapKey);
            }
            return output;
        });
    }
    static byKey(bigMapId, key, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/bigmaps/${bigMapId}/keys/${key}`);
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return BigMapKey.fromAPI(data);
        });
    }
}
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
class Cycle {
    constructor(index, firstLevel, startTime, lastLevel, endTime, snapshotIndex, snapshotLevel, randomSeed, totalBakers, totalRolls, totalStaking, totalDelegators, totalDelegated, quote) {
        this.index = index;
        this.firstLevel = firstLevel;
        this.startTime = startTime;
        this.lastLevel = lastLevel;
        this.endTime = endTime;
        this.snapshotIndex = snapshotIndex;
        this.snapshotLevel = snapshotLevel;
        this.randomSeed = randomSeed;
        this.totalBakers = totalBakers;
        this.totalRolls = totalRolls;
        this.totalStaking = totalStaking;
        this.totalDelegators = totalDelegators;
        this.totalDelegated = totalDelegated;
        this.quote = quote;
    }
    static fromAPI(data) {
        let index = data.index, firstLevel = data.firstLevel, startTime = data.startTime, lastLevel = data.lastLevel, endTime = data.endTime, snapshotIndex = data.snapshotIndex, snapshotLevel = data.snapshotLevel, randomSeed = data.randomSeed, totalBakers = data.totalBakers, totalRolls = data.totalRolls, totalStaking = data.totalStaking, totalDelegators = data.totalDelegators, totalDelegated = data.totalDelegated, quote = data.quote;
        if (startTime) {
            startTime = new Date(startTime);
        }
        if (endTime) {
            endTime = new Date(endTime);
        }
        return new Cycle(index, firstLevel, startTime, lastLevel, endTime, snapshotIndex, snapshotLevel, randomSeed, totalBakers, totalRolls, totalStaking, totalDelegators, totalDelegated, quote);
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/cycles`);
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
                var cycle = Cycle.fromAPI(data[i]);
                output.push(cycle);
            }
            ;
            return output;
        });
    }
    static byIndex(index, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/cycles/${index}`);
            if (quote) {
                url.search = new URLSearchParams({ 'quote': quote }).toString();
            }
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Cycle.fromAPI(data);
        });
    }
    static count(domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/cycles/count`;
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
}
class ShortSoftware {
    constructor(version, date) {
        this.version = version;
        this.date = date;
    }
    static fromAPI(data) {
        let version = data.version, date = new Date(data.date);
        return new ShortSoftware(version, date);
    }
}
class Delegate extends AccountBase {
    constructor(type, alias, address, publicKey, revealed, balance, frozenDeposits, frozenRewards, frozenFees, counter, delegate, delegationLevel, delegationTime, stakingBalance, numContracts, numDelegators, numBlocks, numEndorsements, numBallots, numProposals, numActivations, numDoubleBaking, numDoubleEndorsing, numNonceRevelations, numRelevationPenalties, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata, software) {
        super(type, alias, address, publicKey, revealed, balance, counter, delegationLevel, delegationTime, numContracts, numActivations, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata);
        this.frozenDeposits = frozenDeposits;
        this.frozenRewards = frozenRewards;
        this.frozenFees = frozenFees;
        this.delegate = delegate;
        this.stakingBalance = stakingBalance;
        this.numDelegators = numDelegators;
        this.numBlocks = numBlocks;
        this.numBallots = numBallots;
        this.numEndorsements = numEndorsements;
        this.numProposals = numProposals;
        this.numDoubleBaking = numDoubleBaking;
        this.numDoubleEndorsing = numDoubleEndorsing;
        this.numNonceRevelations = numNonceRevelations;
        this.numRelevationPenalties = numRelevationPenalties;
        this.software = software;
    }
    static fromAPI(data) {
        let type = data.type, alias = data.alias, address = data.address, publicKey = data.publicKey, revealed = data.revealed, balance = data.balance, frozenDeposits = data.frozenDeposits, frozenRewards = data.frozenRewards, frozenFees = data.frozenFees, counter = data.counter, delegate = data.delegate, delegationLevel = data.delegationLevel, delegationTime = data.delegationTime, stakingBalance = data.stakingBalance, numContracts = data.numContracts, numDelegators = data.numDelegators, numBlocks = data.numBlocks, numEndorsements = data.numEndorsements, numBallots = data.numBallots, numProposals = data.numProposals, numActivations = data.numActivations, numDoubleBaking = data.numDoubleBaking, numDoubleEndorsing = data.numDoubleEndorsing, numNonceRevelations = data.numNonceRevelations, numRelevationPenalties = data.numRelevationPenalties, numDelegations = data.numDelegations, numOriginations = data.numOriginations, numTransactions = data.numTransactions, numReveals = data.numReveals, numMigrations = data.numMigrations, firstActivity = data.firstActivity, firstActivityTime = data.firstActivityTime, lastActivity = data.lastActivity, lastActivityTime = data.lastActivityTime, contracts = data.contracts, operations = data.operations, metadata = data.metadata, software = data.software;
        if (software) {
            software = ShortSoftware.fromAPI(software);
        }
        if (firstActivityTime) {
            firstActivityTime = new Date(firstActivityTime);
        }
        if (lastActivityTime) {
            lastActivityTime = new Date(lastActivityTime);
        }
        return new Delegate(type, alias, address, publicKey, revealed, balance, frozenDeposits, frozenRewards, frozenFees, counter, delegate, delegationLevel, delegationTime, stakingBalance, numContracts, numDelegators, numBlocks, numEndorsements, numBallots, numProposals, numActivations, numDoubleBaking, numDoubleEndorsing, numNonceRevelations, numRelevationPenalties, numDelegations, numOriginations, numTransactions, numReveals, numMigrations, firstActivity, firstActivityTime, lastActivity, lastActivityTime, contracts, operations, metadata, software);
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/delegates`);
            if (parameters) {
                parameters = parameters;
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
                var delegate = Delegate.fromAPI(data[i]);
                output.push(delegate);
            }
            ;
            return output;
        });
    }
    static count(active, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/delegates/count`);
            if (typeof active !== 'undefined') {
                let parameters = { 'active': active };
                url.search = new URLSearchParams(parameters).toString();
            }
            let response = yield fetch(url, {
                method: 'GET',
            });
            let data = yield response.text();
            return parseInt(data);
        });
    }
    static byAddress(address, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/delegates/${address}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Delegate.fromAPI(data);
        });
    }
}
class Head {
    constructor(cycle, level, hash, protocol, timestamp, votingEpoch, votingPeriod, knownLevel, lastSync, synced, quoteLevel, quoteBtc, quoteEur, quoteUsd, quoteCny, quoteJpy, quoteKrw, quoteEth) {
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
    static fromAPI(data) {
        let cycle = data.cycle, level = data.level, hash = data.hash, protocol = data.protocol, timestamp = data.timestamp, votingEpoch = data.votingEpoch, votingPeriod = data.votingPeriod, knownLevel = data.knownLevel, lastSync = data.lastSync, synced = data.synced, quoteLevel = data.quoteLevel, quoteBtc = data.quoteBtc, quoteEur = data.quoteEur, quoteUsd = data.quoteUsd, quoteCny = data.quoteCny, quoteJpy = data.quoteJpy, quoteKrw = data.quoteKrw, quoteEth = data.quoteEth;
        if (timestamp) {
            timestamp = new Date(timestamp);
        }
        if (lastSync) {
            lastSync = new Date(lastSync);
        }
        return new Head(cycle, level, hash, protocol, timestamp, votingEpoch, votingPeriod, knownLevel, lastSync, synced, quoteLevel, quoteBtc, quoteEur, quoteUsd, quoteCny, quoteJpy, quoteKrw, quoteEth);
    }
    static get(domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/head`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Head.fromAPI(data);
        });
    }
}
class Operation {
    constructor(type, id, level, timestamp, block, hash, delegate, slots, deposit, rewards, quote) {
        this.type = type;
        this.id = id;
        this.level = level;
        this.timestamp = timestamp;
        this.block = block;
        this.hash = hash;
        this.delegate = delegate;
        this.slots = slots;
        this.deposit = deposit;
        this.rewards = rewards;
        this.quote = quote;
    }
    static fromAPI(data) {
        let type = data.type, id = data.id, level = data.level, timestamp = data.timestamp, block = data.blocks, hash = data.hash, delegate = data.delegate, slots = data.slots, deposit = data.deposit, rewards = data.rewards, quote = data.quote;
        return new Operation(type, id, level, timestamp, block, hash, delegate, slots, deposit, rewards, quote);
    }
    static byHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/${hash}`);
            if (quote) {
                url.search = new URLSearchParams({ 'quote': quote }).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static ByHashCounter(hash, counter, quote = "None", domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/${hash}/${counter}`), parameters = { 'micheline': 0, 'quote': quote };
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static byAccount(address, options, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/accounts/${address}/operations`);
            if (options) {
                let parameters = JSON.parse(JSON.stringify(options));
                if (options.timestamp) {
                    parameters.timestamp = options.timestamp.toISOString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static typeByHash(type, hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/${type}/${hash}`);
            if (quote) {
                url.search = new URLSearchParams({ 'quote': quote }).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static typeCount(type, level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/${type}/count`), parameters = {};
            if (level) {
                parameters.level = level;
            }
            if (timestamp) {
                parameters.timestamp = timestamp.toISOString();
            }
            if (parameters) {
                url.search = new URLSearchParams(parameters).toString();
            }
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.text();
            return parseInt(data);
        });
    }
    static getEndorsements(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/endorsements/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static endorsementsByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('endorsements', hash, quote, domain);
        });
    }
    static endorsementsCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('endorsements', level, timestamp, domain);
        });
    }
    static getBallots(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/ballots/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static ballotsByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('ballots', hash, quote, domain);
        });
    }
    static ballotsCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('ballots', level, timestamp, domain);
        });
    }
    static getProposals(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/proposals/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static proposalsByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('proposals', hash, quote, domain);
        });
    }
    static proposalsCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('proposals', level, timestamp, domain);
        });
    }
    static getActivations(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/activations/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static activationsByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('activations', hash, quote, domain);
        });
    }
    static activationsCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('activations', level, timestamp, domain);
        });
    }
    static getDoubleBakings(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/double_baking/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static doubleBakingByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('double_baking', hash, quote, domain);
        });
    }
    static doubleBakingCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('double_baking', level, timestamp, domain);
        });
    }
    static getDoubleEndorsings(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/double_endorsing/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static doubleEndorsingByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('double_endorsing', hash, quote, domain);
        });
    }
    static doubleEndorsingCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('double_endorsing', level, timestamp, domain);
        });
    }
    static getNonceRevelations(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/nonce_revelations/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static nonceRevelationsByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('nonce_revelations', hash, quote, domain);
        });
    }
    static nonceRevelationsCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('nonce_revelations', level, timestamp, domain);
        });
    }
    static getDelegations(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/delegations/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static delegationsByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('delegations', hash, quote, domain);
        });
    }
    static delegationsCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('delegations', level, timestamp, domain);
        });
    }
    static getOriginations(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/originations/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static originationsByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('originations', hash, quote, domain);
        });
    }
    static originationsCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('originations', level, timestamp, domain);
        });
    }
    static getTransactions(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/transactions/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static transactionsByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('transactions', hash, quote, domain);
        });
    }
    static transactionsCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('transactions', level, timestamp, domain);
        });
    }
    static getReveals(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/reveals/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static revealsByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('reveals', hash, quote, domain);
        });
    }
    static revealsCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('reveals', level, timestamp, domain);
        });
    }
    static getMigrations(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/migrations/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static migrationsByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('migrations', hash, quote, domain);
        });
    }
    static migrationsCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('migrations', level, timestamp, domain);
        });
    }
    static getRevelationPenalties(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/revelation_penalties/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static revelationPenaltiesByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('revelation_penalties', hash, quote, domain);
        });
    }
    static revelationPenaltiesCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('revelation_penalties', level, timestamp, domain);
        });
    }
    static getBakings(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/operations/baking/`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            if (parameters) {
                url.search = new URLSearchParams(urlParameters).toString();
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
                var operation = Operation.fromAPI(data[i]);
                output.push(operation);
            }
            ;
            return output;
        });
    }
    static bakingByHash(hash, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeByHash('baking', hash, quote, domain);
        });
    }
    static bakingCount(level, timestamp, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Operation.typeCount('baking', level, timestamp, domain);
        });
    }
}
class Protocol {
    constructor(code, hash, firstLevel, lastLevel, constants, metadata) {
        this.code = code;
        this.hash = hash;
        this.firstLevel = firstLevel;
        this.lastLevel = lastLevel;
        this.constants = constants;
        this.metadata = metadata;
    }
    static fromAPI(data) {
        let code = data.code, hash = data.hash, firstLevel = data.firstLevel, lastLevel = data.lastLevel, constants = data.constants, metadata = data.metadata;
        return new Protocol(code, hash, firstLevel, lastLevel, constants, metadata);
    }
    static count(domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/protocols/count`;
            let response = yield fetch(url, {
                method: 'GET',
            });
            let data = yield response.text();
            return parseInt(data);
        });
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/protocols`);
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
                var protocol = Protocol.fromAPI(data[i]);
                output.push(protocol);
            }
            ;
            return output;
        });
    }
    static byCode(code, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/voting/protocols/${code}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Protocol.fromAPI(data);
        });
    }
    static byHash(hash, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/voting/protocols/${hash}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Protocol.fromAPI(data);
        });
    }
    static byCycle(cycle, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/protocols/cycles/${cycle}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Protocol.fromAPI(data);
        });
    }
    static current(domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/protocols/current`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Protocol.fromAPI(data);
        });
    }
    static suggestions(query, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/suggest/protocols/${query}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return yield response.json();
        });
    }
}
class Quote {
    constructor(level, timestamp, btc, eur, usd, cny, jpy, krw, eth) {
        this.level = level;
        this.timestamp = timestamp;
        this.btc = btc;
        this.eur = eur;
        this.usd = usd;
        this.cny = cny;
        this.jpy = jpy;
        this.krw = krw;
        this.eth = eth;
    }
    static fromAPI(data) {
        let level = data.level, timestamp = data.timestamp, btc = data.btc, eur = data.eur, usd = data.usd, cny = data.cny, jpy = data.jpy, krw = data.krw, eth = data.eth;
        if (timestamp) {
            timestamp = new Date(timestamp);
        }
        return new Quote(level, timestamp, btc, eur, usd, cny, jpy, krw, eth);
    }
    static last(domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/quotes/last`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Quote.fromAPI(data);
        });
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/quotes`);
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
                var quote = Quote.fromAPI(data[i]);
                output.push(quote);
            }
            ;
            return output;
        });
    }
    static count(domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/quotes/count`;
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
}
class Reward {
    constructor(cycle, stakingBalance, delegatedBalance, numDelegators, expectedBlocks, expectedEndorsements, futureBlocks, futureBlockRewards, futureBlockDeposits, ownBlocks, ownBlockRewards, extraBlocks, extraBlockRewards, missedOwnBlocks, missedOwnBlockRewards, missedExtraBlocks, missedExtraBlockRewards, uncoveredOwnblocks, uncoveredOwnBlockRewards, uncoveredExtraBlocks, uncoveredExtraBlockRewards, blockDeposits, futureEndorsements, futureEndorsementRewards, futureEndorsementDeposits, endorsements, endorsementRewards, missedEndorsements, missedEndorsementRewards, uncoveredEndorsements, uncoveredEndorsementRewards, endorsementDeposits, ownBlockFees, extraBlockFees, missedOwnBlockFees, missedExtraBlockFees, uncoveredOwnBlockFees, uncoveredExtraBlockFees, doubleBakingRewards, doubleBakingLostDeposits, doubleBakingLostRewards, doubleBakingLostFees, doubleEndorsingRewards, doubleEndorsingLostDeposits, doubleEndorsingLostFees, revelationRewards, revelationLostFees, quote) {
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
    static fromAPI(data) {
        let cycle = data.cycle, stakingBalance = data.stakingBalance, delegatedBalance = data.delegatedBalance, numDelegators = data.numDelegators, expectedBlocks = data.expectedBlocks, expectedEndorsements = data.expectedEndorsements, futureBlocks = data.futureBlocks, futureBlockRewards = data.futureBlockRewards, futureBlockDeposits = data.futureBlockDeposits, ownBlocks = data.ownBlocks, ownBlockRewards = data.ownBlockRewards, extraBlocks = data.extraBlocks, extraBlockRewards = data.extraBlockRewards, missedOwnBlocks = data.missedOwnBlocks, missedOwnBlockRewards = data.missedOwnBlockRewards, missedExtraBlocks = data.missedExtraBlocks, missedExtraBlockRewards = data.missedExtraBlockRewards, uncoveredOwnblocks = data.uncoveredOwnblocks, uncoveredOwnBlockRewards = data.uncoveredOwnBlockRewards, uncoveredExtraBlocks = data.uncoveredExtraBlocks, uncoveredExtraBlockRewards = data.uncoveredExtraBlockRewards, blockDeposits = data.blockDeposits, futureEndorsements = data.futureEndorsements, futureEndorsementRewards = data.futureEndorsementRewards, futureEndorsementDeposits = data.futureEndorsementDeposits, endorsements = data.endorsements, endorsementRewards = data.endorsementRewards, missedEndorsements = data.missedEndorsements, missedEndorsementRewards = data.missedEndorsementRewards, uncoveredEndorsements = data.uncoveredEndorsements, uncoveredEndorsementRewards = data.uncoveredEndorsementRewards, endorsementDeposits = data.endorsementDeposits, ownBlockFees = data.ownBlockFees, extraBlockFees = data.extraBlockFees, missedOwnBlockFees = data.missedOwnBlockFees, missedExtraBlockFees = data.missedExtraBlockFees, uncoveredOwnBlockFees = data.uncoveredOwnBlockFees, uncoveredExtraBlockFees = data.uncoveredExtraBlockFees, doubleBakingRewards = data.doubleBakingRewards, doubleBakingLostDeposits = data.doubleBakingLostDeposits, doubleBakingLostRewards = data.doubleBakingLostRewards, doubleBakingLostFees = data.doubleBakingLostFees, doubleEndorsingRewards = data.doubleEndorsingRewards, doubleEndorsingLostDeposits = data.doubleEndorsingLostDeposits, doubleEndorsingLostFees = data.doubleEndorsingLostFees, revelationRewards = data.revelationRewards, revelationLostFees = data.revelationLostFees, quote = data.quote;
        return new Reward(cycle, stakingBalance, delegatedBalance, numDelegators, expectedBlocks, expectedEndorsements, futureBlocks, futureBlockRewards, futureBlockDeposits, ownBlocks, ownBlockRewards, extraBlocks, extraBlockRewards, missedOwnBlocks, missedOwnBlockRewards, missedExtraBlocks, missedExtraBlockRewards, uncoveredOwnblocks, uncoveredOwnBlockRewards, uncoveredExtraBlocks, uncoveredExtraBlockRewards, blockDeposits, futureEndorsements, futureEndorsementRewards, futureEndorsementDeposits, endorsements, endorsementRewards, missedEndorsements, missedEndorsementRewards, uncoveredEndorsements, uncoveredEndorsementRewards, endorsementDeposits, ownBlockFees, extraBlockFees, missedOwnBlockFees, missedExtraBlockFees, uncoveredOwnBlockFees, uncoveredExtraBlockFees, doubleBakingRewards, doubleBakingLostDeposits, doubleBakingLostRewards, doubleBakingLostFees, doubleEndorsingRewards, doubleEndorsingLostDeposits, doubleEndorsingLostFees, revelationRewards, revelationLostFees, quote);
    }
    static bakerCount(address, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/rewards/bakers/${address}/count`;
            let response = yield fetch(url, {
                method: 'GET',
            });
            let data = yield response.text();
            return parseInt(data);
        });
    }
    static byBaker(address, parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/rewards/bakers/${address}`);
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
                var reward = Reward.fromAPI(data[i]);
                output.push(reward);
            }
            ;
            return output;
        });
    }
    static byBakerCycle(address, cycle, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/rewards/bakers/${address}/${cycle}`);
            if (quote) {
                url.search = new URLSearchParams({ 'quote': quote }).toString();
            }
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Reward.fromAPI(data);
        });
    }
    static byDelegator(address, parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/rewards/delegators/${address}`);
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
                var reward = Reward.fromAPI(data[i]);
                output.push(reward);
            }
            ;
            return output;
        });
    }
    static byDelegatorCycle(address, cycle, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/rewards/delegators/${address}/${cycle}`);
            if (quote) {
                url.search = new URLSearchParams({ 'quote': quote }).toString();
            }
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Reward.fromAPI(data);
        });
    }
    static bakerRewardSplits(address, cycle, parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/rewards/delegators/${address}/${cycle}`);
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
            return Reward.fromAPI(data);
        });
    }
    static rewardSplitsDelegator(baker, cycle, delegator, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            `https://api.tzkt.io/v1/rewards/split/{baker}/{cycle}/{delegator}`;
            let url = `${domain}/v1/rewards/split/${baker}/${cycle}/${delegator}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return yield response.json();
        });
    }
}
class Right {
    constructor(type, cycle, level, timestamp, priority, slots, baker, status) {
        this.type = type;
        this.cycle = cycle;
        this.level = level;
        this.timestamp = timestamp;
        this.priority = priority;
        this.slots = slots;
        this.baker = baker;
        this.status = status;
    }
    static fromAPI(data) {
        let type = data.type, cycle = data.cycle, level = data.level, timestamp = data.timestamp, priority = data.priority, slots = data.slots, baker = data.baker, status = data.status;
        if (timestamp) {
            timestamp = new Date(timestamp);
        }
        return new Right(type, cycle, level, timestamp, priority, slots, baker, status);
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/rights`);
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
                var right = Right.fromAPI(data[i]);
                output.push(right);
            }
            ;
            return output;
        });
    }
    static count(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/rights/count`);
            if (parameters) {
                url.search = new URLSearchParams(parameters).toString();
            }
            let response = yield fetch(url, {
                method: 'GET',
            });
            let data = yield response.text();
            return parseInt(data);
        });
    }
}
class Software {
    constructor(shortHash, firstLevel, firstTime, lastLevel, lastTime, blocksCount, metadata) {
        this.shortHash = shortHash;
        this.firstLevel = firstLevel;
        this.firstTime = firstTime;
        this.lastLevel = lastLevel;
        this.lastTime = lastTime;
        this.blocksCount = blocksCount;
        this.metadata = metadata;
    }
    static fromAPI(data) {
        let shortHash = data.shortHash, firstLevel = data.firstLevel, firstTime = data.firstTime, lastLevel = data.lastLevel, lastTime = data.lastTime, blocksCount = data.blocksCount, metadata = data.metadata;
        if (firstTime) {
            firstTime = new Date(firstTime);
        }
        if (lastTime) {
            lastTime = new Date(lastTime);
        }
        return new Software(shortHash, firstLevel, firstTime, lastLevel, lastTime, blocksCount, metadata);
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/software`);
            if (parameters) {
                let urlParameters = JSON.parse(JSON.stringify(parameters));
                url.search = new URLSearchParams(urlParameters).toString();
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
                var software = Software.fromAPI(data[i]);
                output.push(software);
            }
            ;
            return output;
        });
    }
    static count(domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/software/count`;
            let response = yield fetch(url, {
                method: 'GET',
            });
            let data = yield response.text();
            return parseInt(data);
        });
    }
}
class Statistics {
    constructor(cycle, date, level, timestamp, totalSupply, circulatingSupply, totalBootstrapped, totalCommitments, totalActivated, totalCreated, totalBurned, totalVested, totalFrozen, quote) {
        this.cycle = cycle;
        this.date = date;
        this.level = level;
        this.timestamp = timestamp;
        this.totalSupply = totalSupply;
        this.circulatingSupply = circulatingSupply;
        this.totalBootstrapped = totalBootstrapped;
        this.totalCommitments = totalCommitments;
        this.totalActivated = totalActivated;
        this.totalCreated = totalCreated;
        this.totalBurned = totalBurned;
        this.totalVested = totalVested;
        this.totalFrozen = totalFrozen;
        this.quote = quote;
    }
    static fromAPI(data) {
        let cycle = data.cycle, date = data.date, level = data.level, timestamp = data.timestamp, totalSupply = data.totalSupply, circulatingSupply = data.circulatingSupply, totalBootstrapped = data.totalBootstrapped, totalCommitments = data.totalCommitments, totalActivated = data.totalActivated, totalCreated = data.totalCreated, totalBurned = data.totalBurned, totalVested = data.totalVested, totalFrozen = data.totalFrozen, quote = data.quote;
        if (date) {
            date = new Date(data.date);
        }
        if (data.timestamp) {
            timestamp = new Date(data.timestamp);
        }
        return new Statistics(cycle, date, level, timestamp, totalSupply, circulatingSupply, totalBootstrapped, totalCommitments, totalActivated, totalCreated, totalBurned, totalVested, totalFrozen, quote);
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/statistics`), urlParameters = JSON.parse(JSON.stringify(parameters));
            if (urlParameters.timestamp) {
                let dateString = urlParameters.timestamp.toISOString().split('T')[0];
                urlParameters.timestamp = dateString;
            }
            url.search = new URLSearchParams(urlParameters).toString();
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            var output = [];
            for (var i = 0; i < data.length; i++) {
                var statistics = Statistics.fromAPI(data[i]);
                output.push(statistics);
            }
            ;
            return output;
        });
    }
    static daily(options, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            var url = new URL(`${domain}/v1/statistics/daily`);
            if (options) {
                let parameters = JSON.parse(JSON.stringify(options));
                if (options.date) {
                    parameters.date = parameters.date.toISOString().split('T')[0];
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
                var statistics = Statistics.fromAPI(data[i]);
                output.push(statistics);
            }
            ;
            return output;
        });
    }
    static cyclic(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/statistics/cyclic`);
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
                var statistics = Statistics.fromAPI(data[i]);
                output.push(statistics);
            }
            ;
            return output;
        });
    }
    static current(select, quote, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/statistics/current`);
            let parameters = {};
            if (select) {
                parameters.select = select;
            }
            if (quote) {
                parameters.quote = quote;
            }
            url.search = new URLSearchParams(parameters).toString();
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Statistics.fromAPI(data);
        });
    }
}
class Proposal {
    constructor(hash, initiator, firstPeriod, lastPeriod, epoch, upvotes, rolls, status, metadata) {
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
    static suggestions(query, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/suggest/proposals/${query}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return yield response.json();
        });
    }
    static fromAPI(data) {
        let hash = data.hash, initiator = data.initiator, firstPeriod = data.firstPeriod, lastPeriod = data.lastPeriod, epoch = data.epoch, upvotes = data.upvotes, rolls = data.rolls, status = data.status, metadata = data.metadata;
        return new Proposal(hash, initiator, firstPeriod, lastPeriod, epoch, upvotes, rolls, status, metadata);
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/voting/proposals`);
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
                var proposal = Proposal.fromAPI(data[i]);
                output.push(proposal);
            }
            ;
            return output;
        });
    }
    static count(domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/voting/proposals/count`);
            let response = yield fetch(url, {
                method: 'GET',
            });
            let data = yield response.text();
            return parseInt(data);
        });
    }
    static byHash(hash, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/voting/proposals/${hash}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return Proposal.fromAPI(data);
        });
    }
}
class VotingPeriod {
    constructor(index, epoch, firstLevel, startTime, lastLevel, endTime, kind, status, totalBakers, totalRolls, upvotesQuorum, proposalsCount, topUpvotes, topRolls, ballotQuorum, supermajority, yayBallots, yayRolls, nayBallots, nayRolls, passBallots, passRolls) {
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
    static fromAPI(data) {
        let index = data.index, epoch = data.epoch, firstLevel = data.firstLevel, startTime = data.startTime, lastLevel = data.lastLevel, endTime = data.endTime, kind = data.kind, status = data.status, totalBakers = data.totalBakers, totalRolls = data.totalRolls, upvotesQuorum = data.upvotesQuorum, proposalsCount = data.proposalsCount, topUpvotes = data.topUpvotes, topRolls = data.topRolls, ballotQuorum = data.ballotQuorum, supermajority = data.supermajority, yayBallots = data.yayBallots, yayRolls = data.yayRolls, nayBallots = data.nayBallots, nayRolls = data.nayRolls, passBallots = data.passBallots, passRolls = data.passRolls;
        if (startTime) {
            startTime = new Date(startTime);
        }
        if (endTime) {
            endTime = new Date(endTime);
        }
        return new VotingPeriod(index, epoch, firstLevel, startTime, lastLevel, endTime, kind, status, totalBakers, totalRolls, upvotesQuorum, proposalsCount, topUpvotes, topRolls, ballotQuorum, supermajority, yayBallots, yayRolls, nayBallots, nayRolls, passBallots, passRolls);
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/voting/periods`);
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
                var period = VotingPeriod.fromAPI(data[i]);
                output.push(period);
            }
            ;
            return output;
        });
    }
    static byIndex(index, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/voting/periods/${index}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return VotingPeriod.fromAPI(data);
        });
    }
    static current(domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/voting/periods/current`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return VotingPeriod.fromAPI(data);
        });
    }
}
class VotingEpoch {
    constructor(index, firstLevel, startTime, lastLevel, endTime, status, periods, proposals) {
        this.index = index;
        this.firstLevel = firstLevel;
        this.startTime = startTime;
        this.lastLevel = lastLevel;
        this.endTime = endTime;
        this.status = status;
        this.periods = periods;
        this.proposals = proposals;
    }
    static fromAPI(data) {
        let index = data.index, firstLevel = data.firstLevel, startTime = data.startTime, lastLevel = data.lastLevel, endTime = data.endTime, status = data.status, periods = data.periods, proposals = data.proposals;
        if (startTime) {
            startTime = new Date(startTime);
        }
        if (endTime) {
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
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/voting/epochs`);
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
                var epoch = VotingEpoch.fromAPI(data[i]);
                output.push(epoch);
            }
            ;
            return output;
        });
    }
    static byIndex(index, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/voting/epochs/${index}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return VotingEpoch.fromAPI(data);
        });
    }
    static current(domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/voting/epochs/current`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return VotingEpoch.fromAPI(data);
        });
    }
    static latest(domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/voting/epochs/latest_voting`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return VotingEpoch.fromAPI(data);
        });
    }
}
class PeriodVoter {
    constructor(delegate, rolls, status) {
        this.delegate = delegate;
        this.rolls = rolls;
        this.status = status;
    }
    static fromAPI(data) {
        let delegate = data.delegate, rolls = data.rolls, status = data.status;
        return new PeriodVoter(delegate, rolls, status);
    }
    static get(index, parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/voting/periods/${index}/voters`);
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
                var voter = PeriodVoter.fromAPI(data[i]);
                output.push(voter);
            }
            ;
            return output;
        });
    }
    static byAddress(index, address, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/voting/periods/${index}/voters/${address}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return PeriodVoter.fromAPI(data);
        });
    }
    static current(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/voting/periods/current/voters`);
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
                var voter = PeriodVoter.fromAPI(data[i]);
                output.push(voter);
            }
            ;
            return output;
        });
    }
    static currentByAddress(address, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/voting/periods/current/voters/${address}`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return PeriodVoter.fromAPI(data);
        });
    }
}
//# sourceMappingURL=tzkt.js.map