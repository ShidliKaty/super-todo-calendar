/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { MiniTodo } from "../../types/miniTodosSchema";

export const fetchMiniTodos = createAsyncThunk<MiniTodo[]>(
  "miniTodos/fetchMiniTodos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await baseAPI.get<MiniTodo[]>("miniTodos");

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
