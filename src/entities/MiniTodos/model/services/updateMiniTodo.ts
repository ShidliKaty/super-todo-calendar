import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { MiniTodo } from "../../types/miniTodosSchema";
import { fetchMiniTodos } from "./fetchMiniTodos";

interface UpdateProps {
  name: string;
  id: string;
}

export const updateMiniTodo = createAsyncThunk<MiniTodo, UpdateProps>(
  "miniTodos/updateMiniTodo",
  async ({ name, id }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.patch<MiniTodo>(`miniTodos/${id}`, {
        name,
      });

      if (!data) {
        throw new Error();
      }
      dispatch(fetchMiniTodos());
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  }
);
