import { MiniTodo } from "../entities/MiniTodos/types/miniTodosSchema";

export const sortTodosByCompleted = (todos: MiniTodo[]) => {
  const todosCopy = [...todos];

  todosCopy.sort((a, b) => {
    if (a.completed === b.completed) {
      return 0;
    }

    if (a.completed) {
      return 1;
    }

    return -1;
  });
  return todosCopy;
};
