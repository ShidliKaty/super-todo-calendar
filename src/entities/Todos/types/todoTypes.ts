export type Todo = {
  id?: string;
  name?: string;
  date?: string;
  note?: string;
  completed?: boolean;
  important?: boolean;
  listId?: string;
};
export interface TodoListsState {
  todos: Todo[];
  isLoading?: boolean;
  error?: string;
}
