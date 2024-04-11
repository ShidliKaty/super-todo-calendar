import { createAsyncThunk } from "@reduxjs/toolkit";
import { SidebarList } from "../../types/sidebarListTypes";
import { baseAPI } from "../../../../../api/baseAPI";
import { fetchSidebarLists } from "./fetchSidebarLists";

export const updateListName = createAsyncThunk<SidebarList[], SidebarList>(
  "lists/updateListName",
  async (
    { id, name }: { id: string; name: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await baseAPI.patch<SidebarList[]>(`lists/${id}`, {
        name,
      });

      if (!data) {
        throw new Error();
      }
      dispatch(fetchSidebarLists());
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  }
);
