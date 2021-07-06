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
//# sourceMappingURL=software.js.map