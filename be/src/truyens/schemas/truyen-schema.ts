import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, SchemaTypes } from 'mongoose';
import { Status } from '../enums/status.enum';
import { Type } from '../enums/type.enum';

@Schema({ timestamps: true })
export class Like {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  who: Types.ObjectId;
}
export const LikeSchema = SchemaFactory.createForClass(Like);

@Schema({ timestamps: true })
export class Figure {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String })
  title?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  avatar?: string;
}
export const FigureSchema = SchemaFactory.createForClass(Figure);

@Schema({ timestamps: true })
export class DanhGia {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  who: Types.ObjectId;

  @Prop({ type: Number, required: true, max: 5, min: 1 })
  soSao: number;
}
export const DanhGiaSchema = SchemaFactory.createForClass(DanhGia);

@Schema()
export class Author {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  slug: string;
}
export const AuthorSchema = SchemaFactory.createForClass(Author);

@Schema({ timestamps: true })
export class Comment {
  _id?: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  who: Types.ObjectId;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: [LikeSchema], default: [] })
  like?: Like[];
}
export const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: true })
export class Chuong {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true, unique: true })
  chuongSo: number;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Number, required: true, default: 0 })
  luotDoc?: number;

  @Prop({ type: Number, required: true })
  soChu: number;
}
export const ChuongSchema = SchemaFactory.createForClass(Chuong);

@Schema({ timestamps: true })
export class Truyen {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({
    type: AuthorSchema,
    required: true,
  })
  author: Author;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  publisher: Types.ObjectId;

  @Prop({ type: String, required: true })
  avatar: string;

  @Prop({ type: String, required: true, unique: true })
  slug: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [String], required: true })
  theLoai: string[];

  @Prop({ type: [ChuongSchema], default: [] })
  danhSachChuong?: Chuong[];

  @Prop({ type: [CommentSchema], default: [] })
  comment?: Comment[];

  @Prop({ type: [DanhGiaSchema], default: [] })
  danhGia?: DanhGia[];

  @Prop({ type: [LikeSchema], default: [] })
  like?: Like[];

  @Prop({ type: [FigureSchema], default: [] })
  figure?: Figure[];

  @Prop({ type: String, enum: Type, required: true })
  type: Type;

  @Prop({ type: String, enum: Status, required: true, default: Status.DangRa })
  status?: Status;
}
export type TruyenDocument = Truyen & Document;
export const TruyenSchema = SchemaFactory.createForClass(Truyen);
