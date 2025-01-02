/// <reference types="cookie-parser" />
import { Request, Response } from 'express';
import { AuthService } from "./auth.service";
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin({ email, password }: SignInDto, response: Response): Promise<void>;
    signup(userDto: SignUpDto, response: Response): Promise<void>;
    refreshAccessToken(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    logout(user: IJwtPayload, request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    logoutAll(): Promise<void>;
    forgotPassword(): Promise<void>;
    resetPassword(): Promise<void>;
}
