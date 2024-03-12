import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { Todo } from "../../types/todoTypes";

export const updateTodoImportance = createAsyncThunk<Todo, Todo>(
  "todos/updateTodoImportance",
  async ({ id, important }, { rejectWithValue }) => {
    try {
      const { data } = await baseAPI.patch<Todo>(`todos/${id}`, {
        important,
      });

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  }
);
