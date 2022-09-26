import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class LikeBinhLuanDto {
  @IsString()
  slug: string;

  @IsNotEmpty()
  _id: Types.ObjectId;
}
