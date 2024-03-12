/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { Todo } from "../../../Todos/types/todoTypes";

export const fetchTodoById = createAsyncThunk<Todo, string>(
  "todos/fetchTodoById",
  async (todoId, { rejectWithValue }) => {
    try {
      const { data } = await baseAPI.get<Todo>("todos/" + todoId);

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
