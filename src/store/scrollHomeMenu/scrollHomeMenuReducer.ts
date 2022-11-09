import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTMLAttributes, LegacyRef } from "react";

type PayloadMenuHomeRef = PayloadAction<HTMLDivElement>;

interface InitialState {
  homeMenuRef?: HTMLDivElement | null;
}

const initialState: InitialState = {};
export const { reducer: scrollHomeMenuReducer, actions: scrollHomeMenuAction } =
  createSlice({
    initialState,
    name: "scrollHomeMenu",
    reducers: {
      homeMenuRefAction: (state, action) => {
        state.homeMenuRef = action.payload;
      },
    },
    extraReducers: (builder) => {},
  });
