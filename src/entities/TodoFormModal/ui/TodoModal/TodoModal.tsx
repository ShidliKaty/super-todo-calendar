import Modal, { ModalProps } from "../../../../components/Modal/Modal";
import TodoForm from "../TodoForm/TodoForm";

type TodoModalProps = {
  editingId?: string;
  editing?: boolean;
} & Omit<ModalProps, "children">;

const TodoModal = (props: TodoModalProps) => {
  const { editingId, editing, ...modalProps } = props;

  return (
    <Modal {...modalProps}>
      <TodoForm
        onClose={modalProps.onClose}
        editingId={editingId}
        editing={editing}
      />
    </Modal>
  );
};

export default TodoModal;
