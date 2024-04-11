import { createSelector } from "@reduxjs/toolkit/react";
import { StateSchema } from "../../../../../redux/store";
import { SidebarList } from "../../types/sidebarListTypes";

export const makeSelectListById = (
  getListSelector: (state: StateSchema) => SidebarList[]
) => {
  return createSelector([getListSelector, (_, id) => id], (lists, id) => {
    return lists.find((list) => id == list.id);
  });
};
