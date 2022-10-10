import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @IsString()
  by: string;

  @IsInt()
  type: 1 | -1;
}
