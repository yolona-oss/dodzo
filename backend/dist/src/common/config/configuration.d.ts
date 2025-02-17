export interface ConfigSchema {
    port: number;
    database: {
        connection_string: string;
        name: string;
    };
    jwt: {
        access_token: {
            secret: string;
            sign_options: {
                expires_in: string;
            };
        };
        refresh_token: {
            secret: string;
            sign_options: {
                expires_in: string;
            };
        };
    };
    default_user: {
        name: string;
        email: string;
        phone: string;
        password: string;
    };
    blank_images: {
        user: string;
        product: string;
    };
}
declare const _default: () => ConfigSchema;
export default _default;
