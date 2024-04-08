import { createSlice } from "@reduxjs/toolkit/react";
import { SubMiniTodosState } from "../../types/subMiniTodosSchema";
import { fetchSubMiniTodosByListId } from "../services/subMiniTodos/fetchSubMiniTodosByListId";

const initialState: SubMiniTodosState = {
  subMiniTodos: [],
  isLoading: false,
  error: undefined,
};

export const subMiniTodosSlice = createSlice({
  name: "miniTodos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubMiniTodosByListId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchSubMiniTodosByListId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subMiniTodos = action.payload;
      })
      .addCase(fetchSubMiniTodosByListId.rejected, (state) => {
        state.isLoading = false;
        state.error = "error";
      });
  },
});

export const { reducer: subMiniTodosSliceReducer } = subMiniTodosSlice;
