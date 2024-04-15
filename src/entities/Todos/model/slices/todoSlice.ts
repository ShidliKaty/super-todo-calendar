import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { TodoState } from "../../types/todoSchema";
import { Todo } from "../../types/todoTypes";

const initialState: TodoState = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    updateTodoForm: (state, action: PayloadAction<Todo>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    clearTodoForm: (state) => {
      state.data = undefined;
    },
    cancelEdit: (state) => {
      state.data = undefined;
    },
  },
});

export const { reducer: todoSliceReducer } = todoSlice;
export const { updateTodoForm, cancelEdit, clearTodoForm } = todoSlice.actions;
