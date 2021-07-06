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
//# sourceMappingURL=quote.js.map