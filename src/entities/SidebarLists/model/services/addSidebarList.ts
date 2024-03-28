import { createAsyncThunk } from "@reduxjs/toolkit";
import { SidebarList } from "../../types/sidebarListTypes";
import { baseAPI } from "../../../../api/baseAPI";
import { fetchSidebarLists } from "./fetchSidebarLists";

export const addSidebarList = createAsyncThunk<SidebarList, SidebarList>(
  "lists/addSidebarList",
  async ({ id, name, secondary }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.post<SidebarList>("lists", {
        id,
        name,
        secondary,
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
