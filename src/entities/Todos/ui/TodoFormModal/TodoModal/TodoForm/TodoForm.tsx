import {
  Button,
  ButtonGroup,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Todo } from "../../../..";
import { useAppDispatch } from "../../../../../../redux/store";
import { formatDate } from "../../../../../../utils/formatDate";
import { getSidebarLists } from "../../../../../Sidebar/SidebarLists/model/selectors/sidebarLists";
import { getTodoForm } from "../../../../model/selectors/todo";
import { addNewTodo } from "../../../../model/services/addNewTodo";
import { updateTodo } from "../../../../model/services/updateTodo";
import {
  cancelEdit,
  clearTodoForm,
  updateTodoForm,
} from "../../../../model/slices/todoSlice";
import { deleteTodo } from "../../../../model/services/deleteTodo";

interface TodoFormProps {
  onClose: () => void;
  todo?: Todo;
  completeDate?: Date;
}

export const TodoForm = (props: TodoFormProps) => {
  const { todo, completeDate, onClose } = props;
  const dispatch = useAppDispatch();
  const createDate = new Date();
  const date = completeDate?.toISOString();
  const { id: paramsId } = useParams();

  const lists = useSelector(getSidebarLists);
  const todoForm = useSelector(getTodoForm);

  useEffect(() => {
    if (todo) {
      dispatch(updateTodoForm({ ...todo }));
    }
    if (paramsId) {
      dispatch(updateTodoForm({ listId: paramsId }));
    }
    return () => {
      dispatch(clearTodoForm());
    };
  }, [dispatch, paramsId, todo]);

  const onAddTodo = () => {
    const newId = crypto.randomUUID();

    const formattedDate = formatDate(createDate, {});

    if (!todoForm?.name || todoForm.name === "") return;

    const newTodo: Todo = {
      ...todoForm,
      id: newId,
      date: formattedDate,
      completed: false,
      important: false,
      todoDate: date,
    };

    dispatch(addNewTodo(newTodo));
    onClose();
  };

  const onSaveTodo = () => {
    if (!todoForm?.name || todoForm.name === "") return;

    if (todo && todo.id) {
      dispatch(updateTodo({ todo: todoForm, id: todo.id }));
    }

    onClose();
  };

  const onDeleteTodo = () => {
    if (todo && todo.id) {
      dispatch(deleteTodo(todo.id));
    }
    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    todo ? onSaveTodo() : onAddTodo();
  };

  const onCancel = () => {
    if (todo) {
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
        {todo ? "Редактировать запись" : "Добавить новую запись"}
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

          {!completeDate && (
            <InputGroup>
              <InputLeftAddon>Дата</InputLeftAddon>
              <Input
                focusBorderColor="purple.600"
                type="date"
                value={todo?.todoDate?.split("T")[0] || ""}
                onChange={onChangeDate}
              />
            </InputGroup>
          )}
          <InputGroup>
            <InputLeftAddon>Время</InputLeftAddon>
            <Input
              focusBorderColor="purple.600"
              type="time"
              value={todoForm?.startTime || ""}
              onChange={onChangeTime}
            />
          </InputGroup>
          <HStack w="100%" justifyContent="space-between">
            {todo && (
              <Button onClick={onDeleteTodo} w="250px">
                Удалить запись
              </Button>
            )}
            <ButtonGroup
              colorScheme="purple"
              w="100%"
              justifyContent="flex-end"
            >
              <Button variant="outline" onClick={onCancel}>
                Отменить
              </Button>

              <Button onClick={handleSubmit}>
                {todo ? "Сохранить" : "Добавить"}
              </Button>
            </ButtonGroup>
          </HStack>
        </VStack>
      </form>
    </VStack>
  );
};
