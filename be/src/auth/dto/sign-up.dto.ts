import { Transform, TransformFnParams } from 'class-transformer';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsString({
    message: 'Vui lòng nhập đầy đủ',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(8, {
    message: 'Tên tối thiểu 8 kí tự',
  })
  @MaxLength(32, {
    message: 'Tên tối đa 32 kí tự',
  })
  name: string;

  @IsString({
    message: 'Vui lòng nhập đầy đủ',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(6, {
    message: 'Tên tài khoản tối thiểu 6 kí tự',
  })
  @MaxLength(24, {
    message: 'Tên tài khoản tối đa 24 kí tự',
  })
  username: string;

  @IsString({
    message: 'Vui lòng nhập đầy đủ',
  })
  @MinLength(8, {
    message: 'Mật khẩu tối thiểu 8 kí tự',
  })
  @MaxLength(32, {
    message: 'Mật khẩu tối đa 32 kí tự',
  })
  password: string;

  @IsEmail(
    {},
    {
      message: 'Vui lòng nhập đúng định dạng email',
    },
  )
  email: string;
}
