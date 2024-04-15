export type Todo = {
  id?: string;
  name?: string;
  date?: string;
  note?: string;
  completed?: boolean;
  completedDate?: string;
  important?: boolean;
  listId?: string;
  todoDate?: string;
  startTime?: string;
};
export interface TodoListsState {
  todos: Todo[];
  isLoading?: boolean;
  error?: string;
  search?: string;
}
