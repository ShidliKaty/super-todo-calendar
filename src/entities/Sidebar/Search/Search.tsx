import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getTodosSearch } from "../../Todos/model/selectors/todos";
import { ChangeEvent, useCallback } from "react";
import { useDebounce } from "../../../utils/useDebounce";
import { useAppDispatch } from "../../../redux/store";
import { todosSliceActions } from "../../Todos/model/slices/todosSlice";
import { fetchTodos } from "../../Todos/model/services/fetchTodos";

export const Search = () => {
  const dispatch = useAppDispatch();
  const search = useSelector(getTodosSearch);

  const fetchData = useCallback(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const fetchDebouncedData = useDebounce(fetchData, 500);

  const onChangeSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(todosSliceActions.setSearch(e.target.value));
      fetchDebouncedData();
    },
    [fetchDebouncedData, dispatch]
  );

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        value={search}
        onChange={onChangeSearch}
        variant="outline"
        borderColor="purple.300"
        backgroundColor="white"
        borderRadius="50"
        type="search"
        color="black"
        placeholder="Поиск"
        focusBorderColor="purple.600"
        _hover={{ borderColor: "purple.300" }}
      />
    </InputGroup>
  );
};
