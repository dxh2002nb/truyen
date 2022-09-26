import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class BinhLuanTruyenDto {
  @IsString()
  content: string;

  @IsString()
  slug: string;
}

export class ReplyBinhLuanDto {
  @IsString()
  content: string;

  @IsString()
  slug: string;

  @IsNotEmpty()
  _id: Types.ObjectId;
}
