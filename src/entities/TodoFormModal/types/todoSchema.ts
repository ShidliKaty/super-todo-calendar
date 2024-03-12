import { Todo } from "../../Todos/types/todoTypes";

export interface TodoState {
  todo?: Todo;
  form?: Todo;
  isLoading?: boolean;
  error?: string;
}
