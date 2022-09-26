import { IsString, Max, Min, IsInt } from 'class-validator';

export class DanhGiaTruyenDto {
  @IsString()
  slug: string;

  @IsInt()
  @Min(1)
  @Max(5)
  soSao: number;
}
