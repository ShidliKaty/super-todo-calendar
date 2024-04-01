import { createSelector } from "@reduxjs/toolkit";
import { getTodos } from "./todos";

export const getImportantTodos = createSelector([getTodos], (todos) =>
  todos.filter((todo) => todo.important && !todo.completed)
);
