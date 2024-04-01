import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { Todo } from "../../types/todoTypes";
import { fetchTodos } from "./fetchTodos";

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
      dispatch(fetchTodos());

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  }
);
