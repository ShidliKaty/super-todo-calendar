import { SmallAddIcon } from "@chakra-ui/icons";
import { classNames } from "../../../../utils/classNames";
import cls from "./CalendarDay.module.scss";
import { CalendarEvent } from "../CalendarEvent/CalendarEvent";

interface CalendarDayProps {
  className?: string;
}

export const CalendarDay = (props: CalendarDayProps) => {
  const { className } = props;
  const today = true;
  return (
    <div className={classNames(cls.calendarDay, {}, [className])}>
      <div className={cls.dayHeader}>
        <div className={cls.weekName}>Week</div>
        <div className={classNames(cls.dayNumber, {}, [today && cls.today])}>
          1
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
