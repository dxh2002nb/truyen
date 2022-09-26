import { IsString } from 'class-validator';

export class BinhLuanTruyenDto {
  @IsString()
  content: string;

  @IsString()
  slug: string;
}
