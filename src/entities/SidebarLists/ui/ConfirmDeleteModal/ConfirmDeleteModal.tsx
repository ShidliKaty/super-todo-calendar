import { Button, ButtonGroup, Text, VStack } from "@chakra-ui/react";
import Modal, { ModalProps } from "../../../../components/Modal/Modal";
import { useAppDispatch } from "../../../../redux/store";
import { deleteSidebarList } from "../../model/services/deleteSidebarList";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMiniList } from "../../model/services/deleteMiniList";

type ConfirmModalProps = {
  deletingId: string;
  isMainList?: boolean;
} & Omit<ModalProps, "children">;

const ConfirmDeleteModal = (props: ConfirmModalProps) => {
  const { deletingId, isMainList, ...modalProps } = props;
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const onConfirmDelete = () => {
    if (isMainList) {
      dispatch(deleteSidebarList(deletingId));
    } else {
      dispatch(deleteMiniList(deletingId));
    }
    if (deletingId === id) {
      navigate("/plans");
    }
    modalProps.onClose();
  };

  return (
    <Modal {...modalProps}>
      <VStack spacing={5}>
        <Text as="b">Вы уверены, что хотите удалить весь список?</Text>
        <ButtonGroup>
          <Button onClick={modalProps.onClose}>Нет</Button>
          <Button onClick={onConfirmDelete}>Да</Button>
        </ButtonGroup>
      </VStack>
    </Modal>
  );
};

export default ConfirmDeleteModal;
