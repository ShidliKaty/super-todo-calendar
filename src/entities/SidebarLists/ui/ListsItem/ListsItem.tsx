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
  VStack,
  Text,
} from "@chakra-ui/react";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { FaListAlt } from "react-icons/fa";
import { SidebarList } from "../../types";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FormEvent, useRef, useState } from "react";
import { updateListName } from "../../model/services/updateListName";
import { useAppDispatch } from "../../../../redux/store";

interface ListsItemProps {
  list: SidebarList;
}

const ListsItem = ({ list }: ListsItemProps) => {
  const { id } = list;
  const [isEditing, setIsEditing] = useState(list.isEditing || false);
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (nameRef.current?.value === "") return;

    const name = nameRef.current?.value || "";

    dispatch(updateListName({ id, name }));
    console.log(nameRef.current?.value);

    setIsEditing(false);
  }

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
            <form onSubmit={handleSubmit}>
              <input
                autoFocus
                type="text"
                defaultValue={list.name}
                ref={nameRef}
              />
            </form>
          </HStack>
        </HStack>
      ) : (
        <HStack justify="space-between" w="100%">
          <HStack spacing={0.5}>
            <ListIcon as={FaListAlt} />
            <Text>{list.name}</Text>
          </HStack>
          <Popover>
            <PopoverTrigger>
              <Box as="button">
                <Icon as={PiDotsThreeOutlineVerticalBold}></Icon>
              </Box>
            </PopoverTrigger>
            <Portal>
              <PopoverContent w="50px">
                <VStack p={1} spacing={1}>
                  <Button
                    p="8px"
                    variant="ghost"
                    color="blackAlpha.600"
                    _hover={{ color: "#6B46C1" }}
                    alignItems="center"
                    onClick={() => setIsEditing(true)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    p="8px"
                    variant="ghost"
                    color="blackAlpha.600"
                    _hover={{ color: "#6B46C1" }}
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
};

export default ListsItem;
