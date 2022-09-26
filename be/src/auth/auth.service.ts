import { JwtService } from '@nestjs/jwt';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<string> {
    const userWithName = await this.usersService.findOne(
      'name',
      signUpDto.name,
    );
    if (userWithName) {
      throw new BadRequestException('Tên đã tồn tại, vui lòng nhập tên khác');
    }

    const userWithUsername = await this.usersService.findOne(
      'username',
      signUpDto.username,
    );
    if (userWithUsername) {
      throw new BadRequestException(
        'Tên tài khoản đã tồn tại, vui lòng nhập tên khác',
      );
    }

    const userWithEmail = await this.usersService.findOne(
      'email',
      signUpDto.email,
    );
    if (userWithEmail) {
      throw new BadRequestException(
        'Email đã được đăng ký, vui lòng nhập email khác',
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(signUpDto.password, salt);

    await this.usersService.create({
      ...signUpDto,
      password: hash,
    });

    return 'Tạo tài khoản thành công';
  }

  async signIn(user: User): Promise<any> {
    const payload = {
      name: user.name,
      username: user.username,
      email: user.email,
      _id: user._id,
    };

    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async authenticate(username: string, password: string) {
    const user = await this.usersService.findOne('username', username);
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        return user;
      }
    }
  }
}
