import { createAsyncThunk } from "@reduxjs/toolkit";
import { SidebarList } from "../../types";
import { baseAPI } from "../../../../api/baseAPI";
import { fetchSidebarLists } from "./fetchSidebarLists";

export const addSidebarList = createAsyncThunk<SidebarList, SidebarList>(
  "lists/updateListName",
  async ({ id, name }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.post<SidebarList>("lists", {
        id,
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
