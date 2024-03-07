import { List } from "@chakra-ui/react";
import TodoItem from "../TodoItem/TodoItem";
import { useAppDispatch } from "../../../../redux/store";
import { useEffect } from "react";
import { fetchTodoLists } from "../../model/services/fetchTodoLists";
import { useSelector } from "react-redux";
import { getTodos } from "../../model/selectors/todos";

const TodoList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodoLists());
  }, [dispatch]);

  const todos = useSelector(getTodos);

  console.log(todos);

  return (
    <List spacing={3} mt="20PX">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
};

export default TodoList;
