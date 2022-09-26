import { IsString } from 'class-validator';

export class LikeTruyenDto {
  @IsString()
  slug: string;
}
