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
//# sourceMappingURL=reward.js.map