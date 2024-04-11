import { memo, useCallback, useEffect } from "react";
import { useAppDispatch } from "../../../../../redux/store";
import { ListsGroup } from "../ListsGroup/ListsGroup";
import { useSelector } from "react-redux";
import {
  getSidebarLists,
  getSidebarListsIsError,
  getSidebarListsIsLoading,
} from "../../model/selectors/sidebarLists";
import { fetchSidebarLists } from "../../model/services/fetchSidebarLists";
import { Text } from "@chakra-ui/react";
import { SidebarList } from "../../types/sidebarListTypes";
import { addSidebarList } from "../../model/services/addSidebarList";
import { updateListName } from "../../model/services/updateListName";

export const SidebarLists = memo(() => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSidebarLists());
  }, [dispatch]);

  const lists = useSelector(getSidebarLists);
  const isLoading = useSelector(getSidebarListsIsLoading);
  const error = useSelector(getSidebarListsIsError);

  const addNewSidebarList = useCallback(
    (newList: SidebarList) => {
      dispatch(addSidebarList(newList));
    },
    [dispatch]
  );

  const updateSidebarList = useCallback(
    (updatedList: SidebarList) => {
      dispatch(updateListName(updatedList));
    },
    [dispatch]
  );

  return (
    <>
      {error && (
        <Text color="red.600">
          Произошла ошибка! Попробуйте перезагрузить страницу
        </Text>
      )}

      <ListsGroup
        addSidebarList={addNewSidebarList}
        updateListName={updateSidebarList}
        isLoading={isLoading}
        lists={lists}
        heading={"Мои Списки"}
        main
      />
    </>
  );
});
