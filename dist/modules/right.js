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
//# sourceMappingURL=right.js.map