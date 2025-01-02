declare enum AlphabetOrderType {
    LoverCase = 0,
    UpperCase = 1,
    Number = 2,
    SpecialCharacter = 3
}
declare const CryptoService: {
    createPasswordHash: (password: string) => string;
    comparePasswords: (password: string, hash: string) => boolean;
    createResetToken: () => {
        resetTokenValue: string;
        resetTokenSecret: string;
    };
    calculateEntropy: (str: string) => {
        entropy: number;
        alphabetLength: number;
        alphabetsUsed: Set<AlphabetOrderType>;
    };
};
export default CryptoService;
