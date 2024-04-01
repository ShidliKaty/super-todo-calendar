import {
  Divider,
  HStack,
  Heading,
  List,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";

import { memo, useMemo, useState } from "react";
import AddButton from "../../../../components/AddButton/AddButton";
import { SidebarList } from "../../types/sidebarListTypes";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import ListItemForm from "../ListsItem/ListItemForm";
import { ListsItem } from "../ListsItem/ListsItem";

interface ListsGroupProps {
  lists: SidebarList[];
  heading: string;
  isLoading?: boolean;
  main?: boolean;
  secondary?: boolean;
  updateListName: (updatedList: SidebarList) => void;
  addSidebarList: (newList: SidebarList) => void;
}

export const ListsGroup = memo((props: ListsGroupProps) => {
  const {
    lists,
    heading,
    isLoading,
    secondary,
    main,
    updateListName,
    addSidebarList,
  } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string>("");
  const sortedLists = useMemo(() => {
    return [...lists].sort((a, b) => a.name.localeCompare(b.name));
  }, [lists]);

  const onDeleteList = (id: string) => {
    setIsModalOpen(true);
    setDeletingId(id);
  };

  return (
    <VStack align="flex-start" spacing={5} mt={5}>
      <HStack justify="space-between" w="100%">
        <Heading color="blackAlpha.600" size="md">
          {heading}
        </Heading>
        <AddButton
          main={main}
          secondary={secondary}
          onClick={() => setIsOpenForm(true)}
        />
      </HStack>
      <List spacing={5} w="100%">
        {!isLoading && !lists.length ? (
          <Text color="blackAlpha.600">Нет списков</Text>
        ) : null}
        {isLoading && (
          <VStack align="flex-start" spacing={5}>
            <HStack spacing={2}>
              <SkeletonCircle size="5" />
              <Skeleton width="130px" height="15px" />
            </HStack>
            <HStack spacing={2}>
              <SkeletonCircle size="5" />
              <Skeleton width="130px" height="15px" />
            </HStack>
            <HStack spacing={2}>
              <SkeletonCircle size="5" />
              <Skeleton width="130px" height="15px" />
            </HStack>
          </VStack>
        )}
        {isOpenForm && (
          <ListItemForm
            addSidebarList={addSidebarList}
            onCloseForm={() => setIsOpenForm(false)}
            isNew={true}
          />
        )}
        {sortedLists.map((list) => (
          <ListsItem
            key={list.id}
            list={list}
            onDelete={onDeleteList}
            updateListName={updateListName}
            isMain={main}
          />
        ))}
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          deletingId={deletingId}
          isMainList={main}
        />
      </List>

      <Divider w="100%" borderColor="gray.300" />
    </VStack>
  );
});
