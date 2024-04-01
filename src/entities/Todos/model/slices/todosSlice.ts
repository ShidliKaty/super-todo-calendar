import { createSlice } from "@reduxjs/toolkit/react";
import { TodoListsState } from "../../types/todoTypes";
import { fetchTodos } from "../services/fetchTodos";

const initialState: TodoListsState = {
  todos: [],
  isLoading: false,
  error: undefined,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.isLoading = false;
        state.error = "error";
      });
  },
});

export const { reducer: todosSliceReducer } = todosSlice;
