import Modal, { ModalProps } from "../../../../../components/Modal/Modal";
import TodoForm from "../TodoForm/TodoForm";

type TodoModalProps = {
  editingId?: string;
} & Omit<ModalProps, "children">;

const TodoModal = (props: TodoModalProps) => {
  const { editingId, ...modalProps } = props;

  return (
    <Modal {...modalProps}>
      <TodoForm onClose={modalProps.onClose} editingId={editingId} />
    </Modal>
  );
};

export default TodoModal;
