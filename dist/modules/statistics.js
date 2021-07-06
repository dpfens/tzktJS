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
//# sourceMappingURL=statistics.js.map