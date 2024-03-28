import { createAsyncThunk } from "@reduxjs/toolkit";
import { SidebarList } from "../../types/sidebarListTypes";
import { baseAPI } from "../../../../api/baseAPI";
import { fetchMiniLists } from "./fetchMiniLists";

export const addMiniList = createAsyncThunk<SidebarList, SidebarList>(
  "miniLists/addSidebarList",
  async ({ id, name }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.post<SidebarList>("miniLists", {
        id,
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
