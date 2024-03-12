import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { Todo } from "../../types/todoTypes";
import { fetchTodoLists } from "./fetchTodoLists";

export const addNewTodo = createAsyncThunk<Todo, Todo>(
  "todos/addNewTodo",
  async (
    { id, name, note, date, completed, important, listId },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await baseAPI.post<Todo>("todos", {
        id,
        name,
        note,
        date,
        completed,
        important,
        listId,
      });

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
