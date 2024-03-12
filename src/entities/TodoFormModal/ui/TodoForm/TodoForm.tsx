import {
  Button,
  ButtonGroup,
  FormControl,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getSidebarLists } from "../../../SidebarLists/model/selectors/sidebarLists";
import { useAppDispatch } from "../../../../redux/store";
import { addNewTodo } from "../../../Todos/model/services/addNewTodo";
import { getTodoForm } from "../../model/selectors/todo";
import {
  cancelEdit,
  clearTodoForm,
  updateTodoForm,
} from "../../model/slices/todoSlice";
import { ChangeEvent, FormEvent, useEffect } from "react";
import { formatDate } from "../../../../utils/formatDate";
import { Todo } from "../../../Todos/types/todoTypes";
import { updateTodo } from "../../model/services/updateTodo";
import { fetchTodoById } from "../../model/services/fetchTodoById";

interface TodoFormProps {
  onClose: () => void;
  editing?: boolean;
  editingId?: string;
}

const TodoForm = (props: TodoFormProps) => {
  const { onClose, editing, editingId } = props;

  const date = new Date();
  const lists = useSelector(getSidebarLists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editing && editingId) {
      dispatch(fetchTodoById(editingId));
    }
    return () => {
      dispatch(clearTodoForm());
    };
  }, [editing, editingId, dispatch]);

  const todoForm = useSelector(getTodoForm);

  const onAddTodo = (e: FormEvent) => {
    e.preventDefault();

    const newId = crypto.randomUUID();

    const formattedDate = formatDate(date, {});

    if (!todoForm || todoForm.name === "") return;

    const newTodo: Todo = {
      ...todoForm,
      id: newId,
      date: formattedDate,
      completed: false,
      important: false,
    };

    dispatch(addNewTodo(newTodo));
    onClose();
  };

  const onSaveTodo = (e: FormEvent) => {
    e.preventDefault();

    if (!todoForm || todoForm.name === "") return;

    if (editing && editingId) {
      dispatch(updateTodo({ todo: todoForm, id: editingId }));
    }

    onClose();
  };

  const onCancel = () => {
    if (editing) {
      dispatch(cancelEdit());
    }
    onClose();
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTodoForm({ name: e.target.value || "" }));
  };

  const onChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateTodoForm({ note: e.target.value || "" }));
  };

  const onChangeList = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateTodoForm({ listId: e.target.value || undefined }));
  };

  return (
    <VStack spacing="15px">
      <Text as="b">
        {editing ? "Редактировать запись" : "Добавить новую запись"}
      </Text>
      <FormControl>
        <VStack w="500px">
          <Input
            isRequired
            placeholder="Новая запись"
            focusBorderColor="purple.600"
            value={todoForm?.name || ""}
            onChange={onChangeName}
          />
          <Textarea
            placeholder="Заметки"
            focusBorderColor="purple.600"
            value={todoForm?.note || ""}
            onChange={onChangeNote}
          />
          <Select
            placeholder="Выберите список"
            focusBorderColor="purple.600"
            value={todoForm?.listId || ""}
            onChange={onChangeList}
          >
            {lists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </Select>
          <ButtonGroup colorScheme="purple" w="100%" justifyContent="flex-end">
            <Button variant="outline" onClick={onCancel}>
              Отменить
            </Button>
            {editing ? (
              <Button onClick={onSaveTodo}>Сохранить</Button>
            ) : (
              <Button onClick={onAddTodo}>Добавить</Button>
            )}
          </ButtonGroup>
        </VStack>
      </FormControl>
    </VStack>
  );
};

export default TodoForm;
