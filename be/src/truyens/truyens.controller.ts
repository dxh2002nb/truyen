import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards/at.guard';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { BinhLuanTruyenDto } from './dto/binh-luan-truyen.dto';
import { DanhGiaTruyenDto } from './dto/danh-gia-truyen.dto';
import { LikeBinhLuanDto } from './dto/like-binh-luan.dto';
import { LikeTruyenDto } from './dto/like-truyen.dto';
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
    return await this.truyensService.docTruyen(query.slug, query.chuongSo);
  }

  @Get('bxh')
  async getBxh(@Query() query) {
    return await this.truyensService.getBxh(query.page, query.sortBy);
  }

  @Get('tim-kiem')
  async timKiem(@Query() query) {
    return await this.truyensService.timKiem(query.keyword, query.page);
  }
}
