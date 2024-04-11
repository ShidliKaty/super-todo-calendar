import { createAsyncThunk } from "@reduxjs/toolkit";
import { SidebarList } from "../../types/sidebarListTypes";
import { baseAPI } from "../../../../../api/baseAPI";
import { fetchMiniLists } from "./fetchMiniLists";

export const deleteMiniList = createAsyncThunk<SidebarList[], string>(
  "miniLists/deleteMiniList",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await baseAPI.delete<SidebarList[]>(`miniLists/${id}`);

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
