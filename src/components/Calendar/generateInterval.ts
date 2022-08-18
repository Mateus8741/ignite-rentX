import { eachDayOfInterval, format } from "date-fns";

import { DayProps, CalendarProps } from ".";
import { getPlataformDate } from "@/utils/getPlataformDate";
import theme from "@/global/styles/theme";

export function generateInterval(start: DayProps, end: DayProps) {
  let interval: CalendarProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((item) => {
    const date = format(getPlataformDate(item), "yyyy-MM-dd");

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,

        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.main_light
            : theme.colors.main,
      },
    };
  });

  return interval;
}
