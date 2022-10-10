import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TheLoai {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  slug: string;
}

export type TheLoaiDocument = TheLoai & Document;

export const TheLoaiSchema = SchemaFactory.createForClass(TheLoai);
