import { memo, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../../../../redux/store";
import { deleteSubMiniTodo } from "../../../../../model/services/subMiniTodos/deleteSubMiniTodo";
import { fetchSubMiniTodosByListId } from "../../../../../model/services/subMiniTodos/fetchSubMiniTodosByListId";
import { updateSubMiniTodo } from "../../../../../model/services/subMiniTodos/updateSubMiniTodo";
import { SubMiniTodo } from "../../../../../types/subMiniTodosSchema";
import { TodoMini } from "../../TodoMini/TodoMini";

interface MiniTodoSubitemProps {
  todo: SubMiniTodo;
  disabled?: boolean;
}

export const MiniTodoSubitem = memo((props: MiniTodoSubitemProps) => {
  const { todo, disabled } = props;
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const { id: listId } = useParams();

  const onDeleteSubMiniTodo = () => {
    if (listId && todo && todo.id) {
      dispatch(deleteSubMiniTodo({ id: todo.id, listId }));
    }
  };

  const toggleCompleted = useCallback(
    async (isChecked: boolean) => {
      setIsCompleted(isChecked);
      const result = await dispatch(
        updateSubMiniTodo({
          id: todo.id,
          completed: isChecked,
        })
      );

      if (result.meta.requestStatus === "rejected") {
        setIsCompleted(!isChecked);
      }

      if (result.meta.requestStatus === "fulfilled") {
        dispatch(fetchSubMiniTodosByListId(listId));
      }
    },
    [dispatch, todo.id, listId]
  );

  const updateSubMiniTodoName = useCallback(
    (name: string) => {
      dispatch(
        updateSubMiniTodo({ id: todo.id, name, listId: todo.miniListId })
      );
    },
    [dispatch, todo]
  );

  return (
    <TodoMini
      isSub
      todo={todo}
      isEdit={isEdit}
      disabled={disabled}
      toggleEdit={() => setIsEdit(!isEdit)}
      isCompleted={isCompleted}
      toggleCompleted={toggleCompleted}
      onDeleteTodo={onDeleteSubMiniTodo}
      updateMiniTodoName={updateSubMiniTodoName}
    />
  );
});
