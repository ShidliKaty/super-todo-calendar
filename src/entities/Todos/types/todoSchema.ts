import { Todo } from "./todoTypes";

export interface TodoState {
  data?: Todo;
  isLoading?: boolean;
  error?: string;
}
