import { List, Text } from "@chakra-ui/react";
import { useState } from "react";
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
        {miniTodos.map((todo) => (
          <MiniTodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </>
  );
};

export default MiniTodoList;
