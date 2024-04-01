import {
  Button,
  ButtonGroup,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getSidebarLists } from "../../../../SidebarLists/model/selectors/sidebarLists";
import { useAppDispatch } from "../../../../../redux/store";
import { addNewTodo } from "../../../model/services/addNewTodo";
import { getTodoForm } from "../../../model/selectors/todo";
import {
  cancelEdit,
  clearTodoForm,
  updateTodoForm,
} from "../../../model/slices/todoSlice";
import { ChangeEvent, FormEvent, useEffect } from "react";
import { formatDate } from "../../../../../utils/formatDate";
import { Todo } from "../../../types/todoTypes";
import { updateTodo } from "../../../model/services/updateTodo";
import { fetchTodoById } from "../../../model/services/fetchTodoById";
import { useParams } from "react-router-dom";

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

  const { id: paramsId } = useParams();

  useEffect(() => {
    if (editing && editingId) {
      dispatch(fetchTodoById(editingId));
    }
    if (paramsId) {
      dispatch(updateTodoForm({ listId: paramsId }));
    }
    return () => {
      dispatch(clearTodoForm());
    };
  }, [editing, editingId, dispatch, paramsId]);

  const todoForm = useSelector(getTodoForm);

  const onAddTodo = () => {
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

  const onSaveTodo = () => {
    if (!todoForm || todoForm.name === "") return;

    if (editing && editingId) {
      dispatch(updateTodo({ todo: todoForm, id: editingId }));
    }

    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    editing ? onSaveTodo() : onAddTodo();
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
    dispatch(updateTodoForm({ listId: e.target.value || paramsId }));
  };

  return (
    <VStack spacing="15px">
      <Text as="b">
        {editing ? "Редактировать запись" : "Добавить новую запись"}
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack w="500px">
          <Input
            autoFocus
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
            value={todoForm?.listId || paramsId || ""}
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

            <Button onClick={handleSubmit}>
              {editing ? "Сохранить" : "Добавить"}
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
    </VStack>
  );
};

export default TodoForm;
