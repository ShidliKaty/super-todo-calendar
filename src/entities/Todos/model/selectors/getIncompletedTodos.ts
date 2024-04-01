import { createSelector } from "@reduxjs/toolkit";
import { getTodos } from "./todos";

export const getIncompletedTodos = createSelector([getTodos], (todos) =>
  todos.filter((todo) => !todo.completed)
);
