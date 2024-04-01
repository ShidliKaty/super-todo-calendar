import { Box } from "@chakra-ui/react";
import cls from "./MiniTodoListForm.module.scss";
import { FormEvent, useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../../../../redux/store";
import { addMiniTodo } from "../../model/services/addMiniTodo";
import { MiniTodo } from "../../types/miniTodosSchema";
import { updateMiniTodo } from "../../model/services/updateMiniTodo";

interface MiniTodoListFormProps {
  todoName?: string;
  todoId?: string;
  listId?: string;
  isNew?: boolean;
  isEdit?: boolean;
  onCloseForm: () => void;
}
export const MiniTodoListForm = (props: MiniTodoListFormProps) => {
  const { isNew, onCloseForm, listId, isEdit, todoName, todoId } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const addNewMiniTodo = useCallback(() => {
    const inputValue = inputRef.current?.value.trim();
    if (inputValue && inputValue !== "") {
      const newTodo: MiniTodo = {
        id: crypto.randomUUID(),
        name: inputValue,
        completed: false,
        miniListId: listId,
      };
      dispatch(addMiniTodo(newTodo));
    }
  }, [dispatch, listId]);

  const updateMiniTodoName = useCallback(() => {
    const inputValue = inputRef.current?.value.trim();
    if (inputValue && todoId) {
      dispatch(updateMiniTodo({ id: todoId, name: inputValue }));
    }
  }, [dispatch, todoId]);

  const handleTodoBlur = useCallback(() => {
    if (isNew) {
      addNewMiniTodo();
    }

    if (isEdit) {
      updateMiniTodoName();
    }
    onCloseForm();
  }, [onCloseForm, addNewMiniTodo, isNew, updateMiniTodoName, isEdit]);

  useEffect(() => {
    const input = inputRef?.current;
    if (input) {
      input.addEventListener("blur", handleTodoBlur);

      return () => input.addEventListener("blur", handleTodoBlur);
    }
  }, [handleTodoBlur]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleTodoBlur();
  };

  return (
    <Box
      display="flex"
      bg="white"
      justifyContent="space-between"
      p="10px 20px"
      borderRadius={10}
      mt="20px"
    >
      <form className={cls.todoListForm} onSubmit={handleSubmit}>
        <input autoFocus type="text" ref={inputRef} defaultValue={todoName} />
      </form>
    </Box>
  );
};
