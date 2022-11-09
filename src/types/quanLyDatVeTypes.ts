export interface DanhSachGheVaPhim {
  thongTinPhim: {
    maLichChieu: number;
    tenCumRap: string;
    tenRap: string;
    diaChi: string;
    tenPhim: string;
    hinhAnh: string;
    ngayChieu: string;
    gioChieu: string;
  };
  danhSachGhe: DanhSachGheType[];
}

export interface DanhSachGheType {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: string;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: string;
}

export interface DanhSachGhe {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: string;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: string;
}

export interface DatVe {
  maLichChieu: number;
  danhSachVe: DanhSachVeType[];
}

export interface DanhSachVeType {
  maGhe: number;
  giaVe: number;
}
export interface TaoLichChieu {
  giaVe: number;
  maPhim: number;
  maRap: string;
  ngayChieuGioChieu: string;
}
