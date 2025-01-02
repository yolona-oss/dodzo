export const enum AppErrorTypeEnum {
    BAD_REQUEST = 400,

    DB_CANNOT_READ,
    DB_CANNOT_CREATE,
    DB_CANNOT_DELETE,
    DB_CANNOT_UPDATE,

    DB_ENTITY_EXISTS,
    DB_ENTITY_NOT_FOUND,

    DB_NOTHING_TO_UPDATE,

    INVALID_DATA,
    INVALID_OBJECT_ID,
    INVALID_RANGE,
    DUPLICATE_KEY,
    VALIDATION_ERROR,
    INVALID_ORDER_STATUS,

    DB_INCORRECT_MODEL,

    CANNOT_UPLOAD_IMAGE,
    IMAGE_NOT_UPLOADED,
    CLOUDINARY_ERROR,

    ROLE_ALREADY_PROVIDED,
    INSUFFICIENT_USER_PASSWORD_LENGTH,
    INSUFFICIENT_USER_PASSWORD_ENTROPY,
    INVALID_CREDENTIALS_EXCEPTION,
    ROLE_NOT_PROVIDED,

    NO_PAYLOAD_PROVIDED, 
}
