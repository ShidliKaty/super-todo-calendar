export type SubMiniTodo = {
  id?: string;
  name?: string;
  completed?: boolean;
  miniTodoId?: string;
  miniListId?: string;
};

export interface SubMiniTodosState {
  subMiniTodos: SubMiniTodo[];
  isLoading?: boolean;
  error?: string;
}
