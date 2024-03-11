import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { Todo } from "../../types/todoTypes";
import { fetchTodoLists } from "./fetchTodoLists";

export const deleteTodo = createAsyncThunk<Todo[], string>(
  "todos/deleteTodoLists",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.delete<Todo[]>(`todos/${id}`);

      if (!data) {
        throw new Error();
      }
      dispatch(fetchTodoLists());
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  }
);
