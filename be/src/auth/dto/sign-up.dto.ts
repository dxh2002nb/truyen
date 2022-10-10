import { Transform, TransformFnParams } from 'class-transformer';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(8)
  @MaxLength(32)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsEmail()
  email: string;
}
