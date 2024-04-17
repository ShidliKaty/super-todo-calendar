import { Box } from "@chakra-ui/react";
import { FormEvent, useCallback, useEffect, useRef } from "react";
import cls from "./MiniTodoListForm.module.scss";

interface MiniTodoListFormProps {
  todoName?: string;
  todoId?: string;
  isNew?: boolean;
  isEdit?: boolean;
  isSub?: boolean;
  onCloseForm: () => void;
  addNewTodo?: (inputValue: string) => void;
  updateMiniTodoName?: (inputValue: string) => void;
}
export const MiniTodoListForm = (props: MiniTodoListFormProps) => {
  const {
    isNew,
    onCloseForm,
    isEdit,
    isSub,
    todoName,
    addNewTodo,
    updateMiniTodoName,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const addNewMiniTodo = useCallback(() => {
    const inputValue = inputRef.current?.value.trim();
    if (addNewTodo && inputValue && inputValue !== "") {
      addNewTodo(inputValue);
    }
  }, [addNewTodo]);

  const updateMiniTodo = useCallback(() => {
    const inputValue = inputRef.current?.value.trim();
    if (updateMiniTodoName && inputValue) {
      updateMiniTodoName(inputValue);
    }
  }, [updateMiniTodoName]);

  const handleTodoBlur = useCallback(() => {
    if (isNew) {
      addNewMiniTodo();
    }

    if (isEdit) {
      updateMiniTodo();
    }
    onCloseForm();
  }, [onCloseForm, addNewMiniTodo, isNew, updateMiniTodo, isEdit]);

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
      p={isSub ? "5px 20px" : "10px 20px"}
      borderRadius={10}
      mt="20px"
      ml={isSub ? "32px" : 0}
    >
      <form className={cls.todoListForm} onSubmit={handleSubmit}>
        <input autoFocus type="text" ref={inputRef} defaultValue={todoName} />
      </form>
    </Box>
  );
};
