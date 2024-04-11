import { classNames } from "../../../utils/classNames";
import cls from "./Calendar.module.scss";
import { CalendarDays } from "./CalendarDays/CalendarDays";
import { CalendarHeader } from "./CalendarHeader/CalendarHeader";

interface CalendarProps {
  className?: string;
}

export const Calendar = (props: CalendarProps) => {
  const { className } = props;
  return (
    <div className={classNames(cls.calendar, {}, [className])}>
      <CalendarHeader />
      <CalendarDays />
    </div>
  );
};
