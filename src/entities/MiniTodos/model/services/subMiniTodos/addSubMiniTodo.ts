import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../../../../../api/baseAPI";
import { SubMiniTodo } from "../../../types/subMiniTodosSchema";
import { fetchSubMiniTodosByListId } from "./fetchSubMiniTodosByListId";

export const addSubMiniTodo = createAsyncThunk<SubMiniTodo, SubMiniTodo>(
  "subMiniTodos/addSubMiniTodo",
  async (
    { id, name, completed, miniListId, miniTodoId },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await baseAPI.post<SubMiniTodo>("subMiniTodos", {
        id,
        name,
        completed,
        miniListId,
        miniTodoId,
      });

      if (!data) {
        throw new Error();
      }
      dispatch(fetchSubMiniTodosByListId(miniListId));

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  }
);
