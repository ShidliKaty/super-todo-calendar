import { createSlice } from "@reduxjs/toolkit/react";
import { SidebarListsState } from "../../types/sidebarListTypes";
import { fetchMiniLists } from "../services/fetchMiniLists";

const initialState: SidebarListsState = {
  lists: [],
  isLoading: false,
  error: undefined,
};

export const miniListsSlice = createSlice({
  name: "miniLists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMiniLists.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchMiniLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists = action.payload;
      })
      .addCase(fetchMiniLists.rejected, (state) => {
        state.isLoading = false;
        state.error = "error";
      });
  },
});

export const { reducer: miniListsSliceReducer } = miniListsSlice;
