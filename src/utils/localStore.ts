import { ThongTinPhim } from "../types/thongTinPhimType";

const thongTinPhim: ThongTinPhim = {
  ngayCongChieu: "2022.11.03",
  daoDien: "Adam Wingard",
  dienVien: "Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown",
  theLoai: "hành động, giả tưởng, ly kỳ, thần thoại",
  dinhDang: "2D/Digital",
  quocGiaSX: "Mỹ",
  noiDung:
    "Bộ phim sẽ được phát sóng dự kiến vào tháng 10/2022 Với 08 tập phim theo dạng web series, cùng sự góp mặt với hơn 30 nghệ sỹ, diễn viên… Với chi phí đầu tư lớn và được phát sóng trên nền tảng VOD. Ai Chết Giơ Tay (new season) với tên gọi Kẻ Độc Hành. Đây là dự án tâm huyết của Lập đã được chuẩn bị hơn 1 năm, đã được bấm máy vào tháng 05/2021 tại Long Xuyên AG (quê nhà của Lập) và sẽ được hậu kỳ hơn 1 năm.",
};
export const thongTinPhimLocalStorage = localStorage.setItem(
  "thongTinPhim",
  JSON.stringify(thongTinPhim)
);

let getThongTinPhim;
if (localStorage.getItem("thongTinPhim")) {
  getThongTinPhim = JSON.parse(localStorage.getItem("thongTinPhim") || "");
}

export const getThongTinPhimLocalStorage = getThongTinPhim;
