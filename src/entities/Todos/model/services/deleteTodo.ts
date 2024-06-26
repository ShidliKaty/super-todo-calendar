import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { Todo } from "../../types/todoTypes";
import { fetchTodos } from "./fetchTodos";
import { ThunkConfig } from "../../../../redux/store";

export const deleteTodo = createAsyncThunk<Todo[], string, ThunkConfig<string>>(
  "todos/deleteTodoLists",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.delete<Todo[]>(`todos/${id}`);

      if (!data) {
        throw new Error();
      }
      dispatch(fetchTodos());
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  }
);
