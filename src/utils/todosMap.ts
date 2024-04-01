import { SidebarList } from "../entities/SidebarLists/types/sidebarListTypes";
import { Todo } from "../entities/Todos/types/todoTypes";

type todosMapProps = {
  lists: SidebarList[];
  todos: Todo[];
};

export const todosMap = ({ lists, todos }: todosMapProps) => {
  const updatedMap: Record<string, Todo[]> = {};

  updatedMap["0"] = todos.filter((todo) => !todo.listId);
  lists.forEach((list) => {
    const myListTodos = todos.filter((todo) => todo.listId === String(list.id));
    updatedMap[String(list.id)] = myListTodos;
  });

  return updatedMap;
};
