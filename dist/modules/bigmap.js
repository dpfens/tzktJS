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
;
;
class BigMap {
    constructor(ptr, contract, path, tags, active, firstLevel, lastLevel, totalKeys, activeKeys, updates, keyType, valueType) {
        this.ptr = ptr;
        this.contract = contract;
        this.path = path;
        this.tags = tags;
        this.active = active;
        this.firstLevel = firstLevel;
        this.lastLevel = lastLevel;
        this.totalKeys = totalKeys;
        this.activeKeys = activeKeys;
        this.updates = updates;
        this.keyType = keyType;
        this.valueType = valueType;
    }
    static fromAPI(data) {
        let ptr = data.ptr;
        let contract = data.contract;
        let path = data.path;
        let tags = data.tags;
        let active = data.active;
        let firstLevel = data.firstLevel;
        let lastLevel = data.lastLevel;
        let totalKeys = data.totalKeys;
        let activeKeys = data.activeKeys;
        let updates = data.updates;
        let keyType = data.keyType;
        let valueType = data.valueType;
        return new BigMap(ptr, contract, path, tags, active, firstLevel, lastLevel, totalKeys, activeKeys, updates, keyType, valueType);
    }
    static get(parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/bigmaps`);
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
                var bigMap = BigMap.fromAPI(data[i]);
                output.push(bigMap);
            }
            ;
            return output;
        });
    }
    static byID(id, micheline = 0, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/bigmaps/${id}`);
            let queryParameters = { 'micheline': micheline.toString() };
            url.search = new URLSearchParams(queryParameters).toString();
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return BigMap.fromAPI(data);
            ;
        });
    }
}
class BigMapType {
    constructor(prim, args, annots) {
        this.prim = prim;
        this.args = args;
        this.annots = annots;
    }
    static fromAPI(data) {
        let prim = data.prim, args = data.args, annots = data.annots;
        return new BigMapType(prim, args, annots);
    }
    static get(id, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${domain}/v1/bigmaps/${id}/type`;
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return BigMapType.fromAPI(data);
        });
    }
}
class BigMapUpdate {
    constructor(id, level, timestamp, bigmap, contract, path, action, content) {
        this.id = id;
        this.level = level;
        this.timestamp = timestamp;
        this.bigmap = bigmap;
        this.contract = contract;
        this.path = path;
        this.action = action;
        this.content = content;
    }
    static fromAPI(data) {
        let id = data.id, level = data.level, timestamp = data.timestamp, bigmap = data.bigmap, contract = data.contract, path = data.path, action = data.action, content = data.content;
        if (timestamp) {
            timestamp = new Date(timestamp);
        }
        return new BigMapUpdate(id, level, timestamp, bigmap, contract, path, action, content);
    }
}
class BigMapKey {
    constructor(id, active, hash, key, value, firstLevel, lastLevel, updates) {
        this.id = id;
        this.active = active;
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.firstLevel = firstLevel;
        this.lastLevel = lastLevel;
        this.updates = updates;
    }
    static fromAPI(data) {
        let id = data.id, active = data.active, hash = data.hash, key = data.key, value = data.value, firstLevel = data.firstLevel, lastLevel = data.lastLevel, updates = data.updates;
        return new BigMapKey(id, active, hash, key, value, firstLevel, lastLevel, updates);
    }
    static byBigMap(bigMapId, parameters, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/bigmaps/${bigMapId}/keys`);
            url.search = new URLSearchParams(parameters).toString();
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            let output = [];
            for (var i = 0; i < data.length; i++) {
                let bigMapKey = BigMapKey.fromAPI(data[i]);
                output.push(bigMapKey);
            }
            return output;
        });
    }
    static byKey(bigMapId, key, domain = 'https://api.tzkt.io') {
        return __awaiter(this, void 0, void 0, function* () {
            let url = new URL(`${domain}/v1/bigmaps/${bigMapId}/keys/${key}`);
            let response = yield fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = yield response.json();
            return BigMapKey.fromAPI(data);
        });
    }
}
//# sourceMappingURL=bigmap.js.map