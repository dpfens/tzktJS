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
//# sourceMappingURL=operation.js.map