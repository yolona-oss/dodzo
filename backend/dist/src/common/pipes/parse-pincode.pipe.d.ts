import { PipeTransform } from '@nestjs/common';
export declare class ParsePincodePipe implements PipeTransform<any, string> {
    transform(value: any): string;
}
