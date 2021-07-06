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
//# sourceMappingURL=delegate.js.map