import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import thunk from "redux-thunk";
import { quanLyNguoiDungReducer } from "./quanLyNguoiDung";

import { carouselReducer, quanLyPhimReducer } from "./quanLyPhim";

import { quanLyRapReducer } from "./quanLyRap";

import { quanLyDatVeReducer } from "./quanLyDatVe";
import { scrollHomeMenuReducer } from "./scrollHomeMenu";
const rootReducers = combineReducers({
  carouselReducer,
  quanLyPhimReducer,
  quanLyNguoiDungReducer,
  quanLyRapReducer,
  quanLyDatVeReducer,
  scrollHomeMenuReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispath = () => useDispatch<AppDispatch>();
