import { memo, useMemo } from "react";
import { SidebarList } from "../../types/sidebarListTypes";
import {
  HStack,
  List,
  Skeleton,
  SkeletonCircle,
  VStack,
  Text,
} from "@chakra-ui/react";
import ListsItem from "../ListsItem/ListsItem";

interface MyListsProps {
  lists: SidebarList[];
  isLoading: boolean | undefined;
}

export const MyLists = memo(({ lists, isLoading }: MyListsProps) => {
  const sortedLists = useMemo(() => {
    return [...lists].sort((a, b) => a.name.localeCompare(b.name));
  }, [lists]);

  return (
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
});