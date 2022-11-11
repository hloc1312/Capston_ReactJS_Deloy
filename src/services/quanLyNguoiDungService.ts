import { api } from "../constants/api";
import {
  CapNhatNguoiDung,
  CapNhatThongTinNguoiDung,
  DanhSachNguoiDung,
  GetThongTinNguoiDung,
  LoaiNguoiDung,
  ThemNguoiDung,
  ThongTinNguoiDung,
  User,
  UserLogin,
  UserRegister,
} from "../types/quanLyNguoiDungTypes";
import { GROUPID } from "../utils/config";

export const quanLyNguoiDungService = {
  getListUser: () => {
    return api.get<HttpResponse<User[]>>(
      `QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${GROUPID}`
    );
  },

  dangNhap: (thongTinDangNhap: UserLogin) => {
    return api.post<HttpResponse<User>>(
      "QuanLyNguoiDung/DangNhap",
      thongTinDangNhap
    );
  },

  getThongTinNguoiDung: () => {
    return api.post<HttpResponse<GetThongTinNguoiDung>>(
      "QuanLyNguoiDung/ThongTinTaiKhoan"
    );
  },
  dangKy: (thongTinNguoiDung: UserRegister) => {
    return api.post<HttpResponse<UserRegister>>(
      `QuanLyNguoiDung/DangKy`,
      thongTinNguoiDung
    );
  },

  postLayThongTinNguoiDung: (taiKhoan: string) => {
    return api.post<HttpResponse<ThongTinNguoiDung>>(
      `QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
    );
  },

  capNhatThongTinNguoiDung: (thongTinNguoiDung: CapNhatThongTinNguoiDung) => {
    return api.put<HttpResponse<CapNhatThongTinNguoiDung>>(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      thongTinNguoiDung
    );
  },

  layDanhSachNguoiDung: (timKiem: string = "") => {
    if (timKiem.trim() === "") {
      return api.get<HttpResponse<DanhSachNguoiDung[]>>(
        `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
      );
    }
    return api.get<HttpResponse<DanhSachNguoiDung[]>>(
      `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${timKiem}`
    );
  },

  xoaNguoiDung: (taiKhoan: string) => {
    return api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  },

  layDanhSachLoaiNguoiDung: () => {
    return api.get<HttpResponse<LoaiNguoiDung[]>>(
      "QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"
    );
  },

  themNguoiDung: (themNguoiDung: ThemNguoiDung) => {
    return api.post<HttpResponse<ThemNguoiDung>>(
      `QuanLyNguoiDung/ThemNguoiDung`,
      themNguoiDung
    );
  },

  capNhatThongTinNguoiDungAdmin: (thongTinNguoiDung: CapNhatNguoiDung) => {
    return api.post<HttpResponse<CapNhatNguoiDung>>(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      thongTinNguoiDung
    );
  },
};
