import { List } from "@chakra-ui/react";
import { classNames } from "../../lib/classNames";
import TodoItem from "../TodoItem/TodoItem";
import cls from "./TodoList.module.scss";

interface TodoListProps {
  className?: string;
}

const TodoList = (props: TodoListProps) => {
  const { className } = props;
  return (
    <div className={classNames(cls.TodoList, {}, [className])}>
      <List spacing={3}>
        <TodoItem />
        <TodoItem important />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </List>
    </div>
  );
};

export default TodoList;
