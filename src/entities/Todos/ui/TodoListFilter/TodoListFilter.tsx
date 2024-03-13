import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../redux/store";
import {
  getTodos,
  getTodosIsError,
  getTodosIsLoading,
} from "../../model/selectors/todos";
import { fetchTodoLists } from "../../model/services/fetchTodoLists";
import TodoList from "../TodoList/TodoList";
import { useLocation } from "react-router-dom";

interface TodoListFilterProps {
  id?: string;
}

const TodoListFilter = ({ id }: TodoListFilterProps) => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(fetchTodoLists());
  }, [dispatch, id]);

  const todos = useSelector(getTodos);
  const isLoading = useSelector(getTodosIsLoading);
  const error = useSelector(getTodosIsError);

  const incompletedTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );

  const importantTodos = useMemo(
    () => incompletedTodos.filter((todo) => todo.important),
    [incompletedTodos]
  );

  const noListTodos = useMemo(
    () => incompletedTodos.filter((todo) => !todo.listId),
    [incompletedTodos]
  );

  const myListTodos = useMemo(
    () => todos.filter((todo) => todo.listId === id),
    [todos, id]
  );

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed && !todo.listId),
    [todos]
  );

  const filteredTodos = useMemo(() => {
    if (location.pathname.includes("mylist")) {
      return () => myListTodos;
    }
    if (location.pathname.includes("important")) {
      return () => importantTodos;
    }
    if (location.pathname.includes("done")) {
      return () => completedTodos;
    }
    return () => noListTodos;
  }, [
    location.pathname,
    noListTodos,
    importantTodos,
    myListTodos,
    completedTodos,
  ]);

  const filteredList = filteredTodos();

  return <TodoList todos={filteredList} isLoading={isLoading} error={error} />;
};

export default TodoListFilter;
