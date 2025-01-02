export declare const REFRESH_TOKEN: {
    cookie: {
        name: string;
        options: {
            sameSite: boolean;
            secure: boolean;
            httpOnly: boolean;
            expires: Date;
        };
    };
};
export declare const RESET_PASSWORD_TOKEN: {
    expiry: string | undefined;
};
export declare const REQUSET_USER_KEY = "user";
