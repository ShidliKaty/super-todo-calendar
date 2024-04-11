import { classNames } from "../../../../utils/classNames";
import cls from "./CalendarEvent.module.scss";

interface CalendarEventProps {
  className?: string;
}

export const CalendarEvent = (props: CalendarEventProps) => {
  const { className } = props;
  const allDay = true;
  return (
    <div
      className={classNames(cls.calendarEvent, {}, [allDay && cls.allDayEvent])}
    >
      <div className={cls.eventName}>Event Name</div>
    </div>
  );
};
