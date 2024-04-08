/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SubMiniTodo } from "../../../types/subMiniTodosSchema";
import { baseAPI } from "../../../../../api/baseAPI";

export const fetchSubMiniTodosByListId = createAsyncThunk<
  SubMiniTodo[],
  string | undefined
>(
  "subMiniTodos/fetchSubMiniTodosByListId",
  async (miniListId, { rejectWithValue }) => {
    if (!miniListId) {
      return rejectWithValue("error");
    }
    try {
      const { data } = await baseAPI.get<SubMiniTodo[]>("subMiniTodos", {
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
