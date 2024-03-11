import { useSelector } from "react-redux";
import Modal, { ModalProps } from "../../components/Modal/Modal";
import {
  VStack,
  Text,
  FormControl,
  Input,
  Textarea,
  Select,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { getSidebarLists } from "../SidebarLists/model/selectors/sidebarLists";
import { FormEvent, useRef } from "react";
import { Todo } from "../Todos/types/todoTypes";
import { formatDate } from "../../utils/formatDate";

type TodoModalProps = {
  date: Date;
} & Omit<ModalProps, "children">;

const TodoModal = (props: TodoModalProps) => {
  const { date, ...modalProps } = props;
  const lists = useSelector(getSidebarLists);

  const todoRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const todo = todoRef.current?.value;
    const note = noteRef.current?.value;
    const listName = selectRef.current?.value;
    const newId = crypto.randomUUID();

    const formattedDate = formatDate(date, {});

    if (!todo || todo === "") return;

    const newTodo: Todo = {
      id: newId,
      name: todo,
      date: formattedDate,
      note: note || "",
      completed: false,
      important: false,
      listId: listName,
    };

    console.log(newTodo);
  };
  return (
    <Modal {...modalProps}>
      <VStack spacing="15px">
        <Text as="b">Добавить новую запись</Text>
        <FormControl onSubmit={handleSubmit}>
          <VStack w="500px">
            <Input
              ref={todoRef}
              placeholder="Новая запись"
              focusBorderColor="purple.600"
            />
            <Textarea
              ref={noteRef}
              placeholder="Заметки"
              focusBorderColor="purple.600"
            />
            <Select
              ref={selectRef}
              placeholder="Выберите список"
              focusBorderColor="purple.600"
            >
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </Select>
            <ButtonGroup
              colorScheme="purple"
              w="100%"
              justifyContent="flex-end"
            >
              <Button variant="outline" onClick={modalProps.onClose}>
                Отменить
              </Button>
              <Button onClick={handleSubmit}>Добавить</Button>
            </ButtonGroup>
          </VStack>
        </FormControl>
      </VStack>
    </Modal>
  );
};

export default TodoModal;
