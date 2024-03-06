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
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { updateListName } from "../../model/services/updateListName";
import { useAppDispatch } from "../../../../redux/store";
import { addSidebarList } from "../../model/services/addSidebarList";
import { removeSidebarList } from "../../model/slices/sidebarListsSlice";

interface ListsItemProps {
  list: SidebarList;
  isEdditing: boolean | undefined;
  isNew: boolean | undefined;
}

const ListsItem = ({ list, isEdditing, isNew }: ListsItemProps) => {
  const { id } = list;
  const [isEditing, setIsEditing] = useState(isEdditing || false);
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        if (nameRef.current?.value === "") {
          dispatch(removeSidebarList(id));
        }
        setIsEditing(false);
      }
    },
    [dispatch, id]
  );

  useEffect(() => {
    if (isEditing) {
      document.body.addEventListener("click", handleClickOutside);

      return () =>
        document.body.removeEventListener("click", handleClickOutside);
    }
  }, [handleClickOutside, isEditing]);

  const toggleVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditing((prev) => !prev);
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (nameRef.current?.value === "") return;

    const name = nameRef.current?.value || "";

    if (isNew) {
      dispatch(addSidebarList({ id, name }));
    } else {
      dispatch(updateListName({ id, name }));
    }

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
            <div ref={formRef}>
              <form onSubmit={handleSubmit}>
                <input
                  autoFocus
                  type="text"
                  defaultValue={list.name}
                  ref={nameRef}
                />
              </form>
            </div>
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
              <PopoverContent bg="white" w="50px" borderColor="gray.100">
                <VStack p={1} spacing={1}>
                  <Button
                    p="8px"
                    variant="ghost"
                    color="blackAlpha.600"
                    _hover={{ color: "#6B46C1" }}
                    alignItems="center"
                    onClick={toggleVisibility}
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
