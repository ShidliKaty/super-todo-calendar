import { createSelector } from "@reduxjs/toolkit";
import { getTodos } from "./todos";

export const getCompletedTodos = createSelector([getTodos], (todos) =>
  todos.filter((todo) => todo.completed)
);
