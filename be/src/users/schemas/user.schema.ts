import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 32,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 24,
  })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
