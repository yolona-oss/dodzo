/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { IAccessToken } from './interfaces/access-token.interface';
import { AuthResponseDto } from './dto/auth-response.dto';
import { SignUpDto } from './dto/sign-up.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly usersService;
    private readonly configService;
    constructor(jwtService: JwtService, usersService: UsersService, configService: ConfigService);
    signin(email: string, password: string): Promise<AuthResponseDto>;
    signup(userInfo: SignUpDto): Promise<AuthResponseDto>;
    logout(userId: string, cookies: any): Promise<void>;
    private generateAcessToken;
    private generateRefreshToken;
    private generateTokens;
    generageResetToken(userId: string): Promise<string>;
    refreshAccessToken(cookies: any): Promise<IAccessToken>;
    validateUser(email: string, pass: string): Promise<import("mongoose").Document<unknown, {}, import("../users/schemes/users.schema").UserDocument> & import("../users/schemes/users.schema").UserEntity & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
}
