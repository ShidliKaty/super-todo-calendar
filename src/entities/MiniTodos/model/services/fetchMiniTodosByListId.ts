/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { MiniTodo } from "../../types/miniTodosSchema";

export const fetchMiniTodos = createAsyncThunk<MiniTodo[], string | undefined>(
  "miniTodos/fetchMiniTodos",
  async (miniListId, { rejectWithValue }) => {
    if (!miniListId) {
      return rejectWithValue("error");
    }

    try {
      const { data } = await baseAPI.get<MiniTodo[]>("miniTodos", {
        params: {
          miniListId,
        },
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
