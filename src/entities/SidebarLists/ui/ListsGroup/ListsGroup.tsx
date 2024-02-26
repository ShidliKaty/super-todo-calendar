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
import ListsItem from "../ListsItem/ListsItem";

const ListsGroup = () => {
  const dispatch = useAppDispatch();

  function getLists() {
    dispatch(fetchSidebarLists());
  }

  useEffect(() => {
    getLists();
  }, []);

  const lists = useSelector(getSidebarLists);
  const isLoading = useSelector(getSidebarListsIsLoading);
  const error = useSelector(getSidebarListsIsError);
  console.log(lists);

  const MyLists = () => (
    <List spacing={5} w="100%">
      {!isLoading && !lists.length ? (
        <Text color="blackAlpha.600">Нет списков</Text>
      ) : null}
      {isLoading ? (
        <HStack spacing={2}>
          <SkeletonCircle size="5" />
          <Skeleton width="130px" height="15px" />
        </HStack>
      ) : (
        lists.map((list) => <ListsItem key={list.id} list={list} />)
      )}
    </List>
  );
  return (
    <VStack align="flex-start" spacing={5} mt={5}>
      <HStack justify="space-between" w="100%">
        <Heading color="blackAlpha.600" size="md">
          Мои списки
        </Heading>
        <AddButton>
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

      <Divider w="100%" />
    </VStack>
  );
};

export default ListsGroup;
