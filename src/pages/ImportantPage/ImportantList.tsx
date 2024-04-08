import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSidebarLists } from "../../entities/SidebarLists/model/selectors/sidebarLists";
import { getImportantTodos } from "../../entities/Todos/model/selectors/getImportantTodos";
import {
  getTodosIsError,
  getTodosIsLoading,
} from "../../entities/Todos/model/selectors/todos";
import { fetchTodos } from "../../entities/Todos/model/services/fetchTodos";
import { ExpandedTodoList } from "../../entities/Todos/ui/ExpandedTodoList/ExpandedTodoList";
import { useAppDispatch } from "../../redux/store";

export const ImportantList = memo(() => {
  const dispatch = useAppDispatch();

  const error = useSelector(getTodosIsError);
  const isLoading = useSelector(getTodosIsLoading);
  const lists = useSelector(getSidebarLists);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const doneTodos = useSelector(getImportantTodos);

  return (
    <ExpandedTodoList
      lists={lists}
      todos={doneTodos}
      isLoading={isLoading}
      error={error}
    />
  );
});
