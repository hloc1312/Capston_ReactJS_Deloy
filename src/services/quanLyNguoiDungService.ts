import { api } from "../constants/api";
import {
  GetThongTinNguoiDung,
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
};
