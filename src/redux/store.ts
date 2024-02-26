import { configureStore } from "@reduxjs/toolkit";
import { SidebarListsState } from "../entities/SidebarLists/types";
import { sidebarListsSliceReducer } from "../entities/SidebarLists/model/slices/sidebarListsSlice";
import { useDispatch } from "react-redux";
// import { rtkApi } from "../api/rtkApi";

export interface StateSchema {
  sidebarLists: SidebarListsState;
}

// // создаем отдельную функцию для переиспользования в jest, storybook
// export function createReduxStore(initialState?: StateSchema) {
//   const rootReducers: ReducersMapObject<StateSchema> = {
//     sidebarLists: sidebarListsSliceReducer,
//   };
//   return configureStore({
//     reducer: rootReducers,
//     devTools: true,
//     preloadedState: initialState,
//   });
// }

export const store = configureStore({
  reducer: {
    sidebarLists: sidebarListsSliceReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
