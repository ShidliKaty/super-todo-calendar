import { Divider, HStack, Heading, Icon, Text, VStack } from "@chakra-ui/react";

import { memo, useEffect } from "react";
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
import { MyLists } from "./MyLists";

export const ListsGroup = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSidebarLists());
  }, [dispatch]);

  const lists = useSelector(getSidebarLists);
  const isLoading = useSelector(getSidebarListsIsLoading);
  const error = useSelector(getSidebarListsIsError);

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
        <MyLists lists={lists} isLoading={isLoading} />
      )}

      <Divider w="100%" borderColor="gray.300" />
    </VStack>
  );
});
