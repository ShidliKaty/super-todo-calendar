import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { MiniTodo } from "../../types/miniTodosSchema";
import { fetchMiniTodos } from "./fetchMiniTodosByListId";

interface UpdateProps {
  name?: string;
  completed?: boolean;
  id?: string;
  listId?: string;
}

export const updateMiniTodo = createAsyncThunk<MiniTodo, UpdateProps>(
  "miniTodos/updateMiniTodo",
  async ({ name, id, completed, listId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.patch<MiniTodo>(`miniTodos/${id}`, {
        name,
        completed,
      });

      if (!data) {
        throw new Error();
      }
      dispatch(fetchMiniTodos(listId));
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  }
);
