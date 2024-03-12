import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  HStack,
  Icon,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Todo } from "../../types/todoTypes";
import { useAppDispatch } from "../../../../redux/store";
import { deleteTodo } from "../../model/services/deleteTodo";
import TodoModal from "../../../TodoFormModal/ui/TodoModal/TodoModal";
import { useCallback, useState } from "react";
import { updateTodoImportance } from "../../model/services/updateTodoImportance";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [isImportant, setIsImportant] = useState(todo.important);

  const onDeleteTodo = () => {
    if (todo && todo.id) {
      dispatch(deleteTodo(todo.id));
    }
  };

  const onToggleImportant = useCallback(async () => {
    const updatedImportant = !isImportant;
    setIsImportant(updatedImportant);
    const result = await dispatch(
      updateTodoImportance({ id: todo.id, important: updatedImportant })
    );

    if (result.meta.requestStatus === "rejected") {
      setIsImportant(!updatedImportant);
    }
  }, [dispatch, isImportant, todo]);

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
            defaultChecked={todo.completed}
            colorScheme="purple"
            spacing={3}
          >
            <VStack spacing={0.5} align="flex-start">
              <Text color="black" fontSize="l">
                {todo.name}
              </Text>
              <HStack>
                <Text color="blackAlpha.600" fontSize="xs">
                  {todo.date}
                </Text>
                <Text color="blackAlpha.600" fontSize="xs">
                  {todo.note}
                </Text>
              </HStack>
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
            <Button p="8px" onClick={onDeleteTodo}>
              <DeleteIcon color="blackAlpha.600" />
            </Button>
          </ButtonGroup>
        </Box>
      </ListItem>
      <TodoModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        editingId={todo.id}
        editing={isEditing}
      />
    </>
  );
};

export default TodoItem;
