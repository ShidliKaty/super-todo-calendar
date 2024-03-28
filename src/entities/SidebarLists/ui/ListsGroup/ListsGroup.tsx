import {
  Divider,
  HStack,
  Heading,
  Icon,
  List,
  Skeleton,
  SkeletonCircle,
  VStack,
  Text,
} from "@chakra-ui/react";

import { memo, useMemo, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import AddButton from "../../../../components/AddButton/AddButton";
import { SidebarList } from "../../types/sidebarListTypes";
import ListItemForm from "../ListsItem/ListItemForm";
import { ListsItem } from "../ListsItem/ListsItem";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

interface ListsGroupProps {
  lists: SidebarList[];
  heading: string;
  isLoading?: boolean;
  main?: boolean;
  secondary?: boolean;
}

export const ListsGroup = memo((props: ListsGroupProps) => {
  const { lists, heading, isLoading, secondary, main } = props;
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
        >
          <Icon as={BsPlusLg} boxSize={6} />
        </AddButton>
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
            onCloseForm={() => setIsOpenForm(false)}
            isNew={true}
            secondary
          />
        )}
        {sortedLists.map((list) => (
          <ListsItem key={list.id} list={list} onDelete={onDeleteList} />
        ))}
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          deletingId={deletingId}
        />
      </List>

      <Divider w="100%" borderColor="gray.300" />
    </VStack>
  );
});
