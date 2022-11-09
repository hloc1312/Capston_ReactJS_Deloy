import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { connection } from "../..";
import { quanLyDatVeService } from "../../services/quanLyDatVeService";
import {
  DanhSachGhe,
  DanhSachGheVaPhim,
  DatVe,
} from "../../types/quanLyDatVeTypes";
import { RootState } from "../configStore";

type PayloadDatVe = PayloadAction<DanhSachGhe>;

interface InitialState {
  chiTietPhongVe: DanhSachGheVaPhim | undefined;
  danhSachGheDangDat: DanhSachGhe[];
  danhSachGheKhachDangDat: DanhSachGhe[];
  isFetching: boolean;
  err: any;
  errDatVe?: any;
  isFetchingDatVe: boolean;
  tabActive: number;
}
const initialState: InitialState = {
  err: "",
  isFetching: false,
  danhSachGheDangDat: [],
  chiTietPhongVe: {
    thongTinPhim: {
      maLichChieu: 0,
      tenCumRap: "",
      tenRap: "",
      diaChi: "",
      tenPhim: "",
      hinhAnh: "",
      ngayChieu: "",
      gioChieu: "",
    },
    danhSachGhe: [
      {
        maGhe: 0,
        tenGhe: "",
        maRap: 0,
        loaiGhe: "",
        stt: "",
        giaVe: 0,
        daDat: true,
        taiKhoanNguoiDat: "",
      },
    ],
  },
  isFetchingDatVe: false,
  tabActive: 1,
  danhSachGheKhachDangDat: [
    {
      maGhe: 47409,
      tenGhe: "09",
      maRap: 451,
      loaiGhe: "thuong",
      stt: "09",
      giaVe: 75000,
      daDat: false,
      taiKhoanNguoiDat: "null",
    },
  ],
};
export const { reducer: quanLyDatVeReducer, actions: quanLyDatVeAction } =
  createSlice({
    initialState,
    name: "quanLyDatVe",
    reducers: {
      datVe: (state, action: PayloadDatVe) => {
        // Cập nhật ds ghế đang đặt
        const danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
        const index = danhSachGheDangDatUpdate.findIndex(
          (ghe) => ghe.maGhe === action.payload.maGhe
        );

        if (index !== -1) {
          danhSachGheDangDatUpdate.splice(index, 1);
        } else {
          danhSachGheDangDatUpdate.push(action.payload);
        }

        state.danhSachGheDangDat = danhSachGheDangDatUpdate;
      },
      datVeThanhCong: (state) => {
        // console.log("reset");
        state.danhSachGheDangDat = [];
      },
      chuyenTab: (state) => {
        state.tabActive = 2;
      },
      changeTabActive: (state, action) => {
        state.tabActive = action.payload;
      },
      datGhe: (state, action) => {
        console.log(action.payload);
        state.danhSachGheKhachDangDat = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        // lấy danh sách phòng vé
        .addCase(getListPhongVe.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(getListPhongVe.fulfilled, (state, action) => {
          state.isFetching = false;
          state.chiTietPhongVe = action.payload;
        })
        .addCase(getListPhongVe.rejected, (state, action) => {
          state.isFetching = false;
          state.err = action.payload;
        })
        // Đặt vé
        .addCase(datVe.pending, (state, action) => {
          state.isFetchingDatVe = true;
        })
        .addCase(datVe.fulfilled, (state, action) => {
          state.isFetchingDatVe = false;
        })
        .addCase(datVe.rejected, (state, action) => {
          state.errDatVe = action.payload;
          console.log(action.payload);
          state.isFetchingDatVe = false;
        });
    },
  });

export const getListPhongVe = createAsyncThunk(
  "quanLyDatVe/getListPhongVe",
  async (maLichChieu: number, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await quanLyDatVeService.getListPhongVe(maLichChieu);
      return result.data.content;
    } catch (err: any) {
      rejectWithValue(err.response.data);
    }
  }
);

export const datVe = createAsyncThunk(
  "quanLyDatVe/datVe",
  async (thongTinDatVe: DatVe, { getState, dispatch, rejectWithValue }) => {
    try {
      const result = await quanLyDatVeService.datVe(thongTinDatVe);
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const datGhe = createAsyncThunk(
  "quanLyDatVe/datGhe",
  async (
    { ghe, maLichChieu }: { ghe: DanhSachGhe; maLichChieu: number },
    { dispatch, getState, rejectWithValue }
  ) => {
    // const {ghe, } =param
    // Đưa thông tin ghế lên reducer
    await dispatch(quanLyDatVeAction.datVe(ghe));

    // Call api về backend
    let state = getState() as RootState;
    let danhSachGheDangDat = state.quanLyDatVeReducer.danhSachGheDangDat;
    let taiKhoan = state.quanLyNguoiDungReducer.user?.taiKhoan;
    // console.log({ danhSachGheDangDat });
    // console.log({ taiKhoan });
    // console.log({ maLichChieu });

    // Biến mảng thành chuỗi
    const dsGheString = JSON.stringify(danhSachGheDangDat);

    // Call api signalR
    connection.invoke("datGhe", taiKhoan, dsGheString, maLichChieu);
  }
);
