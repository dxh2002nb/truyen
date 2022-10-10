import { Type } from 'class-transformer';
import { IsInt, IsObject, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterBinhLuanTruyen {
  @IsString()
  slug: string;
}

export class LayBinhLuanTruyenDto {
  @IsInt()
  limit: number;

  @IsInt()
  page: number;

  @IsObject()
  @ValidateNested()
  @Type(() => FilterBinhLuanTruyen)
  filter: FilterBinhLuanTruyen;
}
