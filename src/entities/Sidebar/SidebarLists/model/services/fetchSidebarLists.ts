/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SidebarList } from "../../types/sidebarListTypes";
import { baseAPI } from "../../../../../api/baseAPI";

export const fetchSidebarLists = createAsyncThunk<SidebarList[]>(
  "lists/fetchSidebarLists",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await baseAPI.get<SidebarList[]>("lists");

      if (!data) {
        throw new Error();
      }
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  }
);
