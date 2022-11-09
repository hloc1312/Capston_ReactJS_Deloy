import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungService } from "../../services/quanLyNguoiDungService";
import {
  GetThongTinNguoiDung,
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
