import dotenv from 'dotenv'
import { DEFAULT_SERVICE_PORT } from '../constants';

if (process.env.NODE_ENV === 'prod') {
    dotenv.config({
        path: `${process.env.npm_config_local_prefix}/.${process.env.NODE_ENV}.env`
    })
} else {
    dotenv.config()
}

export interface ConfigSchema {
    port: number,
    database: {
        connection_string: string,
        name: string;
    },
    jwt: {
        access_token: {
            secret: string,
            sign_options: {
                expires_in: string
            }
        },
        refresh_token: {
            secret: string,
            sign_options: {
                expires_in: string
            }
        }
    },
    default_user: {
        name: string,
        email: string,
        phone: string,
        password: string
    },
    blank_images: {
        user: string,
        product: string
    }
}

export default (): ConfigSchema => ({
    port: parseInt(<any>process.env.PORT, 10) || DEFAULT_SERVICE_PORT,
    database: {
        connection_string: <string>process.env.DATABASE_CONNECTION_STRING,
        name: <string>process.env.DATABASE_NAME,
    },
    jwt: {
        access_token: {
            secret: <string>process.env.JWT_TOKEN_SECRET_KEY,
            sign_options: {
                expires_in: <string>process.env.JWT_TOKEN_OPTION_EXPIRES_IN
            },
        },
        refresh_token: {
            secret: <string>process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
            sign_options: {
                expires_in: <string>process.env.JWT_REFRESH_TOKEN_OPTION_EXPIRES_IN
            },
        }
    },
    default_user: {
        name: <string>process.env.DEFAULT_USER_NAME,
        email: <string>process.env.DEFAULT_USER_EMAIL,
        phone: <string>process.env.DEFAULT_USER_PHONE,
        password: <string>process.env.DEFAULT_USER_PASSWORD
    },
    blank_images: {
        user: <string>process.env.PATH_IMAGE_BLANK_USER,
        product: <string>process.env.PATH_IMAGE_BLANK_PRODUCT
    }
})
