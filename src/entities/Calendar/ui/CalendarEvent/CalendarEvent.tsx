import { parse } from "date-fns";
import { Mods, classNames } from "../../../../utils/classNames";
import { formatDate } from "../../../../utils/formatDate";
import { Todo, TodoModal } from "../../../Todos";
import cls from "./CalendarEvent.module.scss";
import { useState } from "react";

interface CalendarEventProps {
  event: Todo;
}

export const CalendarEvent = (props: CalendarEventProps) => {
  const { event } = props;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const mods: Mods = {
    [cls.allDayEvent]: !event.startTime,
  };

  return (
    <>
      <button
        className={classNames(cls.calendarEvent, mods, [])}
        onClick={() => setIsEditModalOpen(true)}
      >
        <div className={cls.eventTime}>
          {event.startTime &&
            event.todoDate &&
            formatDate(
              parse(event.startTime, "HH:mm", new Date(event.todoDate)),
              {
                timeStyle: "short",
              }
            )}
        </div>
        <div className={cls.eventName}>{event.name}</div>
      </button>
      <TodoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        todo={event}
      />
    </>
  );
};
