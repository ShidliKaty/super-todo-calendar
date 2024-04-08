import { ChevronRightIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Button, HStack } from "@chakra-ui/react";
import { memo, useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/store";
import { sortTodosByCompleted } from "../../../../utils/sortTodosByCompleted";
import { deleteMiniTodo } from "../../model/services/deleteMiniTodo";
import { fetchMiniTodos } from "../../model/services/fetchMiniTodosByListId";
import { addSubMiniTodo } from "../../model/services/subMiniTodos/addSubMiniTodo";
import { fetchSubMiniTodosByListId } from "../../model/services/subMiniTodos/fetchSubMiniTodosByListId";
import { updateCompletedAll } from "../../model/services/subMiniTodos/updateCompletedAll";
import { updateMiniTodo } from "../../model/services/updateMiniTodo";
import { MiniTodo } from "../../types/miniTodosSchema";
import { SubMiniTodo } from "../../types/subMiniTodosSchema";
import { TodoMini } from "../MiniTodo/TodoMini";
import { MiniTodoListForm } from "../MiniTodoListForm/MiniTodoListForm";
import { MiniTodoSublist } from "../MiniTodoSublist/MiniTodoSublist";

interface MiniTodoItemProps {
  miniTodo: MiniTodo;
  subTodos?: SubMiniTodo[];
}

export const MiniTodoItem = memo((props: MiniTodoItemProps) => {
  const { miniTodo, subTodos } = props;
  const dispatch = useAppDispatch();

  const { id: listId } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(miniTodo.completed);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [subListOpen, setSubListOpen] = useState(!isCompleted);

  const allCompleted = subTodos?.every((todo) => todo.completed === true);

  const onDeleteMiniTodo = useCallback(() => {
    if (listId && miniTodo && miniTodo.id) {
      dispatch(deleteMiniTodo({ id: miniTodo.id, listId }));
    }
  }, [dispatch, listId, miniTodo]);

  const toggleCompleted = useCallback(
    async (isChecked: boolean) => {
      setIsCompleted(isChecked);

      const result = await dispatch(
        updateMiniTodo({
          id: miniTodo.id,
          completed: isChecked,
        })
      );

      if (result.meta.requestStatus === "rejected") {
        setIsCompleted(!isChecked);
      }

      if (result.meta.requestStatus === "fulfilled") {
        if (subTodos && allCompleted === false && isChecked === true) {
          subTodos.forEach((todo) => {
            if (todo.completed === false) {
              dispatch(
                updateCompletedAll({
                  id: todo.id,
                  completed: isChecked,
                })
              );
            }
          });
          dispatch(fetchSubMiniTodosByListId(listId));
        }
        dispatch(fetchMiniTodos(listId));
      }
    },
    [dispatch, miniTodo.id, subTodos, listId, allCompleted]
  );

  const updateMiniTodoName = useCallback(
    (name: string) => {
      dispatch(updateMiniTodo({ id: miniTodo.id, name, listId }));
    },
    [dispatch, miniTodo, listId]
  );

  const addNewSubMiniTodo = useCallback(
    (name: string) => {
      const newSubTodo: SubMiniTodo = {
        id: crypto.randomUUID(),
        name,
        completed: false,
        miniListId: listId,
        miniTodoId: miniTodo.id,
      };
      dispatch(addSubMiniTodo(newSubTodo));
    },
    [dispatch, listId, miniTodo]
  );

  const sortedSubTodos = useMemo(() => {
    if (subTodos) {
      return sortTodosByCompleted(subTodos);
    }
  }, [subTodos]);

  return (
    <>
      <TodoMini
        todo={miniTodo}
        isEdit={isEdit}
        toggleEdit={() => setIsEdit(!isEdit)}
        isCompleted={isCompleted}
        toggleCompleted={toggleCompleted}
        onDeleteTodo={onDeleteMiniTodo}
        updateMiniTodoName={updateMiniTodoName}
        onAddSubTodo={() => setIsOpenForm(true)}
      />

      {isOpenForm && (
        <MiniTodoListForm
          isSub
          isNew
          onCloseForm={() => setIsOpenForm(false)}
          addNewTodo={addNewSubMiniTodo}
        />
      )}
      {subTodos && sortedSubTodos && (
        <HStack w="100%" align="flex-start">
          <Button
            height="10px"
            size="sm"
            variant="ghost"
            p="0px"
            pt="3px"
            onClick={() => setSubListOpen(!subListOpen)}
          >
            {subListOpen ? (
              <ChevronUpIcon boxSize={6} color="blackAlpha.600" />
            ) : (
              <ChevronRightIcon boxSize={6} color="blackAlpha.600" />
            )}
          </Button>

          <MiniTodoSublist
            subTodos={sortedSubTodos}
            completed={isCompleted}
            hidden={!subListOpen}
          />
        </HStack>
      )}
    </>
  );
});
