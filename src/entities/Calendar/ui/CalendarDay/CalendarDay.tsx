import { SmallAddIcon } from "@chakra-ui/icons";
import { Mods, classNames } from "../../../../utils/classNames";
import cls from "./CalendarDay.module.scss";
import { CalendarEvent } from "../CalendarEvent/CalendarEvent";
import { formatDate } from "../../../../utils/formatDate";
import { endOfDay, isBefore, isSameMonth, isToday } from "date-fns";

interface CalendarDayProps {
  day: Date;
  showWeekName: boolean;
  selectedMonth: Date;
}

export const CalendarDay = (props: CalendarDayProps) => {
  const { day, showWeekName, selectedMonth } = props;

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
        <div className={cls.addEventBtn}>
          <SmallAddIcon />
        </div>
      </div>
      <div className={cls.events}>
        <CalendarEvent />
        <CalendarEvent />
      </div>
    </div>
  );
};
