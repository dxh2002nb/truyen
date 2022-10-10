import { Type } from 'class-transformer';
import { IsInt, IsObject, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterDSChuong {
  @IsString()
  slug: string;
}

export class LayDSChuongDto {
  @IsInt()
  limit: number;

  @IsInt()
  page: number;

  @IsObject()
  @ValidateNested()
  @Type(() => FilterDSChuong)
  filter: FilterDSChuong;
}
