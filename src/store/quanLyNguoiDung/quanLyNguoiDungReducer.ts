import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungService } from "../../services/quanLyNguoiDungService";
import {
  CapNhatNguoiDung,
  CapNhatThongTinNguoiDung,
  DanhSachNguoiDung,
  GetThongTinNguoiDung,
  ThemNguoiDung,
  User,
  UserLogin,
  UserRegister,
} from "../../types/quanLyNguoiDungTypes";

import { TOKEN, USER_LOGIN } from "../../utils/config";

interface InitialState {
  user?: User;
  isFetching: boolean;
  err: any;
  thongTinNguoiDung?: GetThongTinNguoiDung;
  isFetchingThongTinNguoiDung: boolean;
  errThongTinNguoiDung: any;
  isFetchingRegister: boolean;
  errRegister: any;
  isFetchingCapNhat: boolean;
  errCapNhat: any;
  danhSachNguoiDung: DanhSachNguoiDung[];
  isFetchingDSNguoiDung: boolean;
  errDSNguoiDung: any;
  isFetchingXoaNguoiDung: boolean;
  errXoaNguoiDung: any;
  isFetchingThemNguoiDung: boolean;
  errThemNguoiDung: any;
  isFetchingCapNhatNguoiDungAdmin: boolean;
  errCapNhatNguoiDungAdmin: any;
}

let userLocalStorage = {};

if (localStorage.getItem(USER_LOGIN)) {
  userLocalStorage = JSON.parse(localStorage.getItem(USER_LOGIN) as string);
}
const initialState: InitialState = {
  err: "",
  isFetching: false,
  user: userLocalStorage,
  errThongTinNguoiDung: "",
  isFetchingThongTinNguoiDung: false,
  isFetchingRegister: false,
  errRegister: "",
  isFetchingCapNhat: false,
  errCapNhat: "",
  isFetchingDSNguoiDung: false,
  errDSNguoiDung: "",
  danhSachNguoiDung: [
    {
      taiKhoan: "test1312",
      hoTen: "hello1312",
      email: "abcHello13121@gmail.com",
      soDT: "0909123123",
      matKhau: "1312",
      maLoaiNguoiDung: "QuanTri",
    },
  ],
  isFetchingXoaNguoiDung: false,
  errXoaNguoiDung: "",
  isFetchingThemNguoiDung: false,
  errThemNguoiDung: "",
  isFetchingCapNhatNguoiDungAdmin: false,
  errCapNhatNguoiDungAdmin: "",
};
export const {
  reducer: quanLyNguoiDungReducer,
  actions: quanLyNguoiDungActions,
} = createSlice({
  initialState,
  name: "quanLyNguoiDung",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        const thongTinDangNhap = action.payload;
        localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
        localStorage.setItem(
          TOKEN,
          JSON.stringify(action.payload?.accessToken)
        );
        state.isFetching = false;
        state.user = action.payload;
        state.err = "";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isFetching = false;
        state.err = action.payload;
      })
      // Lịch sử đặt vé
      .addCase(lichSuNguoiDungDatVe.pending, (state, action) => {
        state.isFetchingThongTinNguoiDung = true;
      })
      .addCase(lichSuNguoiDungDatVe.fulfilled, (state, action) => {
        state.isFetchingThongTinNguoiDung = false;
        state.thongTinNguoiDung = action.payload;
      })
      .addCase(lichSuNguoiDungDatVe.rejected, (state, action) => {
        state.isFetchingThongTinNguoiDung = false;
        state.errThongTinNguoiDung = action.payload;
      })
      // Regiter
      .addCase(dangKyAction.pending, (state, action) => {
        state.isFetchingRegister = true;
      })
      .addCase(dangKyAction.fulfilled, (state, action) => {
        state.isFetchingRegister = false;
        state.errRegister = "";
      })
      .addCase(dangKyAction.rejected, (state, action) => {
        state.isFetchingRegister = false;
        state.errRegister = action.payload;
      })
      // Cap Nhat
      .addCase(capNhatThongTinNguoiDung.pending, (state, action) => {
        state.isFetchingCapNhat = true;
      })
      .addCase(capNhatThongTinNguoiDung.fulfilled, (state, action) => {
        state.isFetchingCapNhat = false;
        state.errCapNhat = "";
      })
      .addCase(capNhatThongTinNguoiDung.rejected, (state, action) => {
        state.isFetchingCapNhat = false;
        state.errCapNhat = action.payload;
      })
      // Lấy danh sách nguoi dung
      .addCase(danhSachNguoiDungAction.pending, (state, action) => {
        state.isFetchingDSNguoiDung = true;
      })
      .addCase(danhSachNguoiDungAction.fulfilled, (state, action) => {
        state.isFetchingDSNguoiDung = false;
        state.danhSachNguoiDung = action.payload;
      })
      .addCase(danhSachNguoiDungAction.rejected, (state, action) => {
        state.isFetchingDSNguoiDung = false;
        state.errDSNguoiDung = action.payload;
      })
      // Xóa người dùng
      .addCase(xoaNguoiDung.pending, (state, action) => {
        state.isFetchingDSNguoiDung = true;
      })
      .addCase(xoaNguoiDung.fulfilled, (state, action) => {
        state.isFetchingDSNguoiDung = false;
        state.errXoaNguoiDung = "";
      })
      .addCase(xoaNguoiDung.rejected, (state, action) => {
        state.isFetchingDSNguoiDung = false;
        state.errXoaNguoiDung = action.payload;
      })
      // thêm người dùng
      .addCase(themNguoiDung.pending, (state, action) => {
        state.isFetchingThemNguoiDung = true;
      })
      .addCase(themNguoiDung.fulfilled, (state, action) => {
        state.isFetchingThemNguoiDung = false;
        state.errThemNguoiDung = "";
      })
      .addCase(themNguoiDung.rejected, (state, action) => {
        state.isFetchingThemNguoiDung = false;
        state.errThemNguoiDung = action.payload;
      })
      // cập nhật người dùng admin
      .addCase(capNhatNguoiDungAdmin.pending, (state, action) => {
        state.isFetchingCapNhatNguoiDungAdmin = true;
      })
      .addCase(capNhatNguoiDungAdmin.fulfilled, (state, action) => {
        state.isFetchingCapNhatNguoiDungAdmin = false;
        state.errCapNhatNguoiDungAdmin = "";
      })
      .addCase(capNhatNguoiDungAdmin.rejected, (state, action) => {
        state.isFetchingCapNhatNguoiDungAdmin = false;
        state.errCapNhatNguoiDungAdmin = action.payload;
      });
  },
});

