"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsDefenition = void 0;
const common_1 = require("@nestjs/common");
const app_error_type_enum_1 = require("./enums/app-error-type.enum");
exports.ErrorsDefenition = {
    [app_error_type_enum_1.AppErrorTypeEnum.BAD_REQUEST]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.BAD_REQUEST,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Bad Request',
        userMessage: 'Bad Request'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.DB_ENTITY_EXISTS]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.DB_ENTITY_EXISTS,
        httpStatus: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        errorMessage: 'Entity exists',
        userMessage: 'Entity exists'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.DB_CANNOT_READ]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.DB_CANNOT_READ,
        httpStatus: common_1.HttpStatus.NOT_FOUND,
        errorMessage: 'Cannot read entity.',
        userMessage: 'Cannot read entity.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND,
        httpStatus: common_1.HttpStatus.NOT_FOUND,
        errorMessage: 'Entity not found',
        userMessage: 'Unable to find the entity with the provided information.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.DB_CANNOT_UPDATE]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.DB_CANNOT_UPDATE,
        httpStatus: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        errorMessage: 'Cannot update selected entity.',
        userMessage: 'Cannot update selected entity.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.DB_NOTHING_TO_UPDATE]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.DB_NOTHING_TO_UPDATE,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Nothing to update.',
        userMessage: 'Nothing to update, enter different data.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.DB_CANNOT_CREATE]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.DB_CANNOT_CREATE,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Entity cannot to be created.',
        userMessage: 'Entity cannot to be created.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.INVALID_CREDENTIALS_EXCEPTION]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.INVALID_CREDENTIALS_EXCEPTION,
        httpStatus: common_1.HttpStatus.NOT_ACCEPTABLE,
        errorMessage: 'Invalid credentials.',
        userMessage: 'Invalid credentials.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.INVALID_OBJECT_ID]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.INVALID_OBJECT_ID,
        httpStatus: common_1.HttpStatus.NOT_ACCEPTABLE,
        errorMessage: 'Invalid ObjectId passed.',
        userMessage: 'Invalid ObjectId passed.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.CANNOT_UPLOAD_IMAGE]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.CANNOT_UPLOAD_IMAGE,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Cannot upload image.',
        userMessage: 'Cannot upload image.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.INVALID_RANGE]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.INVALID_RANGE,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Not in ranger.',
        userMessage: 'Selected range is invalid.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.DB_INCORRECT_MODEL]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.DB_INCORRECT_MODEL,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Incorrenct db model passed.',
        userMessage: 'Cannot interact with database.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.IMAGE_NOT_UPLOADED]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.IMAGE_NOT_UPLOADED,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Image not uploaded. Cannot proceed.',
        userMessage: 'Image not uploaded. Cannot proceed.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.DB_CANNOT_DELETE]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.DB_CANNOT_DELETE,
        httpStatus: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        errorMessage: 'Cannot delete selected entity.',
        userMessage: 'Cannot delete selected entity.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.DUPLICATE_KEY]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.DUPLICATE_KEY,
        httpStatus: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        errorMessage: 'Duplicate key.',
        userMessage: 'Duplicate key.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.VALIDATION_ERROR]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.VALIDATION_ERROR,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Validation error.',
        userMessage: 'Validation error.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.ROLE_ALREADY_PROVIDED]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.ROLE_ALREADY_PROVIDED,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Role already provided.',
        userMessage: 'Role already provided.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.INSUFFICIENT_USER_PASSWORD_LENGTH]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.INSUFFICIENT_USER_PASSWORD_LENGTH,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Insufficient user password length.',
        userMessage: 'Insufficient user password length.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.ROLE_NOT_PROVIDED]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.ROLE_NOT_PROVIDED,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Role not provided.',
        userMessage: 'Role not provided.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.CLOUDINARY_ERROR]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.CLOUDINARY_ERROR,
        httpStatus: common_1.HttpStatus.SERVICE_UNAVAILABLE,
        errorMessage: 'Cloudinary error.',
        userMessage: 'Cloudinary error.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.NO_PAYLOAD_PROVIDED]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.NO_PAYLOAD_PROVIDED,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'No payload provided.',
        userMessage: 'No payload provided.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.INSUFFICIENT_USER_PASSWORD_ENTROPY]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.INSUFFICIENT_USER_PASSWORD_ENTROPY,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Insufficient user password entropy.',
        userMessage: 'Insufficient user password entropy.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.INVALID_ORDER_STATUS]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.INVALID_ORDER_STATUS,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Invalid order status.',
        userMessage: 'Invalid order status.'
    },
    [app_error_type_enum_1.AppErrorTypeEnum.INVALID_DATA]: {
        type: app_error_type_enum_1.AppErrorTypeEnum.INVALID_DATA,
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Invalid data.',
        userMessage: 'Invalid data.'
    }
};
//# sourceMappingURL=app-error-defs.js.map