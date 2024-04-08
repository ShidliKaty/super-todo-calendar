import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../api/baseAPI";
import { MiniTodo } from "../../types/miniTodosSchema";
import { fetchMiniTodos } from "./fetchMiniTodosByListId";

interface DeleteParams {
  id: string;
  listId: string;
}

export const deleteMiniTodo = createAsyncThunk<MiniTodo[], DeleteParams>(
  "miniTodos/deleteMiniTodo",
  async ({ id, listId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.delete<MiniTodo[]>(`miniTodos/${id}`);

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
