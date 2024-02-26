import { StateSchema } from "../../../../redux/store";

export const getSidebarLists = (state: StateSchema) =>
  state.sidebarLists?.lists;
export const getSidebarListsIsLoading = (state: StateSchema) =>
  state.sidebarLists?.isLoading;
export const getSidebarListsIsError = (state: StateSchema) =>
  state.sidebarLists?.error;
