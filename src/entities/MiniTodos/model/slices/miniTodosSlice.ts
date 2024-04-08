import { createSlice } from "@reduxjs/toolkit/react";
import { MiniTodoListsState } from "../../types/miniTodosSchema";
import { fetchMiniTodos } from "../services/fetchMiniTodosByListId";

const initialState: MiniTodoListsState = {
  miniTodos: [],
  isLoading: false,
  error: undefined,
};

export const miniTodosSlice = createSlice({
  name: "miniTodos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMiniTodos.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchMiniTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.miniTodos = action.payload;
      })
      .addCase(fetchMiniTodos.rejected, (state) => {
        state.isLoading = false;
        state.error = "error";
      });
  },
});

export const { reducer: miniTodosSliceReducer } = miniTodosSlice;
