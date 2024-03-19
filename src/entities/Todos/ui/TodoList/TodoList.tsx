import { List, Skeleton, Text, VStack } from "@chakra-ui/react";
import { Todo } from "../../types/todoTypes";
import TodoItem from "../TodoItem/TodoItem";
interface TodoListProps {
  todos: Todo[];
  isLoading?: boolean;
  error?: string;
  onImportantPage?: boolean;
}

const TodoList = ({ todos, isLoading, error }: TodoListProps) => {
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
      {!isLoading && todos.length === 0 ? (
        <Text mt={5}>Нет записей</Text>
      ) : null}

      <List spacing={3} my="20px">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </>
  );
};

export default TodoList;
