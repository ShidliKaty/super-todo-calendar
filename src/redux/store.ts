import { configureStore } from "@reduxjs/toolkit";
import { SidebarListsState } from "../entities/SidebarLists/types/sidebarListTypes";
import { sidebarListsSliceReducer } from "../entities/SidebarLists/model/slices/sidebarListsSlice";
import { useDispatch } from "react-redux";
import { TodoListsState } from "../entities/Todos/types/todoTypes";
import { todosSliceReducer } from "../entities/Todos/model/slices/todosSlice";
import { todoSliceReducer } from "../entities/Todos/model/slices/todoSlice";
import { TodoState } from "../entities/Todos/types/todoSchema";
// import { rtkApi } from "../api/rtkApi";

export interface StateSchema {
  sidebarLists: SidebarListsState;
  todos: TodoListsState;
  todo: TodoState;
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
    todos: todosSliceReducer,
    todo: todoSliceReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
