import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { Todo } from "../../types/todoTypes";
import { fetchTodos } from "./fetchTodos";
import { ThunkConfig } from "../../../../redux/store";

export const addNewTodo = createAsyncThunk<Todo, Todo, ThunkConfig<string>>(
  "todos/addNewTodo",
  async (
    { id, name, note, date, completed, important, listId, todoDate, startTime },
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
        todoDate,
        startTime,
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
