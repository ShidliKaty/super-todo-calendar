export type SidebarList = {
  id: string;
  name: string;
  secondary?: boolean;
};

export interface SidebarListsState {
  lists: SidebarList[];
  isLoading?: boolean;
  error?: string;
}
