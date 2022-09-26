import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { TheLoai, TheLoaiSchema } from './schemas/the-loai-schema';
import { Truyen, TruyenSchema } from './schemas/truyen-schema';
import { TruyensController } from './truyens.controller';
import { TruyensService } from './truyens.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Truyen.name, schema: TruyenSchema },
      {
        name: TheLoai.name,
        schema: TheLoaiSchema,
      },
    ]),
    UsersModule,
  ],
  controllers: [TruyensController],
  providers: [TruyensService],
})
export class TruyensModule {}
