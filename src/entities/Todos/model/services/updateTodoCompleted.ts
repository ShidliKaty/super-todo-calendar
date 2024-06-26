import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { Todo } from "../../types/todoTypes";

export const updateTodoCompleted = createAsyncThunk<Todo, Todo>(
  "todos/updateTodoCompleted",
  async ({ id, completed, completedDate }, { rejectWithValue }) => {
    try {
      const { data } = await baseAPI.patch<Todo>(`todos/${id}`, {
        completed,
        completedDate,
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
