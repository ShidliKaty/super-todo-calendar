import { Button, HStack, Text } from "@chakra-ui/react";
import Modal, { ModalProps } from "../../../../../components/Modal/Modal";
import { formatDate } from "../../../../../utils/formatDate";
import { Todo } from "../../../../Todos";
import { CalendarEvent } from "../CalendarEvent/CalendarEvent";

type ViewMoreEventsModalProps = {
  events: Todo[];
  date: Date;
  className: string;
} & Omit<ModalProps, "children">;

const ViewMoreEventsModal = ({
  events,
  date,
  className,
  ...modalProps
}: ViewMoreEventsModalProps) => {
  return (
    <Modal {...modalProps}>
      <HStack justify="space-between" align="center" mb="10px">
        <Text fontSize="14px">{formatDate(date, { dateStyle: "short" })}</Text>
        <Button size="xs" onClick={modalProps.onClose}>
          &times;
        </Button>
      </HStack>
      <div className={className}>
        {events.map((event) => (
          <CalendarEvent key={event.id} event={event} />
        ))}
      </div>
    </Modal>
  );
};

export default ViewMoreEventsModal;
