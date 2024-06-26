import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Icon,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useAppDispatch } from "../../../../../../redux/store";
import { Todo } from "../../../../types/todoTypes";

import { ChangeEvent, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { TodoModal } from "../../../..";
import { formatDate } from "../../../../../../utils/formatDate";
import { fetchTodos } from "../../../../model/services/fetchTodos";
import { updateTodoCompleted } from "../../../../model/services/updateTodoCompleted";
import { updateTodoImportance } from "../../../../model/services/updateTodoImportance";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [isImportant, setIsImportant] = useState(todo.important);
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const onImportantPage = location.pathname.includes("important");

  const onToggleImportant = useCallback(async () => {
    const updatedImportant = !isImportant;
    setIsImportant(updatedImportant);
    const result = await dispatch(
      updateTodoImportance({ id: todo.id, important: updatedImportant })
    );

    if (result.meta.requestStatus === "rejected") {
      setIsImportant(!updatedImportant);
    }
    if (result.meta.requestStatus === "fulfilled" && onImportantPage) {
      dispatch(fetchTodos());
    }
  }, [dispatch, isImportant, todo, onImportantPage]);

  const onToggleCompleted = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const date = new Date();
      const formattedDate = formatDate(date, {});
      const isChecked = e.target.checked;
      setIsCompleted(isChecked);
      const result = await dispatch(
        updateTodoCompleted({
          id: todo.id,
          completed: isChecked,
          completedDate: formattedDate,
        })
      );

      if (result.meta.requestStatus === "rejected") {
        setIsCompleted(!isChecked);
      }

      if (result.meta.requestStatus === "fulfilled") {
        dispatch(fetchTodos());
      }
    },
    [dispatch, todo.id]
  );

  return (
    <>
      <ListItem>
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
              <Text color="blackAlpha.600" fontSize="sm">
                {todo.note}
              </Text>
              <VStack spacing={0.1} align="flex-start">
                <Text color="blackAlpha.600" fontSize="12px">
                  Создано: {todo.date}
                </Text>
                {todo.todoDate && (
                  <Text color="blackAlpha.600" fontSize="12px">
                    Назначено на:{" "}
                    {formatDate(new Date(todo?.todoDate), {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                )}
                {isCompleted && todo.completedDate && (
                  <Text color="blackAlpha.600" fontSize="12px">
                    Завершено: {todo.completedDate}
                  </Text>
                )}
              </VStack>
            </VStack>
          </Checkbox>
          <ButtonGroup
            size="sm"
            variant="ghost"
            alignItems="center"
            spacing={1}
          >
            <Divider orientation="vertical" borderColor="gray.300" />
            <Button p="8px" onClick={onToggleImportant}>
              {isImportant ? (
                <Icon as={FaStar} color="purple.600" />
              ) : (
                <Icon as={FaRegStar} color="blackAlpha.600" />
              )}
            </Button>

            <Button p="8px" onClick={() => setIsEditing(true)}>
              <EditIcon color="blackAlpha.600" />
            </Button>
          </ButtonGroup>
        </Box>
      </ListItem>
      <TodoModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        todo={todo}
      />
    </>
  );
};

export default TodoItem;
