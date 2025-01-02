"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPQBuilder = void 0;
const app_error_1 = require("./../app-error");
const utils_1 = require("./utils");
const defaultValidator = (v) => {
    if (v !== undefined && v !== null) {
        return true;
    }
    return false;
};
const defaultValidationFailCb = function () {
    return this;
};
const dummyTransfomr = (v) => v;
const dummyValidator = (v) => { v; return true; };
class OPQBuilder {
    constructor() {
        this.useGlobalValidationForMapped = true;
        this.useGlobalCheckForMapped = true;
        this.globalValidators = new Array();
        this.globalChecks = new Array();
        this.validators = new Map();
        this.checks = new Map();
        this.options = new Object({});
        this.mustHaveKeys = new Array();
        this.createDefaultCheck();
    }
    from(target, allowOverwrite = true) {
        if (!allowOverwrite && Object.keys(this.options).length > 0) {
            throw new Error("Cannot overwrite options");
        }
        this.options = target;
        return this;
    }
    setUseGlobalCheckForMapped(use = true) {
        this.useGlobalCheckForMapped = use;
        return this;
    }
    setUseGlobalValidationForMapped(use = true) {
        this.useGlobalValidationForMapped = use;
        return this;
    }
    addMustHaveKey(key) {
        if (!this.mustHaveKeys.includes(key)) {
            this.mustHaveKeys.push(key);
        }
        return this;
    }
    addCheckOptionForKey(key, fn) {
        let exists = this.checks.get(key) || [];
        this.checks.set(key, [...exists, fn]);
        return this;
    }
    addValidatorForKey(key, fn) {
        let exists = this.validators.get(key) || [];
        this.validators.set(key, [...exists, fn]);
        return this;
    }
    addGlobalCheck(fn) {
        this.globalChecks.push(fn);
        return this;
    }
    addGlobalValidator(fn) {
        this.globalValidators.push(fn);
        return this;
    }
    addToQuery(key, value, transform = dummyTransfomr) {
        const mappedChecks = this.checks.get(key) || [];
        const globalChecks = this.globalChecks;
        const checkers = [];
        checkers.push(...mappedChecks);
        if (this.useGlobalCheckForMapped || !mappedChecks.length) {
            checkers.push(...globalChecks);
        }
        for (const check of checkers) {
            if (!check(value)) {
                return this;
            }
        }
        const mappedValidators = this.validators.get(key) || [];
        const globalValidators = this.globalValidators;
        const validators = [];
        validators.push(...mappedValidators);
        if (this.useGlobalValidationForMapped || !mappedValidators) {
            validators.push(...globalValidators);
        }
        for (const validate of validators) {
            if (!validate(value)) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.VALIDATION_ERROR, {
                    errorMessage: `Invalid value for \'${key}\': ${value}`,
                    userMessage: `Invalid value for \'${key}\': ${value}`
                });
            }
        }
        this.options = (0, utils_1.assignToCustomPath)(this.options, key, transform(value));
        return this;
    }
    clearGlobalChecks() {
        this.globalChecks = new Array();
        return this;
    }
    clearGlobalValidators() {
        this.globalValidators = new Array();
        return this;
    }
    clearMappedValidators() {
        this.validators = new Map();
        return this;
    }
    clearOptions() {
        this.options = new Object({});
        return this;
    }
    clearMustHaveKeys() {
        this.mustHaveKeys = new Array();
        return this;
    }
    build() {
        for (const key of this.mustHaveKeys) {
            if ((0, utils_1.extractValueFromObject)(this.options, key) === undefined) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.BAD_REQUEST, {
                    errorMessage: `Missing required key: ${key}`,
                    userMessage: `Missing required key: ${key}`
                });
            }
        }
        const copy = this.options;
        this.clearOptions()
            .clearGlobalValidators()
            .clearMappedValidators()
            .createDefaultCheck()
            .setUseGlobalValidationForMapped(true)
            .setUseGlobalCheckForMapped(true)
            .clearMustHaveKeys();
        return copy;
    }
    createDefaultCheck() {
        this.clearGlobalChecks();
        this.addGlobalCheck(defaultValidator);
        return this;
    }
}
exports.OPQBuilder = OPQBuilder;
//# sourceMappingURL=opq-builder.js.map