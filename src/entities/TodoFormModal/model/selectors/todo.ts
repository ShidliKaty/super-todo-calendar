import { StateSchema } from "../../../../redux/store";

export const getTodoForm = (state: StateSchema) => state.todo.data;
export const getTodoIsLoading = (state: StateSchema) => state.todo.isLoading;
export const getTodoIsError = (state: StateSchema) => state.todo.error;
