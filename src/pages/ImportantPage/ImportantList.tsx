import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSidebarLists } from "../../entities/SidebarLists/model/selectors/sidebarLists";
import { getImportantTodos } from "../../entities/Todos/model/selectors/getImportantTodos";
import { getTodoIsLoading } from "../../entities/Todos/model/selectors/todo";
import { getTodosIsError } from "../../entities/Todos/model/selectors/todos";
import { fetchTodos } from "../../entities/Todos/model/services/fetchTodos";
import { ExpandedList } from "../../entities/Todos/ui/ExpandedList/ExpandedList";
import { useAppDispatch } from "../../redux/store";

export const ImportantList = memo(() => {
  const dispatch = useAppDispatch();

  const error = useSelector(getTodosIsError);
  const isLoading = useSelector(getTodoIsLoading);
  const lists = useSelector(getSidebarLists);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const doneTodos = useSelector(getImportantTodos);

  return (
    <ExpandedList
      lists={lists}
      todos={doneTodos}
      isLoading={isLoading}
      error={error}
    />
  );
});
