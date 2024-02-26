export type SidebarList = {
  id: number;
  name: string;
  isEditing?: boolean;
};

export interface SidebarListsState {
  lists: SidebarList[];
  isLoading?: boolean;
  error?: string;
}
