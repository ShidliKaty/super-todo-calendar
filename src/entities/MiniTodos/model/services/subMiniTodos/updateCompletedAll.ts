import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../../api/baseAPI";
import { SubMiniTodo } from "../../../types/subMiniTodosSchema";

interface UpdateProps {
  completed?: boolean;
  id?: string;
}

export const updateCompletedAll = createAsyncThunk<SubMiniTodo, UpdateProps>(
  "subMiniTodos/updateCompletedAll",
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      const { data } = await baseAPI.patch<SubMiniTodo>(`subMiniTodos/${id}`, {
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
