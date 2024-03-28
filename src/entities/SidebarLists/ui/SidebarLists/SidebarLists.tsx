import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../../../redux/store";
import { ListsGroup } from "../ListsGroup/ListsGroup";
import { useSelector } from "react-redux";
import {
  getSidebarLists,
  getSidebarListsIsError,
  getSidebarListsIsLoading,
} from "../../model/selectors/sidebarLists";
import { getSecondaryLists } from "../../model/selectors/getSecondaryLists";
import { fetchSidebarLists } from "../../model/services/fetchSidebarLists";
import { Text } from "@chakra-ui/react";

const SidebarLists = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSidebarLists());
  }, [dispatch]);

  const lists = useSelector(getSidebarLists);
  const mainLists = useMemo(
    () => lists.filter((list) => !list.secondary),
    [lists]
  );
  const secondaryLists = useSelector(getSecondaryLists);
  const isLoading = useSelector(getSidebarListsIsLoading);
  const error = useSelector(getSidebarListsIsError);

  return (
    <>
      {error && (
        <Text color="red.600">
          Произошла ошибка! Попробуйте перезагрузить страницу
        </Text>
      )}

      <ListsGroup
        isLoading={isLoading}
        lists={mainLists}
        heading={"Мои Списки"}
        main
      />
      <ListsGroup
        isLoading={isLoading}
        lists={secondaryLists}
        heading={"Мои Списочки"}
        secondary
      />
    </>
  );
};

export default SidebarLists;
