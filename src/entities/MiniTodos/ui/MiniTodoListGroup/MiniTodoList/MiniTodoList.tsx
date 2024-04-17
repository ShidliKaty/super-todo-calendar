import { List, Text } from "@chakra-ui/react";
import { memo } from "react";
import { MiniTodo } from "../../../types/miniTodosSchema";
import { MiniTodoItem } from "./MiniTodoItem/MiniTodoItem";
import { useSelector } from "react-redux";
import {
  getSubMiniTodos,
  getSubMiniTodosIsError,
} from "../../../model/selectors/getSubMiniTodos";

interface MiniTodoListProps {
  miniTodos: MiniTodo[];
}

export const MiniTodoList = memo(({ miniTodos }: MiniTodoListProps) => {
  const subMiniTodos = useSelector(getSubMiniTodos);
  const subItemsError = useSelector(getSubMiniTodosIsError);
  return (
    <List spacing={3} my="20px">
      {subItemsError && (
        <Text color="red.600">
          Произошла ошибка при загрузке подсписков! Попробуйте перезагрузить
          страницу
        </Text>
      )}
      {miniTodos.map((todo) => {
        const subTodos = subMiniTodos.filter(
          (subTodo) => subTodo.miniTodoId === todo.id
        );
        const todos = subTodos?.length !== 0 ? subTodos : undefined;

        return <MiniTodoItem key={todo.id} miniTodo={todo} subTodos={todos} />;
      })}
    </List>
  );
});
