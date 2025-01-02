"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignToCustomPath = exports.extractValueFromObject = exports.generateRandom = exports.extractFileName = void 0;
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
//# sourceMappingURL=utils.js.map