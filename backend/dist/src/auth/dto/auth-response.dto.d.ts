import { AuthJwtTokens } from "auth/interfaces/auth-jwt-tokens.interface";
import { UserObjectResponseDto } from "./../../users/dto/user-object-response.dto";
export interface AuthResponseDto extends AuthJwtTokens {
    readonly user: UserObjectResponseDto;
}
export declare function TransformUser(user: any): {
    id: any;
    name: any;
    phone: any;
    email: any;
    roles: any;
};
