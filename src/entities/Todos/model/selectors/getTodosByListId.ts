import { createSelector } from "@reduxjs/toolkit";
import { getTodos } from "./todos";

export const getTodosByListId = () => {
  return createSelector([getTodos, (_, id) => id], (todos, id) => {
    return todos.filter((todo) => id == todo.listId && !todo.completed);
  });
};
