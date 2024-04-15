import { createAsyncThunk } from "@reduxjs/toolkit/react";
import { baseAPI } from "../../../../api/baseAPI";
import { Todo } from "../../types/todoTypes";
import { fetchTodos } from "./fetchTodos";
import { ThunkConfig } from "../../../../redux/store";

interface UpdateProps {
  todo: Todo;
  id: string;
}

export const updateTodo = createAsyncThunk<
  Todo,
  UpdateProps,
  ThunkConfig<string>
>("todos/updateTodo", async ({ todo, id }, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await baseAPI.put<Todo>("todos/" + id, todo);

    if (!data) {
      throw new Error();
    }
    dispatch(fetchTodos());
    return data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
