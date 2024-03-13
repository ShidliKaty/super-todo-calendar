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

  const importantTodos = useMemo(
    () => todos.filter((todo) => todo.important),
    [todos]
  );

  const filteredTodos = useMemo(() => {
    if (location.pathname.includes("mylist")) {
      return () => todos.filter((todo) => todo.listId === id);
    }
    if (location.pathname.includes("important")) {
      return () => importantTodos;
    }
    return () => todos.filter((todo) => !todo.listId);
  }, [id, todos, location.pathname, importantTodos]);

  const filteredList = filteredTodos();

  return <TodoList todos={filteredList} isLoading={isLoading} error={error} />;
};

export default TodoListFilter;
