import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../../api/baseAPI";
import { SubMiniTodo } from "../../../types/subMiniTodosSchema";
import { fetchSubMiniTodosByListId } from "./fetchSubMiniTodosByListId";

interface DeleteParams {
  id: string;
  listId: string;
}

export const deleteSubMiniTodo = createAsyncThunk<SubMiniTodo[], DeleteParams>(
  "subMiniTodos/deleteSubMiniTodo",
  async ({ id, listId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.delete<SubMiniTodo[]>(
        `subMiniTodos/${id}`
      );

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
