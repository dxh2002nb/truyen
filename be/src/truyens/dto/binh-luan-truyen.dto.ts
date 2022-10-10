import { Transform, TransformFnParams } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BinhLuanTruyenDto {
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  content: string;

  @IsString()
  slug: string;
}
