import { useState } from "react";
import { SidebarList } from "../entities/Sidebar/SidebarLists/types/sidebarListTypes";

type ExpandedLists = {
  [listId: string]: boolean;
};

export const useExpandedLists = (lists: SidebarList[]) => {
  const [expandedLists, setExpandedLists] = useState<ExpandedLists>(() => {
    const initialExpandedLists: ExpandedLists = {};
    lists.forEach((list) => {
      initialExpandedLists[list.id] = true;
    });
    return initialExpandedLists;
  });

  const toggleList = (listId: string) => {
    setExpandedLists((prevState) => ({
      ...prevState,
      [listId]: !prevState[listId],
    }));
  };

  return { expandedLists, toggleList };
};
