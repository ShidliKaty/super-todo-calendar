import { createAsyncThunk } from "@reduxjs/toolkit/react";
import { baseAPI } from "../../../../api/baseAPI";
import { Todo } from "../../types/todoTypes";
import { fetchTodoLists } from "./fetchTodoLists";

interface UpdateProps {
  todo: Todo;
  id: string;
}

export const updateTodo = createAsyncThunk<Todo, UpdateProps>(
  "todos/updateTodo",
  async ({ todo, id }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.put<Todo>("todos/" + id, todo);

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
