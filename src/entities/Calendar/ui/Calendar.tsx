import { useMemo, useState } from "react";
import { classNames } from "../../../utils/classNames";
import cls from "./Calendar.module.scss";
import { CalendarDay } from "./CalendarDay/CalendarDay";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { Button, ButtonGroup, HStack, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { formatDate } from "../../../utils/formatDate";

interface CalendarProps {
  className?: string;
}

export const Calendar = (props: CalendarProps) => {
  const { className } = props;
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const calendarDays = useMemo(() => {
    const weekStart = startOfWeek(startOfMonth(selectedMonth), {
      weekStartsOn: 1,
    });

    const weekEnd = endOfWeek(endOfMonth(selectedMonth), {
      weekStartsOn: 1,
    });

    return eachDayOfInterval({
      start: weekStart,
      end: weekEnd,
    });
  }, [selectedMonth]);

  return (
    <div className={classNames(cls.calendar, {}, [className])}>
      <HStack justify="flex-start" alignItems="center">
        <ButtonGroup
          colorScheme="purple"
          variant="solid"
          size="sm"
          spacing={1}
          mr="20px"
        >
          <Button onClick={() => setSelectedMonth((c) => subMonths(c, 1))}>
            <ChevronLeftIcon />
          </Button>
          <Button onClick={() => setSelectedMonth(new Date())}>Сегодня</Button>
          <Button onClick={() => setSelectedMonth((c) => addMonths(c, 1))}>
            <ChevronRightIcon />
          </Button>
        </ButtonGroup>
        <Text as="b" fontSize="25px" lineHeight="40px" mr="10px">
          {formatDate(selectedMonth, {
            month: "long",
            year: "numeric",
          })}
        </Text>
      </HStack>
      <div className={cls.calendarDays}>
        {calendarDays.map((day, i) => (
          <CalendarDay
            key={day.getTime()}
            day={day}
            showWeekName={i < 7}
            selectedMonth={selectedMonth}
          />
        ))}
      </div>
    </div>
  );
};
