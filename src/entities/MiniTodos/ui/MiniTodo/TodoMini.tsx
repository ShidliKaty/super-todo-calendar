import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  HStack,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { Todo } from "../../../Todos/types/todoTypes";
import { MiniTodoListForm } from "../MiniTodoListForm/MiniTodoListForm";

interface TodoMiniProps {
  todo: Todo;
  isEdit: boolean;
  disabled?: boolean;
  isCompleted?: boolean;
  isSub?: boolean;
  toggleEdit: () => void;
  toggleCompleted: (isChecked: boolean) => void;
  onDeleteTodo: () => void;
  updateMiniTodoName: (name: string) => void;
  onAddSubTodo?: () => void;
}

export const TodoMini = (props: TodoMiniProps) => {
  const {
    todo,
    isEdit,
    toggleEdit,
    isSub,
    disabled,
    isCompleted,
    toggleCompleted,
    onDeleteTodo,
    updateMiniTodoName,
    onAddSubTodo,
  } = props;

  return (
    <>
      <ListItem>
        {isEdit ? (
          <MiniTodoListForm
            todoName={todo.name}
            todoId={todo.id}
            onCloseForm={toggleEdit}
            updateMiniTodoName={updateMiniTodoName}
            isEdit
          />
        ) : (
          <>
            <Box
              display="flex"
              bg="white"
              justifyContent="space-between"
              p={isSub ? "5px 20px" : "10px 20px"}
              borderRadius={10}
            >
              <Checkbox
                isChecked={isCompleted}
                onChange={(e) => toggleCompleted(e.target.checked)}
                isDisabled={disabled}
                defaultChecked={todo.completed}
                colorScheme="purple"
                spacing={3}
              >
                <HStack spacing={1}>
                  <Text color={isCompleted ? "gray.500" : "black"} fontSize="l">
                    {todo.name}
                  </Text>
                </HStack>
              </Checkbox>
              <ButtonGroup
                size="sm"
                variant="ghost"
                alignItems="center"
                spacing={1}
              >
                <Divider orientation="vertical" borderColor="gray.300" />

                {!isSub && (
                  <Button p="8px" onClick={onAddSubTodo}>
                    <AddIcon color="blackAlpha.600" />
                  </Button>
                )}

                <Button onClick={toggleEdit} p="8px">
                  <EditIcon color="blackAlpha.600" />
                </Button>
                <Button p="8px" onClick={onDeleteTodo}>
                  <DeleteIcon color="blackAlpha.600" />
                </Button>
              </ButtonGroup>
            </Box>
          </>
        )}
      </ListItem>
    </>
  );
};
