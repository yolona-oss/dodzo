import { PipeTransform } from '@nestjs/common';
import { OrderStatus } from '../enums/order-status.enum';
export declare class ParseOrderStatusPipe implements PipeTransform<any, OrderStatus> {
    transform(value: any): OrderStatus;
}
