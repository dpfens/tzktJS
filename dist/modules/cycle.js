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
//# sourceMappingURL=cycle.js.map