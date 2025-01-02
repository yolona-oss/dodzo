"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignToCustomPath = exports.extractValueFromObject = void 0;
function extractValueFromObject(obj, path) {
    let ret = obj;
    for (const node of path.split('.')) {
        ret = ret[node];
    }
    return ret;
}
exports.extractValueFromObject = extractValueFromObject;
function assignToCustomPath(obj, propPath, value) {
    let paths = new Array();
    paths = propPath.split(".");
    let _obj = (obj);
    if (paths.length > 1) {
        var key = paths.shift();
        assignToCustomPath(_obj[key] =
            Object.prototype.toString.call(_obj[key]) === "[object Object]"
                ? _obj[key]
                : {}, paths.join('.'), value);
    }
    else {
        _obj[paths[0]] = value;
    }
    return _obj;
}
exports.assignToCustomPath = assignToCustomPath;
//# sourceMappingURL=helpers.js.map