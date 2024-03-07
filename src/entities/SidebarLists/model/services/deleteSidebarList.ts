import { createAsyncThunk } from "@reduxjs/toolkit";
import { SidebarList } from "../../types/sidebarListTypes";
import { baseAPI } from "../../../../api/baseAPI";
import { fetchSidebarLists } from "./fetchSidebarLists";

export const deleteSidebarList = createAsyncThunk<SidebarList[], string>(
  "lists/deleteSidebarList",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.delete<SidebarList[]>(`lists/${id}`);

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
