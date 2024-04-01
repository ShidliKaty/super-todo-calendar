import {
  Box,
  ButtonGroup,
  Checkbox,
  ListItem,
  VStack,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";
import { MiniTodo } from "../../types/miniTodosSchema";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../../../../redux/store";
import { deleteMiniTodo } from "../../model/services/deleteMiniTodo";
import { ChangeEvent, useCallback, useState } from "react";
import { MiniTodoListForm } from "../MiniTodoListForm/MiniTodoListForm";
import { updateMiniTodoCompleted } from "../../model/services/updateMiniTodoCompleted";
import { fetchMiniTodos } from "../../model/services/fetchMiniTodos";

interface MiniTodoItemProps {
  todo: MiniTodo;
}

const MiniTodoItem = (props: MiniTodoItemProps) => {
  const { todo } = props;
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const onDeleteTodo = () => {
    if (todo && todo.id) {
      dispatch(deleteMiniTodo(todo.id));
    }
  };

  const onToggleCompleted = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      setIsCompleted(isChecked);
      const result = await dispatch(
        updateMiniTodoCompleted({
          id: todo.id,
          completed: isChecked,
        })
      );

      if (result.meta.requestStatus === "rejected") {
        setIsCompleted(!isChecked);
      }

      if (result.meta.requestStatus === "fulfilled") {
        dispatch(fetchMiniTodos());
      }
    },
    [dispatch, todo.id]
  );

  return (
    <>
      <ListItem>
        {isEdit ? (
          <MiniTodoListForm
            todoName={todo.name}
            todoId={todo.id}
            onCloseForm={() => setIsEdit(false)}
            isEdit
          />
        ) : (
          <Box
            display="flex"
            bg="white"
            justifyContent="space-between"
            p="10px 20px"
            borderRadius={10}
          >
            <Checkbox
              isChecked={isCompleted}
              onChange={onToggleCompleted}
              defaultChecked={todo.completed}
              colorScheme="purple"
              spacing={3}
            >
              <VStack spacing={0.1} align="flex-start">
                <Text color={isCompleted ? "gray.500" : "black"} fontSize="l">
                  {todo.name}
                </Text>
              </VStack>
            </Checkbox>
            <ButtonGroup
              size="sm"
              variant="ghost"
              alignItems="center"
              spacing={1}
            >
              <Divider orientation="vertical" borderColor="gray.300" />

              <Button onClick={() => setIsEdit(true)} p="8px">
                <EditIcon color="blackAlpha.600" />
              </Button>
              <Button p="8px" onClick={onDeleteTodo}>
                <DeleteIcon color="blackAlpha.600" />
              </Button>
            </ButtonGroup>
          </Box>
        )}
      </ListItem>
    </>
  );
};

export default MiniTodoItem;
