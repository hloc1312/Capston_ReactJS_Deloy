import { GROUPID } from "../utils/config";

export interface User {
  taiKhoan?: string;
  hoTen?: string;
  email?: string;
  soDT?: string;
  maNhom?: string;
  maLoaiNguoiDung?: string;
  accessToken?: string;
}

export interface UserLogin {
  taiKhoan: string;
  matKhau: string;
}

export interface GetThongTinNguoiDung {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  loaiNguoiDung: {
    maLoaiNguoiDung: string;
    tenLoai: string;
  };
  thongTinDatVe: ThongTinDatVeType[];
}

interface ThongTinDatVeType {
  danhSachGhe: DanhSachGheType[];
  maVe: number;
  ngayDat: string;
  tenPhim: string;
  hinhAnh: string;
  giaVe: number;
  thoiLuongPhim: number;
}

interface DanhSachGheType {
  maHeThongRap: string;
  tenHeThongRap: string;
  maCumRap: string;
  tenCumRap: string;
  maRap: number;
  tenRap: string;
  maGhe: number;
  tenGhe: string;
}

export interface UserRegister {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  hoTen: string;
}

export interface ThongTinNguoiDung {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  loaiNguoiDung: {
    maLoaiNguoiDung: string;
    tenLoai: string;
  };
}

export interface CapNhatThongTinNguoiDung {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
}

export interface DanhSachNguoiDung {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  matKhau: string;
  maLoaiNguoiDung: string;
}

export interface LoaiNguoiDung {
  maLoaiNguoiDung: string;
  tenLoai: string;
}
export interface ThemNguoiDung {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
}
export interface CapNhatNguoiDung {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
}
