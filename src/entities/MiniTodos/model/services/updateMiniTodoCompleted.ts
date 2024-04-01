import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { MiniTodo } from "../../types/miniTodosSchema";

export const updateMiniTodoCompleted = createAsyncThunk<MiniTodo, MiniTodo>(
  "miniTodos/updateMiniTodoCompleted",
  async ({ completed, id }, { rejectWithValue }) => {
    try {
      const { data } = await baseAPI.patch<MiniTodo>(`miniTodos/${id}`, {
        completed,
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
