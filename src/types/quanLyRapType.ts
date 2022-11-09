// export interface LichChieuHeThongRap {
//   lstCumRap: [
//     {
//       danhSachPhim: [
//         {
//           lstLichChieuTheoPhim: [
//             {
//               maLichChieu: number;
//               maRap: string;
//               tenRap: string;
//               ngayChieuGioChieu: string;
//               giaVe: number;
//             }
//           ];
//           maPhim: number;
//           tenPhim: string;
//           hinhAnh: string;
//           hot: boolean;
//           dangChieu: boolean;
//           sapChieu: boolean;
//         }
//       ];
//       maCumRap: string;
//       tenCumRap: string;
//       hinhAnh: string;
//       diaChi: string;
//     }
//   ];
//   maHeThongRap: string;
//   tenHeThongRap: string;
//   logo: string;
//   mahom: string;
// }
export interface LichChieuHeThongRap {
  lstCumRap: DanhSachCumRapType[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  mahom: string;
}

interface DanhSachCumRapType {
  danhSachPhim: DanhSachPhimType[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
}

interface DanhSachPhimType {
  lstLichChieuTheoPhim: LichChieuTheoPhimType[];
  maPhim: number;
  tenPhim: string;
  hinhAnh: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

interface LichChieuTheoPhimType {
  maLichChieu: number;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: string;
  giaVe: number;
}

export interface HeThongRap {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string;
}

export interface LichChieuTheoPhim {
  heThongRapChieu: HeThongRapChieuType[];
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

interface HeThongRapChieuType {
  cumRapChieu: CumRapChieuType[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
}

interface CumRapChieuType {
  lichChieuPhim: LichChieuPhimType[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
}

interface LichChieuPhimType {
  maLichChieu: string;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: string;
  giaVe: number;
  thoiLuong: number;
}

export interface ThongTinCumRap {
  maCumRap: string;
  tenCumRap: string;
  diaChi: string;
  danhSachRap: DanhSachRap[];
}
interface DanhSachRap {
  maRap: number;
  tenRap: string;
}
