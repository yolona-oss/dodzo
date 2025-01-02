import { Response } from 'express';
import { UsersService } from "./users.service";
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IJwtPayload } from './../auth/interfaces/jwt-payload.interface';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAllUsers(response: Response): Promise<void>;
    getUsersCount(response: Response): Promise<void>;
    deleteUserById(id: string, response: Response): Promise<void>;
    updateUserById(user: IJwtPayload, data: Partial<UpdateUserDto>, response: Response): Promise<void>;
    changePassword(user: IJwtPayload, data: ChangePasswordDto, response: Response): Promise<void>;
    getUserById(user: IJwtPayload, response: Response): Promise<void>;
}
