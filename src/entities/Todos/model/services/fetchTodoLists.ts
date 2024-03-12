/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { Todo } from "../../types/todoTypes";

export const fetchTodoLists = createAsyncThunk<Todo[]>(
  "todos/fetchTodoLists",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await baseAPI.get<Todo[]>("todos");

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