"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const constants_1 = require("../constants");
if (process.env.NODE_ENV === 'prod') {
    dotenv_1.default.config({
        path: `${process.env.npm_config_local_prefix}/.${process.env.NODE_ENV}.env`
    });
}
else {
    dotenv_1.default.config();
}
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || constants_1.DEFAULT_SERVICE_PORT,
    database: {
        connection_string: process.env.DATABASE_CONNECTION_STRING,
        name: process.env.DATABASE_NAME,
    },
    cloudinary: {
        resolve_name: process.env.CLOUDINARY_CONFIG_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_CONFIG_API_KEY,
        api_secret: process.env.CLOUDINARY_CONFIG_API_SECRET
    },
    jwt: {
        access_token: {
            secret: process.env.JWT_TOKEN_SECRET_KEY,
            sign_options: {
                expires_in: process.env.JWT_TOKEN_OPTION_EXPIRES_IN
            },
        },
        refresh_token: {
            secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
            sign_options: {
                expires_in: process.env.JWT_REFRESH_TOKEN_OPTION_EXPIRES_IN
            },
        }
    },
    static_data_storage: {
        cities_file: `${process.env.npm_config_local_prefix}/${process.env.DATABASE_CITIES_FILE}`
    },
    default_user: {
        name: process.env.DEFAULT_USER_NAME,
        email: process.env.DEFAULT_USER_EMAIL,
        phone: process.env.DEFAULT_USER_PHONE,
        password: process.env.DEFAULT_USER_PASSWORD
    },
    blank_images: {
        user: process.env.PATH_IMAGE_BLANK_USER,
        product: process.env.PATH_IMAGE_BLANK_PRODUCT
    }
});
//# sourceMappingURL=configuration.js.map