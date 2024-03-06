import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SidebarList, SidebarListsState } from "../../types";
import { fetchSidebarLists } from "../services/fetchSidebarLists";

const initialState: SidebarListsState = {
  lists: [],
  isLoading: false,
  error: undefined,
};

export const sidebarListsSlice = createSlice({
  name: "sidebarLists",
  initialState,
  reducers: {
    addingSidebarList(state, action: PayloadAction<SidebarList>) {
      state.lists = [action.payload, ...state.lists];
    },
    removeSidebarList(state, action: PayloadAction<string>) {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSidebarLists.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
        state.lists = [];
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
export const { addingSidebarList, removeSidebarList } =
  sidebarListsSlice.actions;
