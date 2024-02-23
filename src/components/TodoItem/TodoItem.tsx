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
import { classNames } from "../../lib/classNames";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import cls from "./TodoItem.module.scss";

interface TodoItemProps {
  className?: string;
  important?: boolean;
}

const TodoItem = (props: TodoItemProps) => {
  const { className, important = false } = props;
  return (
    <div className={classNames(cls.TodoItem, {}, [className])}>
      <ListItem>
        <Box
          display="flex"
          bg="white"
          justifyContent="space-between"
          p="10px 20px"
          borderRadius={10}
        >
          <Checkbox colorScheme="purple" spacing={3}>
            <VStack spacing={0.5} align="flex-start">
              <Text fontSize="l">Lorem ipsum xs</Text>
              <Text color="blackAlpha.600" fontSize="xs">
                Notes
              </Text>
            </VStack>
          </Checkbox>
          <ButtonGroup
            size="sm"
            variant="ghost"
            alignItems="center"
            spacing={1}
          >
            <Divider orientation="vertical" />
            <Button p="8px">
              {important ? (
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
    </div>
  );
};

export default TodoItem;
