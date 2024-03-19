import { Button, HStack, Heading } from "@chakra-ui/react";
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

import cls from "../TodoList.module.scss";
import { classNames } from "../../../../utils/classNames";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

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

  type ExpandedLists = {
    [listId: string]: boolean;
  };

  const [expandedLists, setExpandedLists] = useState(() => {
    const initialExpandedLists: ExpandedLists = {};
    lists.forEach((list) => {
      initialExpandedLists[list.id] = true;
    });
    return initialExpandedLists;
  });

  const toggleList = (listId: string) => {
    setExpandedLists((prevState) => ({
      ...prevState,
      [listId]: !prevState[listId],
    }));
  };

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
            if (
              myListTodosMap[list.id] &&
              myListTodosMap[list.id].length !== 0
            ) {
              return (
                <Fragment key={list.id}>
                  <HStack>
                    <Heading as="h4" size="md">
                      {list.name}
                    </Heading>
                    <Button onClick={() => toggleList(list.id)}>
                      {expandedLists[list.id] ? (
                        <ChevronDownIcon boxSize={6} />
                      ) : (
                        <ChevronUpIcon boxSize={6} />
                      )}
                    </Button>
                  </HStack>
                  <div
                    className={classNames(
                      cls.animationContainer,
                      { [cls.hidden]: !expandedLists[list.id] },
                      []
                    )}
                  >
                    <TodoList
                      todos={myListTodosMap[list.id] || []}
                      isLoading={isLoading}
                      error={error}
                    />
                  </div>
                </Fragment>
              );
            }
          })}
        </>
      )}
    </>
  );
};

export default TodoListFilter;
