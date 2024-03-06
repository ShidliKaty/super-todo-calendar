import {
  Divider,
  HStack,
  Heading,
  Icon,
  List,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import AddButton from "../../../../components/AddButton/AddButton";
import { useAppDispatch } from "../../../../redux/store";
import {
  getSidebarLists,
  getSidebarListsIsError,
  getSidebarListsIsLoading,
} from "../../model/selectors/sidebarLists";
import { fetchSidebarLists } from "../../model/services/fetchSidebarLists";
import { addingSidebarList } from "../../model/slices/sidebarListsSlice";
import ListsItem from "../ListsItem/ListsItem";

const ListsGroup = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSidebarLists());
  }, [dispatch]);

  const lists = useSelector(getSidebarLists);
  const isLoading = useSelector(getSidebarListsIsLoading);
  const error = useSelector(getSidebarListsIsError);
  console.log(lists);

  const addList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newId = crypto.randomUUID();
    const newList = {
      id: newId,
      name: "",
      isEditing: true,
      isNew: true,
    };

    dispatch(addingSidebarList(newList));
  };

  const MyLists = () => {
    const sortedLists = [...lists].sort((a, b) => a.name.localeCompare(b.name));
    return (
      <List spacing={5} w="100%">
        {!isLoading && !lists.length ? (
          <Text color="blackAlpha.600">Нет списков</Text>
        ) : null}
        {isLoading && (
          <HStack spacing={2}>
            <SkeletonCircle size="5" />
            <Skeleton width="130px" height="15px" />
          </HStack>
        )}
        {sortedLists.map((list) => (
          <ListsItem
            key={list.id}
            list={list}
            isEdditing={list.isEditing}
            isNew={list.isNew}
          />
        ))}
      </List>
    );
  };
  return (
    <VStack align="flex-start" spacing={5} mt={5}>
      <HStack justify="space-between" w="100%">
        <Heading color="blackAlpha.600" size="md">
          Мои списки
        </Heading>
        <AddButton onClick={addList}>
          <Icon as={BsPlusLg} boxSize={6} />
        </AddButton>
      </HStack>
      {error ? (
        <Text color="red.600">
          Произошла ошибка! Попробуйте перезагрузить страницу
        </Text>
      ) : (
        <MyLists />
      )}

      <Divider w="100%" borderColor="gray.300" />
    </VStack>
  );
};

export default ListsGroup;
