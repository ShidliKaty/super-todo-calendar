import { List, Text } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import AddButton from "../../../../components/AddButton/AddButton";
import { MiniTodo } from "../../types/miniTodosSchema";
import MiniTodoItem from "../MiniTodoItem/MiniTodoItem";
import { MiniTodoListForm } from "../MiniTodoListForm/MiniTodoListForm";

interface MiniTodoListProps {
  miniTodos: MiniTodo[];
  isLoading?: boolean;
  error?: string;
  listId?: string;
}

const MiniTodoList = ({ miniTodos, isLoading, listId }: MiniTodoListProps) => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const sortTodosByCompleted = useCallback((todos: MiniTodo[]) => {
    todos.sort((a, b) => {
      if (a.completed === b.completed) {
        return 0;
      }

      if (!a.completed) {
        return -1;
      }

      return 1;
    });

    return todos;
  }, []);

  const sortedTodos = useMemo(
    () => sortTodosByCompleted(miniTodos),
    [miniTodos, sortTodosByCompleted]
  );

  return (
    <>
      <AddButton secondary onClick={() => setIsOpenForm(true)} />

      {!isLoading && miniTodos.length === 0 ? (
        <Text mt={5}>Нет записей</Text>
      ) : null}

      {isOpenForm && (
        <MiniTodoListForm
          listId={listId}
          isNew
          onCloseForm={() => setIsOpenForm(false)}
        />
      )}

      <List spacing={3} my="20px">
        {sortedTodos.map((todo) => (
          <MiniTodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </>
  );
};

export default MiniTodoList;
