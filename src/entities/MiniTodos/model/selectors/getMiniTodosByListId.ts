import { createSelector } from "@reduxjs/toolkit/react";
import { getMiniTodos } from "./miniTodos";

export const getMiniTodosByListId = () => {
  return createSelector([getMiniTodos, (_, id) => id], (miniTodos, id) => {
    return miniTodos.filter((miniTodo) => id == miniTodo.miniListId);
  });
};
