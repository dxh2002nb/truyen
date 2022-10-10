import { TheLoai, TheLoaiDocument } from './schemas/the-loai-schema';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chuong, Truyen, TruyenDocument } from './schemas/truyen-schema';
import { User } from 'src/users/schemas/user.schema';
import { LayTruyenTheoTheLoaiDto } from './dto/lay-truyen-theo-the-loai.dto';
import { GetBxhDto } from './dto/get-bxh.dto';
import { LayDSChuongDto } from './dto/lay-danh-sach-chuong.dto';
import { LayBinhLuanTruyenDto } from './dto/lay-binh-truyen-truyen.dto';
import { XoaBinhLuanTruyenDto } from './dto/xoa-binh-luan-truyen.dto';

@Injectable()
export class TruyensService {
  constructor(
    @InjectModel(Truyen.name)
    private readonly truyenModel: Model<TruyenDocument>,

    @InjectModel(TheLoai.name)
    private readonly theLoaiModel: Model<TheLoaiDocument>,
  ) {}

  async layDSTheLoai(): Promise<TheLoai[]> {
    return await this.theLoaiModel.find({});
  }

  async layTruyenTheoTheLoai(body: LayTruyenTheoTheLoaiDto): Promise<any> {
    const { page, limit, filter, order } = body;

    const tongTruyen = await this.truyenModel.find(filter).count();

    const skip = limit * (page - 1);

    let sort;
    switch (order.by) {
      case 'tongLuotDanhGia':
        sort = 'tongLuotDanhGia';
        break;
      case 'diemDanhGiaTB':
        sort = 'diemDanhGiaTB';
        break;
      case 'tongLuotDoc':
        sort = 'tongLuotDoc';
        break;
      case 'tongLike':
        sort = 'tongLike';
        break;
      case 'tongBinhLuan':
        sort = 'tongBinhLuan';
        break;
      case 'chuongMoi':
        sort = 'danhSachChuong.createdAt';
        break;
      default:
        sort = 'danhSachChuong.createdAt';
    }

    const danhSachTruyen = await this.truyenModel.aggregate([
      {
        $match: {
          ...filter,
          theLoai: {
            $in: [filter.theLoai],
          },
        },
      },
      {
        $addFields: {
          tongLuotDoc: {
            $sum: '$danhSachChuong.luotDoc',
          },
          diemDanhGiaTB: {
            $avg: '$danhGia.soSao',
          },
          tongLuotDanhGia: {
            $size: '$danhGia',
          },
          tongLike: {
            $size: '$like',
          },
          tongBinhLuan: {
            $size: '$comment',
          },
        },
      },
      {
        $sort: {
          [sort]: order.type,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'theloais',
          localField: 'theLoai',
          foreignField: 'slug',
          as: 'danhSachTheLoai',
        },
      },
      {
        $project: {
          name: 1,
          author: 1,
          avatar: 1,
          slug: 1,
          status: 1,
          danhSachTheLoai: 1,
          type: 1,
          tongChuong: {
            $size: '$danhSachChuong',
          },
        },
      },
    ]);

    return {
      tongTruyen,
      danhSachTruyen,
    };
  }

  async getBxh(body: GetBxhDto): Promise<any> {
    const { page, limit, order, filter } = body;

    const tongTruyen = await this.truyenModel.find(filter).count();

    const skip = limit * (page - 1);

    let sort;
    switch (order.by) {
      case 'tongLuotDanhGia':
        sort = 'tongLuotDanhGia';
        break;
      case 'diemDanhGiaTB':
        sort = 'diemDanhGiaTB';
        break;
      case 'tongLike':
        sort = 'tongLike';
        break;
      case 'tongBinhLuan':
        sort = 'tongBinhLuan';
        break;
      case 'tongLuotDoc':
        sort = 'tongLuotDoc';
        break;
      default:
        sort = 'tongLuotDoc';
    }

    const danhSachTruyen = await this.truyenModel.aggregate([
      {
        $match: filter,
      },
      {
        $addFields: {
          tongLuotDoc: {
            $sum: '$danhSachChuong.luotDoc',
          },
          diemDanhGiaTB: {
            $avg: '$danhGia.soSao',
          },
          tongLuotDanhGia: {
            $size: '$danhGia',
          },
          tongLike: {
            $size: '$like',
          },
          tongBinhLuan: {
            $size: '$comment',
          },
        },
      },
      {
        $sort: {
          [sort]: order.type,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'theloais',
          localField: 'theLoai',
          foreignField: 'slug',
          as: 'danhSachTheLoai',
        },
      },
      {
        $project: {
          name: 1,
          author: 1,
          avatar: 1,
          slug: 1,
          status: 1,
          danhSachTheLoai: 1,
          type: 1,
          tongChuong: {
            $size: '$danhSachChuong',
          },
        },
      },
    ]);

    return {
      tongTruyen,
      danhSachTruyen,
    };
  }

