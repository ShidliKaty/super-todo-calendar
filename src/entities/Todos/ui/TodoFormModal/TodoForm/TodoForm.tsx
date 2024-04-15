import {
  Button,
  ButtonGroup,
  Checkbox,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getSidebarLists } from "../../../../Sidebar/SidebarLists/model/selectors/sidebarLists";
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
  editingId?: string;
}

const TodoForm = (props: TodoFormProps) => {
  const { onClose, editingId } = props;
  const dispatch = useAppDispatch();
  const date = new Date();
  const { id: paramsId } = useParams();

  const lists = useSelector(getSidebarLists);
  const todoForm = useSelector(getTodoForm);

  useEffect(() => {
    if (editingId) {
      dispatch(fetchTodoById(editingId));
    }
    if (paramsId) {
      dispatch(updateTodoForm({ listId: paramsId }));
    }
    return () => {
      dispatch(clearTodoForm());
    };
  }, [editingId, dispatch, paramsId]);

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

    if (editingId) {
      dispatch(updateTodo({ todo: todoForm, id: editingId }));
    }

    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    editingId ? onSaveTodo() : onAddTodo();
  };

  const onCancel = () => {
    if (editingId) {
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

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value).toISOString();
    dispatch(updateTodoForm({ todoDate: date || "" }));
  };

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTodoForm({ startTime: e.target.value || "" }));
  };

  return (
    <VStack spacing="15px">
      <Text as="b">
        {editingId ? "Редактировать запись" : "Добавить новую запись"}
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
          <InputGroup>
            <InputLeftAddon>Дата</InputLeftAddon>
            <Input
              isRequired
              focusBorderColor="purple.600"
              type="date"
              onChange={onChangeDate}
            />
          </InputGroup>
          <HStack w="100%">
            <Checkbox colorScheme="purple" w="150px">
              <Text>Весь день</Text>
            </Checkbox>
            <InputGroup>
              <InputLeftAddon>Время</InputLeftAddon>
              <Input
                isRequired
                focusBorderColor="purple.600"
                type="time"
                onChange={onChangeTime}
              />
            </InputGroup>
          </HStack>
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
              {editingId ? "Сохранить" : "Добавить"}
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
    </VStack>
  );
};

export default TodoForm;
