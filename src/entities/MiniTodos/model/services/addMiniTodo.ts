import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { MiniTodo } from "../../types/miniTodosSchema";
import { fetchMiniTodos } from "./fetchMiniTodos";

export const addMiniTodo = createAsyncThunk<MiniTodo, MiniTodo>(
  "miniTodos/addMiniTodo",
  async (
    { id, name, completed, miniListId },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await baseAPI.post<MiniTodo>("miniTodos", {
        id,
        name,
        completed,
        miniListId,
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
