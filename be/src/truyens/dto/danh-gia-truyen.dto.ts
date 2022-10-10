import { IsString, Max, Min, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DanhGiaTruyenDto {
  @IsString()
  slug: string;

  @IsInt()
  @Min(1)
  @Max(5)
  soSao: number;
}
