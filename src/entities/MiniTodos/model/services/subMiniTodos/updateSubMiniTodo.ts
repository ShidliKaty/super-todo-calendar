import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../../api/baseAPI";
import { SubMiniTodo } from "../../../types/subMiniTodosSchema";
import { fetchSubMiniTodosByListId } from "./fetchSubMiniTodosByListId";

interface UpdateProps {
  name?: string;
  completed?: boolean;
  id?: string;
  listId?: string;
}

export const updateSubMiniTodo = createAsyncThunk<SubMiniTodo, UpdateProps>(
  "subMiniTodos/updateSubMiniTodo",
  async ({ name, id, completed, listId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.patch<SubMiniTodo>(`subMiniTodos/${id}`, {
        name,
        completed,
      });

      if (!data) {
        throw new Error();
      }
      dispatch(fetchSubMiniTodosByListId(listId));
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  }
);
