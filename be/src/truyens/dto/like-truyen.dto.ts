import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeTruyenDto {
  @IsString()
  slug: string;
}
