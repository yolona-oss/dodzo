"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrier = exports.timeout = exports.normalizeName = exports.isNull = exports.isUndefined = exports.assignToCustomPath = exports.extractValueFromObject = exports.generateRandom = exports.extractFileName = void 0;
const time_1 = require("./time");
function extractFileName(filePath, removeExtension = true) {
    const urlArr = filePath.split('/');
    const fullName = urlArr[urlArr.length - 1];
    let fileName = fullName;
    if (removeExtension) {
        fileName = fullName.split('.')[0];
    }
    return fileName;
}
exports.extractFileName = extractFileName;
const generateRandom = () => Math.random().toString(36).substring(2, 15);
exports.generateRandom = generateRandom;
function extractValueFromObject(obj, path) {
    let ret = obj;
    for (const node of path.split('.')) {
        ret = ret[node];
    }
    return ret;
}
exports.extractValueFromObject = extractValueFromObject;
function assignToCustomPath(obj, propPath, value) {
    let paths = propPath.split(".");
    if (paths.length > 1) {
        var key = (paths.shift());
        assignToCustomPath(obj[key] =
            Object.prototype.toString.call(obj[key]) === "[object Object]"
                ? obj[key]
                : {}, paths.join('.'), value);
    }
    else {
        if (obj[paths[0]] === undefined) {
            obj[paths[0]] = value;
        }
        else {
            Object.assign(obj[paths[0]], value);
        }
    }
    return obj;
}
exports.assignToCustomPath = assignToCustomPath;
const isUndefined = (value) => typeof value === 'undefined';
exports.isUndefined = isUndefined;
const isNull = (value) => value === null;
exports.isNull = isNull;
function normalizeName(title) {
    return title
        .trim()
        .replace(/\n/g, ' ')
        .replace(/\s\s+/g, ' ')
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (l) => l.toUpperCase()));
}
exports.normalizeName = normalizeName;
async function timeout(task, timeout) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error("Operation timed out"));
        }, timeout);
        task()
            .then((result) => {
            clearTimeout(timer);
            resolve(result);
        })
            .catch((error) => {
            clearTimeout(timer);
            reject(error);
        });
    });
}
exports.timeout = timeout;
async function retrier(fn, opts) {
    const default_opts = { tries: 3, wait: 700, timeout: 0 };
    const _opts = {
        ...default_opts,
        ...opts
    };
    if (_opts.timeout <= 0) {
        console.error("Timeout must be greater than 0. Setting to 0.");
        _opts.timeout = 0;
    }
    const checkFn = async () => {
        try {
            return await fn();
        }
        catch (e) {
            await (0, time_1.sleep)(_opts.wait);
            return null;
        }
    };
    let loopFn;
    if (_opts.timeout > 0) {
        loopFn = async () => await new Promise((res) => {
            timeout(checkFn, _opts.timeout).then((v) => {
                if (!v) {
                    res(null);
                }
                res(v);
            }).catch(() => { res(null); });
        });
    }
    else {
        loopFn = checkFn;
    }
    for (let tryn = 0; tryn < _opts.tries; tryn++) {
        const res = await loopFn();
        if (res) {
            return res;
        }
    }
    throw "Unreachable action: " + fn.name;
}
exports.retrier = retrier;
//# sourceMappingURL=utils.js.map