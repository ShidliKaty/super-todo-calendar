import { StateSchema } from "../../../../../redux/store";

export const getMiniLists = (state: StateSchema) => state.miniLists?.lists;
export const getMiniListsIsLoading = (state: StateSchema) =>
  state.miniLists?.isLoading;
export const getMiniListsIsError = (state: StateSchema) =>
  state.miniLists?.error;