  async layThongTinTruyen(slug: string): Promise<any> {
    const result = await this.truyenModel.aggregate([
      {
        $match: {
          slug,
        },
      },
      {
        $lookup: {
          from: 'theloais',
          localField: 'theLoai',
          foreignField: 'slug',
          as: 'danhSachTheLoai',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'publisher',
          foreignField: '_id',
          as: 'publisher',
        },
      },
      {
        $project: {
          name: 1,
          author: 1,
          avatar: 1,
          slug: 1,
          description: 1,
          status: 1,
          type: 1,
          danhSachTheLoai: 1,
          'publisher.name': 1,
          'publisher.avatar': 1,
          'publisher.slug': 1,
          tongChu: {
            $sum: '$danhSachChuong.soChu',
          },
          tongChuong: {
            $size: '$danhSachChuong',
          },
          tongLuotDoc: {
            $sum: '$danhSachChuong.luotDoc',
          },
          diemDanhGiaTB: {
            $avg: '$danhGia.soSao',
          },
          tongLuotDanhGia: {
            $size: '$danhGia',
          },
          tongLike: {
            $size: '$like',
          },
          tongNhanVat: {
            $size: '$figure',
          },
        },
      },
    ]);

    const thongTinTruyen = result[0];

    return thongTinTruyen;
  }

  async docTruyen(slug: string, chuongSo: number): Promise<Chuong> {
    const result = await this.truyenModel.aggregate([
      {
        $match: {
          slug,
        },
      },
      {
        $project: {
          'danhSachChuong.content': 1,
          'danhSachChuong.name': 1,
          'danhSachChuong.soChu': 1,
          'danhSachChuong.luotDoc': 1,
          'danhSachChuong.chuongSo': 1,
          'danhSachChuong.createdAt': 1,
        },
      },
    ]);

    const truyen = result[0];

    const chuong = truyen.danhSachChuong.find(
      (chuong) => chuong.chuongSo === chuongSo,
    );

    if (chuong) {
      chuong.luotDoc += 1;
      await this.truyenModel.findOneAndUpdate(
        {
          slug,
          'danhSachChuong.chuongSo': chuongSo,
        },
        {
          $set: {
            'danhSachChuong.$.luotDoc': chuong.luotDoc,
          },
        },
      );
    }
    return chuong;
  }

  async layDanhSachChuong(body: LayDSChuongDto): Promise<any> {
    const { page, limit, filter } = body;
    const skip = limit * (page - 1);
    const truyen = await this.truyenModel.findOne(
      {
        slug: filter.slug,
      },
      {
        name: 1,
        slug: 1,
        'danhSachChuong.name': 1,
        'danhSachChuong.chuongSo': 1,
        'danhSachChuong.createdAt': 1,
      },
    );

    const danhSachChuong = truyen.danhSachChuong.slice(skip, skip + limit);

    return {
      name: truyen.name,
      slug: truyen.slug,
      tongChuong: truyen.danhSachChuong.length,
      danhSachChuong,
    };
  }

  async layBinhLuanTruyen(body: LayBinhLuanTruyenDto): Promise<any> {
    const { page, limit, filter } = body;
    const skip = limit * (page - 1);

    const result = await this.truyenModel.aggregate([
      {
        $match: {
          slug: filter.slug,
        },
      },
      {
        $unwind: '$comment',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'comment.who',
          foreignField: '_id',
          as: 'comment.who',
        },
      },
      {
        $unwind: {
          path: '$comment.who',
        },
      },
      {
        $group: {
          _id: '$_id',
          comment: {
            $push: '$comment',
          },
        },
      },
      {
        $project: {
          'comment.who.name': 1,
          'comment.who._id': 1,
          'comment.who.slug': 1,
          'comment.who.avatar': 1,
          'comment._id': 1,
          'comment.content': 1,
          'comment.createdAt': 1,
          'comment.like': 1,
        },
      },
    ]);

