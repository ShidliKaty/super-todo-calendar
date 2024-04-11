import { classNames } from "../../../../utils/classNames";
import { CalendarDay } from "../CalendarDay/CalendarDay";
import cls from "./CalendarDays.module.scss";

interface CalendarDaysProps {
  className?: string;
}

export const CalendarDays = (props: CalendarDaysProps) => {
  const { className } = props;
  return (
    <div className={classNames(cls.calendarDays, {}, [className])}>
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
      <CalendarDay />
    </div>
  );
};
