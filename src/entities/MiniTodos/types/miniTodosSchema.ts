export type MiniTodo = {
  id?: string;
  name?: string;
  completed?: boolean;
  miniListId?: string;
};
export interface MiniTodoListsState {
  miniTodos: MiniTodo[];
  isLoading?: boolean;
  error?: string;
}
