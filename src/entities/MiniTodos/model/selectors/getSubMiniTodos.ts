import { StateSchema } from "../../../../redux/store";

export const getSubMiniTodos = (state: StateSchema) =>
  state.subMiniTodos.subMiniTodos;
export const getSubMiniTodosIsLoading = (state: StateSchema) =>
  state.subMiniTodos.isLoading;
export const getSubMiniTodosIsError = (state: StateSchema) =>
  state.subMiniTodos.error;
