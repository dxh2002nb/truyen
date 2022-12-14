import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class LikeBinhLuanDto {
  @IsString()
  slug: string;

  @IsNotEmpty()
  _id: Types.ObjectId;
}
