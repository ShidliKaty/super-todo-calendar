import { createSelector } from "@reduxjs/toolkit";
import { getSidebarLists } from "./sidebarLists";

export const getSecondaryLists = createSelector(getSidebarLists, (lists) =>
  lists.filter((list) => list.secondary)
);
