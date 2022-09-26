import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findOne(key: string, value: any): Promise<User> {
    return await this.userModel.findOne({
      [key]: value,
    });
  }

  async create(user) {
    await this.userModel.create(user);
  }
}
