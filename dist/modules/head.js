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
//# sourceMappingURL=head.js.map