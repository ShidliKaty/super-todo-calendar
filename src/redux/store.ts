import { configureStore } from "@reduxjs/toolkit";
import { SidebarListsState } from "../entities/SidebarLists/types/sidebarListTypes";
import { sidebarListsSliceReducer } from "../entities/SidebarLists/model/slices/sidebarListsSlice";
import { useDispatch } from "react-redux";
import { TodoListsState } from "../entities/Todos/types/todoTypes";
import { todosSliceReducer } from "../entities/Todos/model/slices/todosSlice";
import { todoSliceReducer } from "../entities/Todos/model/slices/todoSlice";
import { TodoState } from "../entities/Todos/types/todoSchema";
import { miniListsSliceReducer } from "../entities/SidebarLists/model/slices/miniListsSlice";
import { MiniTodoListsState } from "../entities/MiniTodos/types/miniTodosSchema";
import { miniTodosSliceReducer } from "../entities/MiniTodos/model/slices/miniTodosSlice";
import { subMiniTodosSliceReducer } from "../entities/MiniTodos/model/slices/subMiniTodosSlice";
import { SubMiniTodosState } from "../entities/MiniTodos/types/subMiniTodosSchema";
// import { rtkApi } from "../api/rtkApi";

export interface StateSchema {
  sidebarLists: SidebarListsState;
  miniLists: SidebarListsState;
  todos: TodoListsState;
  todo: TodoState;
  miniTodos: MiniTodoListsState;
  subMiniTodos: SubMiniTodosState;
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
    miniLists: miniListsSliceReducer,
    todos: todosSliceReducer,
    todo: todoSliceReducer,
    miniTodos: miniTodosSliceReducer,
    subMiniTodos: subMiniTodosSliceReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
