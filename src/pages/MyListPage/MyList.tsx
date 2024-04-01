import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTodosByListId } from "../../entities/Todos/model/selectors/getTodosByListId";
import {
  getTodosIsError,
  getTodosIsLoading,
} from "../../entities/Todos/model/selectors/todos";
import { fetchTodos } from "../../entities/Todos/model/services/fetchTodos";
import TodoList from "../../entities/Todos/ui/TodoList/TodoList";
import { StateSchema, useAppDispatch } from "../../redux/store";

interface MyListProps {
  id?: string;
}

export const MyList = ({ id }: MyListProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch, id]);

  const getMyListTodos = getTodosByListId();
  const myListTodos = useSelector((state: StateSchema) =>
    getMyListTodos(state, id)
  );
  const isLoading = useSelector(getTodosIsLoading);
  const error = useSelector(getTodosIsError);

  return (
    <>
      {error && (
        <Text color="red.600">
          Произошла ошибка! Попробуйте перезагрузить страницу
        </Text>
      )}
      <TodoList todos={myListTodos} isLoading={isLoading} />
    </>
  );
};
