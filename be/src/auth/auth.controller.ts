import { GetUser } from 'src/users/decorators/get-user.decorator';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { User } from 'src/users/schemas/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    return await this.authService.signUp(body);
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  async signIn(@GetUser() user: User) {
    const tokens = await this.authService.signIn(user);
    return {
      tokens,
      user: {
        role: user.role,
      },
    };
  }
}
