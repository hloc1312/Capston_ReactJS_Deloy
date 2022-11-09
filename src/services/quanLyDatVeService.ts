import { api } from "../constants/api";
import {
  DanhSachGheVaPhim,
  DatVe,
  TaoLichChieu,
} from "../types/quanLyDatVeTypes";
import { TOKEN } from "../utils/config";

export const quanLyDatVeService = {
  getListPhongVe: (maLichChieu: number) => {
    return api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
  },

  datVe: (thongTinDatVe: DatVe) => {
    return api.post<HttpResponse<DatVe>>("QuanLyDatVe/DatVe", thongTinDatVe);
  },

  taoLichChieu: (thongTinLichChieu: TaoLichChieu) => {
    return api.post<HttpResponse<TaoLichChieu>>(
      `QuanLyDatVe/TaoLichChieu`,
      thongTinLichChieu
    );
  },
};
