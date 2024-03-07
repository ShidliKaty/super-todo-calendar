export type SidebarList = {
  id: string;
  name: string;
  isEditing?: boolean;
  isNew?: boolean;
};

export interface SidebarListsState {
  lists: SidebarList[];
  isLoading?: boolean;
  error?: string;
}
