import { memo, useCallback, useEffect } from "react";
import { useAppDispatch } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { SidebarList } from "../../types/sidebarListTypes";
import { ListsGroup } from "../ListsGroup/ListsGroup";
import { Text } from "@chakra-ui/react";
import { fetchMiniLists } from "../../model/services/fetchMiniLists";
import {
  getMiniLists,
  getMiniListsIsError,
  getMiniListsIsLoading,
} from "../../model/selectors/miniLists";
import { addMiniList } from "../../model/services/addMiniList";
import { updateMiniList } from "../../model/services/updateMiniList";

export const MiniLists = memo(() => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMiniLists());
  }, [dispatch]);

  const lists = useSelector(getMiniLists);
  const isLoading = useSelector(getMiniListsIsLoading);
  const error = useSelector(getMiniListsIsError);

  const addNewSidebarList = useCallback(
    (newList: SidebarList) => {
      dispatch(addMiniList(newList));
    },
    [dispatch]
  );

  const updateSidebarList = useCallback(
    (updatedList: SidebarList) => {
      dispatch(updateMiniList(updatedList));
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
        heading={"Мои Списочки"}
        secondary
      />
    </>
  );
});
