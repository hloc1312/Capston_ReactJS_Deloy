import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyRapService } from "../../services/quanLyRapService";
import { LichChieuHeThongRap } from "../../types/quanLyRapType";

interface InitialState {
  heThongRapChieu: LichChieuHeThongRap[];
  isFetching: boolean;
  err: any;
}

const initialState: InitialState = {
  heThongRapChieu: [],
  isFetching: false,
  err: "",
};

export const { reducer: quanLyRapReducer, actions: quanLyRapActions } =
  createSlice({
    initialState,
    name: "quanLyRap",
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getListHeThongRapChieu.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(getListHeThongRapChieu.fulfilled, (state, action) => {
          state.isFetching = false;
          state.heThongRapChieu = action.payload;
        })
        .addCase(getListHeThongRapChieu.rejected, (state, action) => {
          state.err = action.payload;
          state.isFetching = false;
        });
    },
  });

export const getListHeThongRapChieu = createAsyncThunk(
  "quanLyRap/getListHeThongRapChieu",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await quanLyRapService.getListLichChieuHeThongRap();
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getListLichChieuTheoPhim = createAsyncThunk(
  "quanLyRap/getListLichChieuTheoPhim",
  async (id: string, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await quanLyRapService.getListLichChieuTheoMaPhim(id);
      // console.log(result);
      return result.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
