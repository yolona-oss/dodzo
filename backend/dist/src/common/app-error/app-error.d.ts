import { AppErrorTypeEnum } from './enums/app-error-type.enum';
import { IErrorMessage } from './interfaces/ierror-message.interface';
interface AppErrorModificationOptions extends Pick<IErrorMessage, 'errorMessage' | 'userMessage'> {
    errorMessage: string;
    userMessage: string;
}
export declare class AppError extends Error {
    errorCode: AppErrorTypeEnum;
    httpStatus: number;
    errorMessage: string;
    userMessage: string;
    constructor(errorCode?: AppErrorTypeEnum, options?: Partial<AppErrorModificationOptions>);
}
export {};
