import { StateSchema } from "../../../../redux/store";

export const getMiniTodos = (state: StateSchema) => state.miniTodos.miniTodos;
export const getMiniTodosIsLoading = (state: StateSchema) =>
  state.miniTodos.isLoading;
export const getMiniTodosIsError = (state: StateSchema) =>
  state.miniTodos.error;
