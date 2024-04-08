import { Skeleton, Text, VStack } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../redux/store";
import {
  getMiniTodos,
  getMiniTodosIsError,
  getMiniTodosIsLoading,
} from "../../model/selectors/miniTodos";
import { fetchMiniTodos } from "../../model/services/fetchMiniTodosByListId";
import { MiniTodoList } from "../MiniTodoList/MiniTodoList";
import AddButton from "../../../../components/AddButton/AddButton";
import { MiniTodoListForm } from "../MiniTodoListForm/MiniTodoListForm";
import { MiniTodo } from "../../types/miniTodosSchema";
import { addMiniTodo } from "../../model/services/addMiniTodo";
import { fetchSubMiniTodosByListId } from "../../model/services/subMiniTodos/fetchSubMiniTodosByListId";
import { sortTodosByCompleted } from "../../../../utils/sortTodosByCompleted";

interface MiniTodoListGroupProps {
  id?: string;
}

export const MiniTodoListGroup = memo(({ id }: MiniTodoListGroupProps) => {
  const dispatch = useAppDispatch();
  const [isOpenForm, setIsOpenForm] = useState(false);

  useEffect(() => {
    dispatch(fetchMiniTodos(id));
    dispatch(fetchSubMiniTodosByListId(id));
  }, [dispatch, id]);

  const error = useSelector(getMiniTodosIsError);
  const isLoading = useSelector(getMiniTodosIsLoading);

  const miniTodos = useSelector(getMiniTodos);

  const sortedTodos = useMemo(
    () => sortTodosByCompleted(miniTodos),
    [miniTodos]
  );

  const addNewMiniTodo = useCallback(
    (inputValue: string) => {
      const newTodo: MiniTodo = {
        id: crypto.randomUUID(),
        name: inputValue,
        completed: false,
        miniListId: id,
      };
      dispatch(addMiniTodo(newTodo));
    },
    [dispatch, id]
  );

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
        <>
          <AddButton secondary onClick={() => setIsOpenForm(true)} />

          {isOpenForm && (
            <MiniTodoListForm
              isNew
              onCloseForm={() => setIsOpenForm(false)}
              addNewTodo={addNewMiniTodo}
            />
          )}

          {!isLoading && miniTodos.length === 0 ? (
            <Text mt={5}>Нет записей</Text>
          ) : (
            <MiniTodoList miniTodos={sortedTodos} />
          )}
        </>
      )}
    </>
  );
});
