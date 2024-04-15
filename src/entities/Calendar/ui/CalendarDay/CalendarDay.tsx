import { SmallAddIcon } from "@chakra-ui/icons";
import { Mods, classNames } from "../../../../utils/classNames";
import cls from "./CalendarDay.module.scss";
import { CalendarEvent } from "../CalendarEvent/CalendarEvent";
import { formatDate } from "../../../../utils/formatDate";
import { endOfDay, isBefore, isSameMonth, isToday } from "date-fns";
import { Todo, TodoModal } from "../../../Todos";
import { useMemo, useState } from "react";

interface CalendarDayProps {
  day: Date;
  showWeekName: boolean;
  selectedMonth: Date;
  events?: Todo[];
}

export const CalendarDay = (props: CalendarDayProps) => {
  const { day, showWeekName, selectedMonth, events } = props;

  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);

  const sortedEvents = useMemo(() => {
    const timeToNumber = (time: string) => parseFloat(time.replace(":", "."));

    if (events) {
      return [...events].sort((a, b) => {
        if (!a.startTime && !b.startTime) {
          return 0;
        } else if (!a.startTime) {
          return -1;
        } else if (!b.startTime) {
          return 1;
        } else {
          return timeToNumber(a.startTime) - timeToNumber(b.startTime);
        }
      });
    }
    return [];
  }, [events]);

  const mods: Mods = {
    [cls.nonMonthDay]: !isSameMonth(day, selectedMonth),
    [cls.oldMonthDay]: isBefore(endOfDay(day), new Date()),
  };
  return (
    <div className={classNames(cls.calendarDay, mods, [])}>
      <div className={cls.dayHeader}>
        {showWeekName && (
          <div className={cls.weekName}>
            {formatDate(day, {
              weekday: "short",
            })}
          </div>
        )}
        <div
          className={classNames(cls.dayNumber, {}, [
            isToday(day) ? cls.today : undefined,
          ])}
        >
          {formatDate(day, {
            day: "numeric",
          })}
        </div>
        <button
          className={cls.addEventBtn}
          onClick={() => setIsNewEventModalOpen(true)}
        >
          <SmallAddIcon />
        </button>
      </div>
      <div className={cls.events}>
        {sortedEvents?.length > 0 &&
          sortedEvents.map((event) => (
            <CalendarEvent key={event.id} event={event} />
          ))}
      </div>
      <TodoModal
        completeDate={day}
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
      />
    </div>
  );
};
