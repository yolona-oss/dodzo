import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class AllExeptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any;
}