    const truyen = result[0];
    if (!truyen) {
      throw new NotFoundException();
    }
    const binhLuan = truyen.comment.slice(skip, skip + limit);

    truyen.comment.forEach((comment) => {
      comment.tongLike = comment.like.length;
      delete comment.like;
    });

    return {
      tongBinhLuan: truyen.comment.length,
      binhLuan,
    };
  }

  async binhLuanTruyen(user: User, slug: string, content: string) {
    const truyen = await this.truyenModel.findOne({
      slug,
    });
    truyen.comment.push({
      content,
      who: user._id,
    });
    await truyen.save();
  }

  async likeTruyen(user: User, slug: string) {
    const truyen = await this.truyenModel.findOne({
      slug,
    });
    let i;
    truyen.like.forEach((like, index) => {
      if (like.who.valueOf() === user._id.valueOf()) {
        i = index;
      }
    });
    if (i || i === 0) {
      truyen.like.splice(i, 1);
    } else {
      truyen.like.push({
        who: user._id,
      });
    }
    await truyen.save();
  }

  async danhGiaTruyen(user: User, slug: string, soSao: number) {
    const truyen = await this.truyenModel.findOne({
      slug,
    });
    let i;
    truyen.danhGia.forEach((danhGia, index) => {
      if (danhGia.who.valueOf() === user._id.valueOf()) {
        i = index;
      }
    });
    if (i || i === 0) {
      truyen.danhGia[i].soSao = soSao;
    } else {
      truyen.danhGia.push({
        who: user._id,
        soSao,
      });
    }
    await truyen.save();
  }

  async likeBinhLuan(user: User, slug: string, _id: Types.ObjectId) {
    const truyen = await this.truyenModel.findOne({
      slug,
    });
    const comment = truyen.comment.find((comment) => {
      return comment._id.valueOf() === _id;
    });
    let i;
    comment.like.forEach((like, index) => {
      if (like.who.valueOf() === user._id.valueOf()) {
        i = index;
      }
    });
    if (i || i === 0) {
      comment.like.splice(i, 1);
    } else {
      comment.like.push({
        who: user._id,
      });
    }
    await truyen.save();
  }

  async timKiem(keyword: string, page: number, limit: number) {
    const tongTruyen = await this.truyenModel
      .find({
        name: {
          $regex: keyword,
          $options: 'i',
        },
      })
      .count();

    const skip = limit * (page - 1);

    const danhSachTruyen = await this.truyenModel.aggregate([
      {
        $match: {
          name: {
            $regex: keyword,
            $options: 'i',
          },
        },
      },
      {
        $addFields: {
          tongLuotDoc: {
            $sum: '$danhSachChuong.luotDoc',
          },
        },
      },
      {
        $sort: {
          tongLuotDoc: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'theloais',
          localField: 'theLoai',
          foreignField: 'slug',
          as: 'danhSachTheLoai',
        },
      },
      {
        $project: {
          name: 1,
          author: 1,
          avatar: 1,
          slug: 1,
          status: 1,
          danhSachTheLoai: 1,
          type: 1,
          tongChuong: {
            $size: '$danhSachChuong',
          },
        },
      },
    ]);

    return {
      tongTruyen,
      danhSachTruyen,
    };
  }

  async xoaBinhLuanTruyen(body: XoaBinhLuanTruyenDto, user: User) {
    const truyen = await this.truyenModel.findOne({
      slug: body.slug,
    });
    const index = truyen.comment.findIndex(
      (comment) =>
        comment._id.valueOf() === body._id &&
        comment.who.valueOf() === user._id.valueOf(),
    );
    if (index !== -1) {
      truyen.comment.splice(index, 1);
    } else {
      throw new BadRequestException();
    }
    await truyen.save();
  }
}
