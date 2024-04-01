import { Skeleton, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../redux/store";
import { getMiniTodosByListId } from "../../model/selectors/getMiniTodosByListId";
import {
  getMiniTodosIsError,
  getMiniTodosIsLoading,
} from "../../model/selectors/miniTodos";
import { fetchMiniTodos } from "../../model/services/fetchMiniTodos";
import MiniTodoList from "../MiniTodoList/MiniTodoList";

interface MiniTodoListGroupProps {
  id?: string;
}

const MiniTodoListGroup = ({ id }: MiniTodoListGroupProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMiniTodos());
  }, [dispatch, id]);

  const error = useSelector(getMiniTodosIsError);
  const isLoading = useSelector(getMiniTodosIsLoading);

  const getMiniTodos = getMiniTodosByListId();

  const miniTodos = useSelector((state) => getMiniTodos(state, id)).reverse();

  return (
    <>
      {error && (
        <Text color="red.600">
          Произошла ошибка! Попробуйте перезагрузить страницу
        </Text>
      )}

      {isLoading && (
        <VStack alignItems="flex-start" spacing={3}>
          <Skeleton width="50px" height="50px" borderRadius={50} mb="20px" />
          <Skeleton width="100%" height="60px" borderRadius={10} />
          <Skeleton width="100%" height="60px" borderRadius={10} />
          <Skeleton width="100%" height="60px" borderRadius={10} />
        </VStack>
      )}
      {!error && !isLoading && (
        <MiniTodoList miniTodos={miniTodos} isLoading={isLoading} listId={id} />
      )}
    </>
  );
};

export default MiniTodoListGroup;