export const userLogin = createAsyncThunk(
  "quanLyNguoiDung/userLogin",
  async (
    thongTinDangNhap: UserLogin,
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      if (result.data.statusCode === 200) {
        return result.data.content;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const lichSuNguoiDungDatVe = createAsyncThunk(
  "quanLyNguoiDung/lichSuNguoiDungDatVe",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await quanLyNguoiDungService.getThongTinNguoiDung();
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const dangKyAction = createAsyncThunk(
  "quanLyNguoiDung/dangKy",
  async (thongTinNguoiDung: UserRegister, { rejectWithValue }) => {
    try {
      const result = await quanLyNguoiDungService.dangKy(thongTinNguoiDung);
      if (result.data.statusCode === 200) {
        return result.data.content;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const capNhatThongTinNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/capNhatThongTinNguoiDung",
  async (
    thongTinNguoiDung: CapNhatThongTinNguoiDung,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(
        thongTinNguoiDung
      );
      dispatch(lichSuNguoiDungDatVe());
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const danhSachNguoiDungAction = createAsyncThunk(
  "quanLyNguoiDung/DanhSachNguoiDung",
  async (timKiem: string, { rejectWithValue }) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung(timKiem);
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const xoaNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/xoaNguoiDung",
  async (taiKhoan: string, { dispatch, rejectWithValue }) => {
    try {
      const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      dispatch(danhSachNguoiDungAction(""));
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const themNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/themNguoiDung",
  async (themNguoiDung: ThemNguoiDung, { dispatch, rejectWithValue }) => {
    try {
      const result = await quanLyNguoiDungService.themNguoiDung(themNguoiDung);
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const capNhatNguoiDungAdmin = createAsyncThunk(
  "quanLyNguoiDung/capNhatNguoiDungAdmin",
  async (
    thongTinNguoiDung: CapNhatNguoiDung,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDungAdmin(
        thongTinNguoiDung
      );
      dispatch(danhSachNguoiDungAction(""));
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
