import { StateSchema } from "../../../../redux/store";

export const getTodo = (state: StateSchema) => state.todo.todo;
export const getTodoForm = (state: StateSchema) => state.todo.form;
export const getTodoIsLoading = (state: StateSchema) => state.todo.isLoading;
export const getTodoIsError = (state: StateSchema) => state.todo.error;
