import { Todo } from "../../..";
import Modal, { ModalProps } from "../../../../../components/Modal/Modal";
import { TodoForm } from "../TodoForm/TodoForm";

type TodoModalProps = {
  todo?: Todo;
  completeDate?: Date;
} & Omit<ModalProps, "children">;

export const TodoModal = (props: TodoModalProps) => {
  const { todo, completeDate, ...modalProps } = props;

  return (
    <Modal {...modalProps}>
      <TodoForm
        onClose={modalProps.onClose}
        todo={todo}
        completeDate={completeDate}
      />
    </Modal>
  );
};
