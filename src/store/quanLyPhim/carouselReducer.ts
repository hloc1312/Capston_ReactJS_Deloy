import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { quanLyPhimService } from "../../services/quanLyPhimService";
import { Banner } from "../../types/quanLyPhimTypes";

interface InitialState {
  listBanner?: Banner[];
  isFetching: boolean;
  err: any;
}

const initialState: InitialState = {
  listBanner: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
  isFetching: false,
  err: "",
};

export const { reducer: carouselReducer, actions: carouselActions } =
  createSlice({
    initialState,
    name: "carousel",
    reducers: {},
    extraReducers: (builder) => {
      builder
        // getListBanner
        .addCase(getListBanner.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(getListBanner.fulfilled, (state, action) => {
          state.listBanner = action.payload;
          state.isFetching = false;
        })
        .addCase(getListBanner.rejected, (state, action) => {
          state.err = action.payload;
          state.isFetching = false;
        });
    },
  });

export const getListBanner = createAsyncThunk(
  "carousel/getListBanner",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await quanLyPhimService.getListBanner();
      // console.log(result);
      return result.data.content;
    } catch (error: any) {
      //   if (error instanceof AxiosError) {
      //     const message =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();
      //     return rejectWithValue(message);
      //   }
      //   // unhandled non-AxiosError goes here
      //   throw error;
      //   return rejectWithValue({ error: error.response.data });
      return rejectWithValue(error.response.data);
    }
  }
);
