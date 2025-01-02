import { PipeTransform } from '@nestjs/common';
export declare class ParsePaymentIdPipe implements PipeTransform<any, string> {
    transform(value: any): string;
}
