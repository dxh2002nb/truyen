import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards/at.guard';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import {
  BinhLuanTruyenDto,
  ReplyBinhLuanDto,
} from './dto/binh-luan-truyen.dto';
import { TruyensService } from './truyens.service';

@ApiTags('truyens')
@Controller('truyens')
export class TruyensController {
  constructor(private readonly truyensService: TruyensService) {}

  @Get('danh-sach-the-loai')
  async layDSTheLoai() {
    return await this.truyensService.layDSTheLoai();
  }

  @Get('the-loai')
  async layDSTruyenTheoTheLoai(@Query() query) {
    return await this.truyensService.layDSTruyenTheoTheLoai(
      query.slug,
      query.page,
      query.sortBy,
    );
  }

  @Get('thong-tin-truyen')
  async layThongTinTruyen(@Query() query) {
    return await this.truyensService.layThongTinTruyen(query.slug);
  }

  @Get('danh-sach-chuong')
  async layDanhSachChuong(@Query() query) {
    return await this.truyensService.layDanhSachChuong(query.slug, query.page);
  }

  @Get('binh-luan-truyen')
  async layBinhLuanTruyen(@Query() query) {
    return await this.truyensService.layBinhLuanTruyen(query.slug, query.page);
  }

  @Post('binh-luan-truyen')
  @UseGuards(AtGuard)
  async binhLuanTruyen(@GetUser() user: User, @Body() body: BinhLuanTruyenDto) {
    return await this.truyensService.binhLuanTruyen(
      user,
      body.slug,
      body.content,
    );
  }

  @Post('reply-binh-luan')
  @UseGuards(AtGuard)
  async replyBinhLuan(@GetUser() user: User, @Body() body: ReplyBinhLuanDto) {
    return await this.truyensService.replyBinhLuan(
      user,
      body.slug,
      body._id,
      body.content,
    );
  }

  @Get('doc-truyen')
  async docTruyen(@Query() query) {
    return await this.truyensService.docTruyen(query.slug, query.chuongSo);
  }
}
