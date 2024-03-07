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

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <ListItem>
      <Box
        display="flex"
        bg="white"
        justifyContent="space-between"
        p="10px 20px"
        borderRadius={10}
      >
        <Checkbox
          isChecked={todo.completed}
          colorScheme="purple"
          spacing={3}
          borderColor="blackAlpha.500"
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
        <ButtonGroup size="sm" variant="ghost" alignItems="center" spacing={1}>
          <Divider orientation="vertical" borderColor="gray.300" />
          <Button p="8px">
            {todo.important ? (
              <Icon as={FaStar} color="purple.600" />
            ) : (
              <Icon as={FaRegStar} color="blackAlpha.600" />
            )}
          </Button>

          <Button p="8px">
            <EditIcon color="blackAlpha.600" />
          </Button>
          <Button p="8px">
            <DeleteIcon color="blackAlpha.600" />
          </Button>
        </ButtonGroup>
      </Box>
    </ListItem>
  );
};

export default TodoItem;
