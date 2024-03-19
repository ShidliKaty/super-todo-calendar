import { createSelector } from "@reduxjs/toolkit/react";
import { getSidebarLists } from "./sidebarLists";

export const makeSelectListById = () => {
  return createSelector([getSidebarLists, (_, id) => id], (lists, id) => {
    return lists.find((list) => id == list.id);
  });
};
