import { createSlice } from "@reduxjs/toolkit/react";
import { SidebarListsState } from "../../types/sidebarListTypes";
import { fetchSidebarLists } from "../services/fetchSidebarLists";

const initialState: SidebarListsState = {
  lists: [],
  isLoading: false,
  error: undefined,
};

export const sidebarListsSlice = createSlice({
  name: "sidebarLists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSidebarLists.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchSidebarLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists = action.payload;
      })
      .addCase(fetchSidebarLists.rejected, (state) => {
        state.isLoading = false;
        state.error = "error";
      });
  },
});

export const { reducer: sidebarListsSliceReducer } = sidebarListsSlice;
