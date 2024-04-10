/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { Todo } from "../../types/todoTypes";
import { getTodosSearch } from "../selectors/todos";
import { ThunkConfig } from "../../../../redux/store";

export const fetchTodos = createAsyncThunk<Todo[], void, ThunkConfig<string>>(
  "todos/fetchTodos",
  async (_, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const search = getTodosSearch(getState());
    try {
      const { data } = await baseAPI.get<Todo[]>("todos", {
        params: {
          q: search,
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
