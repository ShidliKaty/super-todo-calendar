import { List } from "@chakra-ui/react";
import ExpandedList from "../../../../components/ExpandedList/ExpandedList";
import { MiniTodoSubitem } from "../MiniTodoSubItem/MiniTodoSubItem";
import { SubMiniTodo } from "../../types/subMiniTodosSchema";

interface MiniTodoSublistProps {
  hidden: boolean;
  subTodos: SubMiniTodo[];
  completed?: boolean;
}

export const MiniTodoSublist = (props: MiniTodoSublistProps) => {
  const { hidden, subTodos, completed } = props;
  return (
    <ExpandedList isHidden={hidden}>
      <List spacing={3}>
        {subTodos.map((todo) => (
          <MiniTodoSubitem key={todo.id} todo={todo} disabled={completed} />
        ))}
      </List>
    </ExpandedList>
  );
};
