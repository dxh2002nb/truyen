import { Type } from 'class-transformer';
import {
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Status } from '../enums/status.enum';
import { Type as TruyenType } from '../enums/type.enum';
import { Order } from './order.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FilterTruyen {
  @IsString()
  theLoai: string;

  @IsString()
  @IsOptional()
  type?: TruyenType;

  @IsString()
  @IsOptional()
  status?: Status;
}

export class LayTruyenTheoTheLoaiDto {
  @IsInt()
  limit: number;

  @IsInt()
  page: number;

  @IsObject()
  @ValidateNested()
  @Type(() => FilterTruyen)
  filter: FilterTruyen;

  @IsObject()
  @ValidateNested()
  @Type(() => Order)
  order: Order;
}
