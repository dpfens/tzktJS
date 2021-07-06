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
//# sourceMappingURL=voting.js.map