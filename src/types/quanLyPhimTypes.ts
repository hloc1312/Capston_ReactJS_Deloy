export interface Banner {
  maBanner: number;
  maPhim: number;
  hinhAnh: string;
}

export interface Phim {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

export interface ThemPhimUploadHinh {
  maPhim?: number;
  maNhom?: string;
  tenPhim?: string;
  trailer?: string;
  moTa?: string;
  ngayKhoiChieu?: string;
  dangChieu?: boolean;
  sapChieu?: boolean;
  hot?: boolean;
  danhGia?: number;
  hinhAnh?: {};
}

export interface GetThongTinPhim {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
  ngayKhoiChieu: string;
  danhGia: number;
}

export interface PostThongTinPhim {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
  ngayKhoiChieu: string;
  danhGia: number;
}
