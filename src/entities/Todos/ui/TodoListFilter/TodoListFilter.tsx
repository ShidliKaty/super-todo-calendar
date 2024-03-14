import { Heading } from "@chakra-ui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/store";
import { getSidebarLists } from "../../../SidebarLists/model/selectors/sidebarLists";
import {
  getTodos,
  getTodosIsError,
  getTodosIsLoading,
} from "../../model/selectors/todos";
import { fetchTodoLists } from "../../model/services/fetchTodoLists";
import { Todo } from "../../types/todoTypes";
import TodoList from "../TodoList/TodoList";

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
  const lists = useSelector(getSidebarLists);

  const incompletedTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos]
  );

  const importantTodos = useMemo(
    () => incompletedTodos.filter((todo) => todo.important),
    [incompletedTodos]
  );

  const myListTodos = useMemo(
    () => incompletedTodos.filter((todo) => todo.listId === id),
    [incompletedTodos, id]
  );

  const [myListTodosMap, setMyListTodosMap] = useState<Record<string, Todo[]>>(
    {}
  );

  useEffect(() => {
    const updatedMap: Record<string, Todo[]> = {};

    if (location.pathname.includes("important")) {
      updatedMap["0"] = importantTodos.filter((todo) => !todo.listId);
      lists.forEach((list) => {
        const myListTodos = importantTodos.filter(
          (todo) => todo.listId === String(list.id)
        );
        updatedMap[String(list.id)] = myListTodos;
      });
      setMyListTodosMap(updatedMap);
      return;
    }

    if (location.pathname.includes("done")) {
      updatedMap["0"] = completedTodos.filter((todo) => !todo.listId);
      lists.forEach((list) => {
        const myListTodos = completedTodos.filter(
          (todo) => todo.listId === String(list.id)
        );
        updatedMap[String(list.id)] = myListTodos;
      });
      setMyListTodosMap(updatedMap);
      return;
    }

    lists.forEach((list) => {
      updatedMap["0"] = incompletedTodos.filter((todo) => !todo.listId);
      const myListTodos = incompletedTodos.filter(
        (todo) => todo.listId === String(list.id)
      );
      updatedMap[String(list.id)] = myListTodos;
    });

    setMyListTodosMap(updatedMap);
  }, [
    lists,
    incompletedTodos,
    location.pathname,
    importantTodos,
    completedTodos,
  ]);

  return (
    <>
      {location.pathname.includes("mylist") ? (
        <TodoList todos={myListTodos} isLoading={isLoading} error={error} />
      ) : (
        <>
          <TodoList
            todos={myListTodosMap["0"] || []}
            isLoading={isLoading}
            error={error}
          />
          {lists.map((list) => {
            return (
              <Fragment key={list.id}>
                <Heading as="h4" size="md">
                  {list.name}
                </Heading>
                <TodoList
                  todos={myListTodosMap[list.id] || []}
                  isLoading={isLoading}
                  error={error}
                />
              </Fragment>
            );
          })}
        </>
      )}
    </>
  );
};

export default TodoListFilter;
