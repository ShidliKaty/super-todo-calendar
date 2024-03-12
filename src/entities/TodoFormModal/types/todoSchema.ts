import { Todo } from "../../Todos/types/todoTypes";

export interface TodoState {
  data?: Todo;
  isLoading?: boolean;
  error?: string;
}
