import { api } from "../constants/api";
import {
  Banner,
  GetThongTinPhim,
  Phim,
  ThemPhimUploadHinh,
} from "../types/quanLyPhimTypes";
import { ThongTinPhim } from "../types/thongTinPhimType";
import { GROUPID } from "../utils/config";

export const quanLyPhimService = {
  getListBanner: () => {
    return api.get<HttpResponse<Banner[]>>("QuanLyPhim/LayDanhSachBanner");
  },

  getListMovie: (tenPhim = "") => {
    if (tenPhim.trim() !== "") {
      return api.get<HttpResponse<Phim[]>>(
        `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`
      );
    }
    return api.get<HttpResponse<Phim[]>>(
      `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`
    );
  },

  themPhimUploadHinh: (formData: FormData) => {
    return api.post<HttpResponse<ThemPhimUploadHinh>>(
      `QuanLyPhim/ThemPhimUploadHinh`,
      formData
    );
  },

  getThongTinPhim: (maPhim: number) => {
    return api.get<HttpResponse<GetThongTinPhim>>(
      `QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`
    );
  },

  capNhatPhimUpload: (formData: FormData) => {
    return api.post<HttpResponse<GetThongTinPhim>>(
      `QuanLyPhim/CapNhatPhimUpload`,
      formData
    );
  },

  xoaPhim: (maPhim: number) => {
    return api.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  },
};
