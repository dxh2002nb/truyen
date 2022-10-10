import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class XoaBinhLuanTruyenDto {
  @IsString()
  slug: string;

  @IsNotEmpty()
  _id: Types.ObjectId;
}
