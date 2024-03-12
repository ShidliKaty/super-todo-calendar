import { List, Skeleton, Text, VStack } from "@chakra-ui/react";
import TodoItem from "../TodoItem/TodoItem";
import { useAppDispatch } from "../../../../redux/store";
import { useEffect, useMemo } from "react";
import { fetchTodoLists } from "../../model/services/fetchTodoLists";
import { useSelector } from "react-redux";
import {
  getTodos,
  getTodosIsError,
  getTodosIsLoading,
} from "../../model/selectors/todos";

interface TodoListProps {
  id?: string;
}

const TodoList = ({ id }: TodoListProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodoLists());
  }, [dispatch]);

  const todos = useSelector(getTodos);
  const isLoading = useSelector(getTodosIsLoading);
  const error = useSelector(getTodosIsError);

  const filteredTodos = useMemo(
    () =>
      id
        ? todos.filter((todo) => todo.listId === id)
        : todos.filter((todo) => !todo.listId),
    [id, todos]
  );

  return (
    <>
      {error && (
        <Text color="red.600">
          Произошла ошибка! Попробуйте перезагрузить страницу
        </Text>
      )}
      {isLoading ? (
        <VStack alignItems="flex-start" mt="20px" spacing={3}>
          <Skeleton width="100%" height="60px" borderRadius={10} />
          <Skeleton width="100%" height="60px" borderRadius={10} />
          <Skeleton width="100%" height="60px" borderRadius={10} />
        </VStack>
      ) : null}
      {!isLoading && filteredTodos.length === 0 ? (
        <Text mt={5}>Нет записей</Text>
      ) : null}
      <List spacing={3} mt="20px">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </>
  );
};

export default TodoList;
