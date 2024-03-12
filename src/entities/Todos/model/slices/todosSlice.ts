import { createSlice } from "@reduxjs/toolkit/react";
import { TodoListsState } from "../../types/todoTypes";
import { fetchTodoLists } from "../services/fetchTodoLists";

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
      .addCase(fetchTodoLists.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchTodoLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodoLists.rejected, (state) => {
        state.isLoading = false;
        state.error = "error";
      });
  },
});

export const { reducer: todosSliceReducer } = todosSlice;
