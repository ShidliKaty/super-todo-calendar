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
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/store";
import { addSidebarList } from "../../model/services/addSidebarList";
import { updateListName } from "../../model/services/updateListName";
import { removeSidebarList } from "../../model/slices/sidebarListsSlice";
import { SidebarList } from "../../types/sidebarListTypes";

interface ListsItemProps {
  list: SidebarList;
  isEdditing: boolean | undefined;
  isNew: boolean | undefined;
  onDelete: (id: string) => void;
}

const ListsItem = ({ list, isEdditing, isNew, onDelete }: ListsItemProps) => {
  const { id } = list;
  const [isEditing, setIsEditing] = useState(isEdditing || false);

  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // const handleClickOutside = useCallback(
  //   (event: MouseEvent) => {
  //     if (formRef.current && !formRef.current.contains(event.target as Node)) {
  //       if (isNew && nameRef.current?.value.trim() === "") {
  //         dispatch(removeSidebarList(id));
  //       }
  //       setIsEditing(false);
  //     }
  //   },
  //   [dispatch, id, isNew]
  // );

  const { id: paramsId } = useParams();
  const navigate = useNavigate();

  const handleSendForm = useCallback(() => {
    const inputValue = nameRef.current?.value.trim();
    if (isNew && inputValue === "") {
      dispatch(removeSidebarList(id));
    } else if (!inputValue) {
      setIsEditing(false);
    }

    if (isNew && inputValue) {
      dispatch(addSidebarList({ id, name: inputValue }));
    } else if (inputValue) {
      dispatch(updateListName({ id, name: inputValue }));
    }

    if (id === paramsId) {
      navigate("/mylist/" + inputValue + "/" + list.id);
    }

    setIsEditing(false);
  }, [dispatch, id, isNew, list.id, navigate, paramsId]);

  useEffect(() => {
    const input = nameRef?.current;
    if (isEditing && input) {
      input.addEventListener("blur", handleSendForm);

      return () => input.addEventListener("blur", handleSendForm);
    }
  }, [handleSendForm, isEditing]);

  const onToggleEditing = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditing((prev) => !prev);
  };

  const onDeleteList = () => {
    onDelete(id);
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    handleSendForm();
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
          <Link to={"/mylist/" + list.id}>
            <HStack spacing={0.5}>
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
};

export default ListsItem;
