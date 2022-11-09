import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyPhimService } from "../../services/quanLyPhimService";
import {
  GetThongTinPhim,
  Phim,
  ThemPhimUploadHinh,
} from "../../types/quanLyPhimTypes";
import { LichChieuTheoPhim } from "../../types/quanLyRapType";
import { getListLichChieuTheoPhim } from "../quanLyRap";

interface InitialState {
  listMovie: Phim[];
  isFetching: boolean;
  isFetchingDetail: boolean;
  err: any;
  filmDetail?: LichChieuTheoPhim;
  errDetail: any;
  isFetchingThemPhim: boolean;
  errThemPhim: any;
  thongTinPhim?: GetThongTinPhim;
  isFetchingThongTinPhim: boolean;
  errThongTinPhim: any;
  isFetchingUploadPhim: boolean;
  errUploadPhim: any;
  isFetchingDelete: boolean;
  errDelete: any;
}

const initialState: InitialState = {
  listMovie: [
    {
      maPhim: 10378,
      tenPhim: "Dog và Cat",
      biDanh: "dog-va-cat",
      trailer: "",
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/dog-va-cat_gp01",
      moTa: "Cat và Dog",
      maNhom: "GP01",
      ngayKhoiChieu: "2022-10-15T00:00:00",
      danhGia: 10,
      hot: false,
      dangChieu: false,
      sapChieu: false,
    },
    {
      maPhim: 6061,
      tenPhim: "Hành Tinh Hỗn Loạn 2",
      biDanh: "hanh-tinh-hon-loan-2",
      trailer: "https://www.youtube.com/embed/CNfNsNkgxjo",
      hinhAnh:
        "https://movienew.cybersoft.edu.vn/hinhanh/hanh-tinh-hon-loan-2_gp01.jpg",
      moTa: "Todd Hewwitt (Tom Holland) tình cờ phát hiện ra Viola (Daisy Ridley)- một cô gái sống sót sau khi phi thuyền của cô gặp nạn và rơi xuống hành tinh của cậu. Hành tinh này không hề có bóng dáng phụ nữ, còn đàn ông thì bị ảnh hưởng bởi 'Tiếng Ồn' - một thế lực thể hiện toàn bộ suy nghĩ của họ ra bên ngoài. Vì là cô gái duy nhất trên hành tinh kì lạ này, tính mạng của Viola bị đe dọa. Todd quyết tâm bảo vệ Viola và cả hai bị cuốn vào cuộc phiêu lưu nguy hiểm. Từ đó, Todd dần khám phá ra năng lực đặc biệt của mình, và phát hiện ra những bí mật đen tối của hành tinh mà cậu đang sống.",
      maNhom: "GP01",
      ngayKhoiChieu: "2022-10-18T00:00:00",
      danhGia: 9,
      hot: true,
      dangChieu: true,
      sapChieu: true,
    },

    {
      maPhim: 10380,
      tenPhim: "Mái Ấm Gia Đình",
      biDanh: "mai-am-gia-dinh",
      trailer: "",
      hinhAnh:
        "https://movienew.cybersoft.edu.vn/hinhanh/mai-am-gia-dinh_gp01.jpg",
      moTa: "Sitcom rất hay nên coi . Rất nhiều tập",
      maNhom: "GP01",
      ngayKhoiChieu: "2022-10-15T12:35:08.707",
      danhGia: 6,
      hot: true,
      dangChieu: true,
      sapChieu: true,
    },
  ],
  isFetching: false,
  err: "",

  isFetchingDetail: false,
  errDetail: "",
  isFetchingThemPhim: false,
  errThemPhim: "",
  isFetchingThongTinPhim: false,
  errThongTinPhim: "",
  isFetchingUploadPhim: false,
  errUploadPhim: "",
  isFetchingDelete: false,
  errDelete: "",
};
export const { reducer: quanLyPhimReducer, actions: quanLyPhimActions } =
  createSlice({
    initialState,
    name: "quanLyPhim",
    reducers: {},
    extraReducers: (builder) => {
      builder
        // getListMovie
        .addCase(getListMovie.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(getListMovie.fulfilled, (state, action) => {
          state.isFetching = false;
          state.listMovie = action.payload;
        })
        .addCase(getListMovie.rejected, (state, action) => {
          state.isFetching = false;
        })
        // getListLichChieuTheoPhim
        .addCase(getListLichChieuTheoPhim.pending, (state, action) => {
          state.isFetchingDetail = true;
        })
        .addCase(getListLichChieuTheoPhim.fulfilled, (state, action) => {
          state.isFetchingDetail = false;
          state.filmDetail = action.payload;
        })
        .addCase(getListLichChieuTheoPhim.rejected, (state, action) => {
          state.isFetchingDetail = false;
          state.errDetail = action.payload;
        })
        // Thêm Phim
        .addCase(themPhimUploadHinh.pending, (state, action) => {
          state.isFetchingThemPhim = true;
        })
        .addCase(themPhimUploadHinh.fulfilled, (state, action) => {
          state.isFetchingThemPhim = false;
        })
        .addCase(themPhimUploadHinh.rejected, (state, action) => {
          state.isFetchingThemPhim = false;
          state.errThemPhim = action.payload;
        })
        // Lấy thông tin phim
        .addCase(getThongTinPhim.pending, (state, action) => {
          state.isFetchingThongTinPhim = true;
        })
        .addCase(getThongTinPhim.fulfilled, (state, action) => {
          state.isFetchingThongTinPhim = false;
          state.thongTinPhim = action.payload;
        })
        .addCase(getThongTinPhim.rejected, (state, action) => {
          state.isFetchingThongTinPhim = false;
          state.errThemPhim = action.payload;
        })
        // Cập nhật thông tin phim
        .addCase(capNhatPhimUpload.pending, (state, action) => {
          state.isFetchingUploadPhim = true;
        })
        .addCase(capNhatPhimUpload.fulfilled, (state, action) => {
          state.errUploadPhim = "";
          state.isFetchingUploadPhim = false;
        })
        .addCase(capNhatPhimUpload.rejected, (state, action) => {
          state.isFetchingUploadPhim = false;
          state.errUploadPhim = action.payload;
        })
        // Xóa phim
        .addCase(xoaPhim.pending, (state, action) => {
          state.isFetchingDelete = true;
        })
        .addCase(xoaPhim.fulfilled, (state, action) => {
          state.errDelete = "";
          state.isFetchingDelete = false;
        })
        .addCase(xoaPhim.rejected, (state, action) => {
          state.isFetchingDelete = false;
          state.errDelete = action.payload;
        });
    },
  });

export const getListMovie = createAsyncThunk(
  "quanLyPhim/getListMovie",
  async (tenPhim: string, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await quanLyPhimService.getListMovie(tenPhim);
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const themPhimUploadHinh = createAsyncThunk(
  "quanLyPhim/themPhimUploadHinh",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const result = await quanLyPhimService.themPhimUploadHinh(formData);
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getThongTinPhim = createAsyncThunk(
  "quanLyPhim/getThongTinPhim",
  async (maPhim: number, { rejectWithValue }) => {
    try {
      const result = await quanLyPhimService.getThongTinPhim(maPhim);
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const capNhatPhimUpload = createAsyncThunk(
  "quanLyPhim/capNhatPhimUpload",
  async (formData: FormData, { dispatch, rejectWithValue }) => {
    try {
      const result = await quanLyPhimService.capNhatPhimUpload(formData);
      await dispatch(getListMovie(""));
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const xoaPhim = createAsyncThunk(
  "quanLyPhim/xoaPhim",
  async (maPhim: number, { dispatch, rejectWithValue }) => {
    try {
      const result = await quanLyPhimService.xoaPhim(maPhim);
      dispatch(getListMovie(""));
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
