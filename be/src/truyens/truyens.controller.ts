import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards/at.guard';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { BinhLuanTruyenDto } from './dto/binh-luan-truyen.dto';
import { DanhGiaTruyenDto } from './dto/danh-gia-truyen.dto';
import { GetBxhDto } from './dto/get-bxh.dto';
import { LayBinhLuanTruyenDto } from './dto/lay-binh-truyen-truyen.dto';
import { LayDSChuongDto } from './dto/lay-danh-sach-chuong.dto';
import { LayTruyenTheoTheLoaiDto } from './dto/lay-truyen-theo-the-loai.dto';
import { LikeBinhLuanDto } from './dto/like-binh-luan.dto';
import { LikeTruyenDto } from './dto/like-truyen.dto';
import { XoaBinhLuanTruyenDto } from './dto/xoa-binh-luan-truyen.dto';
import { TruyensService } from './truyens.service';

@ApiTags('truyens')
@Controller('truyens')
export class TruyensController {
  constructor(private readonly truyensService: TruyensService) {}

  @Get('danh-sach-the-loai')
  async layDSTheLoai() {
    return await this.truyensService.layDSTheLoai();
  }

  @Post('truyen-theo-the-loai')
  async layTruyenTheoTheLoai(@Body() body: LayTruyenTheoTheLoaiDto) {
    return await this.truyensService.layTruyenTheoTheLoai(body);
  }

  @Get('thong-tin-truyen')
  async layThongTinTruyen(@Query() query) {
    return await this.truyensService.layThongTinTruyen(query.slug);
  }

  @Post('danh-sach-chuong')
  async layDanhSachChuong(@Body() body: LayDSChuongDto) {
    return await this.truyensService.layDanhSachChuong(body);
  }

  @Post('lay-binh-luan-truyen')
  async layBinhLuanTruyen(@Body() body: LayBinhLuanTruyenDto) {
    return await this.truyensService.layBinhLuanTruyen(body);
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

  @Delete('binh-luan-truyen')
  @UseGuards(AtGuard)
  async xoaBinhLuanTruyen(
    @GetUser() user: User,
    @Body() body: XoaBinhLuanTruyenDto,
  ) {
    return await this.truyensService.xoaBinhLuanTruyen(body, user);
  }

  @Post('like-binh-luan')
  @UseGuards(AtGuard)
  async likeBinhLuan(@GetUser() user: User, @Body() body: LikeBinhLuanDto) {
    return await this.truyensService.likeBinhLuan(user, body.slug, body._id);
  }

  @Post('like-truyen')
  @UseGuards(AtGuard)
  async likeTruyen(@GetUser() user: User, @Body() body: LikeTruyenDto) {
    return await this.truyensService.likeTruyen(user, body.slug);
  }

  @Post('danh-gia-truyen')
  @UseGuards(AtGuard)
  async danhGiaTruyen(@GetUser() user: User, @Body() body: DanhGiaTruyenDto) {
    return await this.truyensService.danhGiaTruyen(user, body.slug, body.soSao);
  }

  @Get('doc-truyen')
  async docTruyen(@Query() query) {
    return await this.truyensService.docTruyen(query.slug, +query.chuongSo);
  }

  @Post('bxh')
  async getBxh(@Body() body: GetBxhDto) {
    return await this.truyensService.getBxh(body);
  }

  @Get('tim-kiem')
  async timKiem(@Query() query) {
    return await this.truyensService.timKiem(
      query.keyword,
      +query.page,
      +query.limit,
    );
  }
}
