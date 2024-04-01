import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { MiniTodo } from "../../types/miniTodosSchema";
import { fetchMiniTodos } from "./fetchMiniTodos";

export const deleteMiniTodo = createAsyncThunk<MiniTodo[], string>(
  "miniTodos/deleteMiniTodo",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.delete<MiniTodo[]>(`miniTodos/${id}`);
      console.log(id);

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
