import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as slug from 'slug';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findOne(query): Promise<User> {
    return await this.userModel.findOne(query);
  }

  async findById(_id: Types.ObjectId): Promise<User> {
    return await this.userModel.findById(_id);
  }

  async create(user: User): Promise<void> {
    const userHasEmail = await this.findOne({
      email: user.email,
    });
    if (userHasEmail) {
      throw new BadRequestException(
        'Email đã được đăng ký, vui lòng nhập email khác',
      );
    }

    const userHasName = await this.findOne({
      name: user.name,
    });
    if (userHasName) {
      throw new BadRequestException('Tên đã tồn tại, vui lòng nhập tên khác');
    }

    await this.userModel.create({
      ...user,
      slug: slug(user.name),
    });
  }

  async update(_id: Types.ObjectId, part: Partial<User>): Promise<void> {
    const userHasName = await this.findOne({
      name: part.name,
    });
    if (userHasName) {
      throw new BadRequestException('Tên đã tồn tại, vui lòng nhập tên khác');
    }

    await this.userModel.findByIdAndUpdate(_id, {
      ...part,
      slug: slug(part.name),
    });
  }
}
