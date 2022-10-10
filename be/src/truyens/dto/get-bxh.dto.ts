import { Type } from 'class-transformer';
import { IsInt, IsObject, ValidateNested } from 'class-validator';
import { Order } from './order.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FilterBxh {}

export class GetBxhDto {
  @IsInt()
  limit: number;

  @IsInt()
  page: number;

  @IsObject()
  @ValidateNested()
  @Type(() => FilterBxh)
  filter: FilterBxh;

  @IsObject()
  @ValidateNested()
  @Type(() => Order)
  order: Order;
}
