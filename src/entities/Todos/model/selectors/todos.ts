import { StateSchema } from "../../../../redux/store";

export const getTodos = (state: StateSchema) => state.todos.todos;
export const getTodosIsLoading = (state: StateSchema) => state.todos.isLoading;
export const getTodosIsError = (state: StateSchema) => state.todos.error;
