"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
var AlphabetOrderType;
(function (AlphabetOrderType) {
    AlphabetOrderType[AlphabetOrderType["LoverCase"] = 0] = "LoverCase";
    AlphabetOrderType[AlphabetOrderType["UpperCase"] = 1] = "UpperCase";
    AlphabetOrderType[AlphabetOrderType["Number"] = 2] = "Number";
    AlphabetOrderType[AlphabetOrderType["SpecialCharacter"] = 3] = "SpecialCharacter";
})(AlphabetOrderType || (AlphabetOrderType = {}));
const CryptoService = (() => {
    const createPasswordHash = (password) => {
        return crypto_1.default.createHmac('sha256', password).digest('hex');
    };
    const comparePasswords = (password, hash) => {
        return createPasswordHash(password) == hash;
    };
    const createResetToken = () => {
        const resetTokenValue = crypto_1.default.randomBytes(20).toString("base64url");
        const resetTokenSecret = crypto_1.default.randomBytes(10).toString("hex");
        return { resetTokenValue, resetTokenSecret };
    };
    const alphabets = [
        {
            type: AlphabetOrderType.LoverCase,
            length: 26,
            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        },
        {
            type: AlphabetOrderType.UpperCase,
            length: 26,
            alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        },
        {
            type: AlphabetOrderType.Number,
            length: 10,
            alphabet: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        },
        {
            type: AlphabetOrderType.SpecialCharacter,
            length: 31,
            alphabet: ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~'],
        }
    ];
    const calculateEntropy = (str) => {
        let L = 0;
        const strArr = Array.from(str);
        const usedAlpas = new Set();
        for (const set of alphabets) {
            if (strArr.some(c => set.alphabet.includes(c))) {
                L += set.length;
                usedAlpas.add(set.type);
            }
        }
        return {
            entropy: Math.log2(Math.pow(L, str.length)),
            alphabetLength: L,
            alphabetsUsed: usedAlpas
        };
    };
    return {
        createPasswordHash,
        comparePasswords,
        createResetToken,
        calculateEntropy
    };
})();
exports.default = CryptoService;
//# sourceMappingURL=crypto-service.js.map