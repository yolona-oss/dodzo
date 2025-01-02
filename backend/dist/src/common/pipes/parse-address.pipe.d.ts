import { PipeTransform } from '@nestjs/common';
export declare class ParseAddressPipe implements PipeTransform<any, string> {
    transform(value: any): string;
}
