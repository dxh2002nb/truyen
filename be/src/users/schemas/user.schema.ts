import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../enums/role.enum';
import { Status } from '../enums/status.enum';
@Schema({ timestamps: true })
export class User {
  _id?: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    minlength: 8,
    maxlength: 32,
    unique: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  slug?: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, default: '' })
  avatar?: string;

  @Prop({ type: String, default: '' })
  reset_password_token?: string;

  @Prop({ type: String, enum: Role, default: Role.User })
  role?: Role;

  @Prop({ type: String, enum: Status, default: Status.Active })
  status?: Status;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
