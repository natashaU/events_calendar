const MONTH = 'month';
const WEEK = 'week';
const DAY = 'day';

class MonthModel {
  mergeEvents = (events) => {
    for (const week of this.weeks) {
      for (const day of week.days) {
        for (const event of events) {
          if (event.eventStart >= day.dayStart && event.eventStart < day.dayNext ||
            event.eventEnd >= day.dayStart && event.eventEnd < day.dayNext) {
            day.events.push(event);
          }
        }
      }
    }
  }

  constructor(startDate) {
    const monthStart = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      1,
    );
    const monthNext = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth() + 1,
      1,
    );
    const monthWeekStart = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth(),
      -monthStart.getDay() + 1,
    );
    const monthName = monthStart.toLocaleString(navigator.language, { month: "long" });
    const weeks = [];

    for (
      let weekCurrent = new Date(monthWeekStart.valueOf());
      weekCurrent < monthNext;
      weekCurrent = new Date(
        weekCurrent.getFullYear(),
        weekCurrent.getMonth(),
        weekCurrent.getDate() + 7,
      )
    ) {
      const weekStart = new Date(weekCurrent.valueOf());
      const weekNext = new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 7,
      );
      const days = [];
      for (
        let dayCurrent = new Date(weekStart.valueOf());
        dayCurrent < weekNext;
        dayCurrent = new Date(
          dayCurrent.getFullYear(),
          dayCurrent.getMonth(),
          dayCurrent.getDate() + 1,
        )
      ) {
        const dayStart = new Date(dayCurrent.valueOf());
        const dayNext = new Date(
          dayStart.getFullYear(),
          dayStart.getMonth(),
          dayStart.getDate() + 1,
        );
        days.push({
          kind: DAY,
          dayStart: dayStart,
          dayNext: dayNext,
          events: [],
        });
      }
      weeks.push({
        kind: WEEK,
        weekStart: weekStart,
        weekNext: weekNext,
        days: days,
      });
    }
    this.kind = MONTH;
    this.monthStart = monthStart;
    this.monthNext = monthNext;
    this.monthWeekStart = monthWeekStart;
    this.monthName = monthName;
    this.weeks = weeks;
  }
}

export default MonthModel;
