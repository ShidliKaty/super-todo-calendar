import { createAsyncThunk } from "@reduxjs/toolkit";
import { SidebarList } from "../../types/sidebarListTypes";
import { baseAPI } from "../../../../api/baseAPI";
import { fetchMiniLists } from "./fetchMiniLists";

export const updateMiniList = createAsyncThunk<SidebarList[], SidebarList>(
  "miniLists/updateMiniList",
  async (
    { id, name }: { id: string; name: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await baseAPI.patch<SidebarList[]>(`miniLists/${id}`, {
        name,
      });

      if (!data) {
        throw new Error();
      }
      dispatch(fetchMiniLists());
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  }
);
