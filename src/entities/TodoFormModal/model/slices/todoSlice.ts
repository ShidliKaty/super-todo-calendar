import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { TodoState } from "../../types/todoSchema";
import { fetchTodoById } from "../services/fetchTodoById";
import { Todo } from "../../../Todos/types/todoTypes";

const initialState: TodoState = {
  todo: undefined,
  isLoading: false,
  error: undefined,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    updateTodoForm: (state, action: PayloadAction<Todo>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    clearTodoForm: (state) => {
      state.form = undefined;
    },
    cancelEdit: (state) => {
      state.form = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchTodoById.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          state.isLoading = false;
          state.todo = action.payload;
          state.form = action.payload;
        }
      )
      .addCase(fetchTodoById.rejected, (state) => {
        state.isLoading = false;
        state.error = "error";
      });
  },
});

export const { reducer: todoSliceReducer } = todoSlice;
export const { updateTodoForm, cancelEdit, clearTodoForm } = todoSlice.actions;
