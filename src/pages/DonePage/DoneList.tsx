import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSidebarLists } from "../../entities/SidebarLists/model/selectors/sidebarLists";
import { getCompletedTodos } from "../../entities/Todos/model/selectors/getCompletedTodos";
import { getTodosIsError } from "../../entities/Todos/model/selectors/todos";
import { fetchTodos } from "../../entities/Todos/model/services/fetchTodos";
import { ExpandedList } from "../../entities/Todos/ui/ExpandedList/ExpandedList";
import { useAppDispatch } from "../../redux/store";
import { getTodoIsLoading } from "../../entities/Todos/model/selectors/todo";

export const DoneList = memo(() => {
  const dispatch = useAppDispatch();

  const error = useSelector(getTodosIsError);
  const isLoading = useSelector(getTodoIsLoading);
  const lists = useSelector(getSidebarLists);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const doneTodos = useSelector(getCompletedTodos);

  return (
    <ExpandedList
      lists={lists}
      todos={doneTodos}
      isLoading={isLoading}
      error={error}
    />
  );
});
