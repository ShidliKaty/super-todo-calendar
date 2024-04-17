import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Icon,
  ListIcon,
  ListItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { memo, useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { SidebarList } from "../../../types/sidebarListTypes";
import ListItemForm from "./ListItemForm";

interface ListsItemProps {
  list: SidebarList;
  onDelete: (id: string) => void;
  updateListName: (updatedList: SidebarList) => void;
  isMain?: boolean;
}

export const ListsItem = memo(
  ({ list, onDelete, updateListName, isMain }: ListsItemProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const onToggleEditing = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsEditing((prev) => !prev);
    };

    const onDeleteList = () => {
      onDelete(list.id);
    };

    return (
      <ListItem
        key={list.id}
        color="blackAlpha.600"
        _hover={{ color: "#6B46C1" }}
        cursor="pointer"
      >
        {isEditing ? (
          <HStack justify="space-between" w="100%">
            <HStack spacing={0.5}>
              <ListIcon as={FaListAlt} />
              <ListItemForm
                updateListName={updateListName}
                listName={list.name}
                listId={list.id}
                onCloseForm={() => setIsEditing(false)}
                isEdit
              />
            </HStack>
          </HStack>
        ) : (
          <HStack justify="space-between" w="100%">
            <Link
              to={isMain ? "/mylist/" + list.id : "my_mini_list/" + list.id}
            >
              <HStack spacing={0.5} paddingRight="60px">
                <ListIcon as={FaListAlt} />
                <Text>{list.name}</Text>
              </HStack>
            </Link>
            <Popover>
              <PopoverTrigger>
                <Box as="button" mr="13px">
                  <Icon as={PiDotsThreeOutlineVerticalBold}></Icon>
                </Box>
              </PopoverTrigger>
              <Portal>
                <PopoverContent bg="white" w="50px" borderColor="gray.100">
                  <VStack p={1} spacing={1}>
                    <Button
                      p="8px"
                      variant="ghost"
                      color="blackAlpha.600"
                      _hover={{ color: "#6B46C1" }}
                      alignItems="center"
                      onClick={onToggleEditing}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      p="8px"
                      variant="ghost"
                      color="blackAlpha.600"
                      _hover={{ color: "#6B46C1" }}
                      onClick={onDeleteList}
                    >
                      <DeleteIcon />
                    </Button>
                  </VStack>
                </PopoverContent>
              </Portal>
            </Popover>
          </HStack>
        )}
      </ListItem>
    );
  }
);
