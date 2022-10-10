import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
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

  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  async signUp(signUp: SignUpDto): Promise<void> {
    const hash = this.hashPassword(signUp.password);

    await this.usersService.create({
      ...signUp,
      password: hash,
    });
  }

  async signIn(user: User): Promise<any> {
    const payload = {
      name: user.name,
      email: user.email,
      _id: user._id,
    };

    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });

    return { access_token, refresh_token };
  }

  async authenticate(email: string, password: string) {
    const user = await this.usersService.findOne({
      email,
    });
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        return user;
      }
    }
  }
}
