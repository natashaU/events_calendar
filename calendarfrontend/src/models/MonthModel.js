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
    // JavaScript Date `set` functions mutate and cause unexpected
    // changes in any Date referenced elsewhere. Only use `new Date()`
    // to make a copy of an existing date. For any date variable
    // declared, always make a new copy

    // For any `startDate` find the first day of its month
    const monthStart = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      1, // get 1st day of the month
    );

    // Building up a month model means knowing when to stop
    // This is the first of the next month
    const monthNext = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth() + 1,
      1,
    );

    const monthPrev = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth() - 1,
      1,
    );

    // Get the preceeding days from the month prior for the full week of the first day of Month.
    const monthWeekStart = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth(),
      // JavaScript `Date` uses a rollover, starting at `1`, to set the day of the month
      // To find the last day of May, for example, without knowing if it has 31 days,
      // the date can be set to the 0-th day of June. JavaScript will move the day
      // back one day from 1 June. This can be used to go further back to the first Sunday in May.
      // If the day of the week of 1 June is Friday, `getDay` will return `5`. Setting the
      // date to the negavtive 5th, plus 1 (date rollover starts at 1), the negative 4th day
      // of June will roll the day backward to 27 May
      -monthStart.getDay() + 1,
    );

    // Prepare to build model for each week in the month
    const weeks = [];

    for (
      // To get the left padding of the last days of the previous month in the first row
      // start with `monthWeekStart`, 27 May in previous example.
      let weekCurrent = new Date(monthWeekStart.valueOf());
      // Always get weeks in chunks of seven days to get the right padding on the last week of
      // the month. But, stop looping when we have gone past the week that includes the first
      // day of the next month
      weekCurrent < monthNext;
      // Increment the week
      weekCurrent = new Date(
        weekCurrent.getFullYear(),
        weekCurrent.getMonth(),
        weekCurrent.getDate() + 7, // Add 7 to the previous week start date
      )
    ) {
      // Make a copy of this iteration's start date
      const weekStart = new Date(weekCurrent.valueOf());
      // Process the days until the first day of the next week
      const weekNext = new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 7,
      );

      // Prepare to build model for each day in week
      const days = [];
      for (
        let dayCurrent = new Date(weekStart.valueOf());
        // Stop creating days when the next week is reached
        dayCurrent < weekNext;
        // Increment the days
        dayCurrent = new Date(
          dayCurrent.getFullYear(),
          dayCurrent.getMonth(),
          dayCurrent.getDate() + 1, // Add one day to the previous iteration
        )
      ) {
        // Make a copy of this iteration's start date
        const dayStart = new Date(dayCurrent.valueOf());
        // Make a value for the next day. This is useful to know if and event
        // falls within this day's bounderies
        const dayNext = new Date(
          dayStart.getFullYear(),
          dayStart.getMonth(),
          dayStart.getDate() + 1,
        );
        // Push this day model unto the `days` Array
        days.push({
          kind: DAY,
          dayStart: dayStart,
          dayNext: dayNext,
          events: [],
        });
      }
      // The days are created for this week.
      // Push this week model unto the `weeks` Array
      weeks.push({
        kind: WEEK,
        weekStart: weekStart,
        weekNext: weekNext,
        days: days,
      });
    }
    // These are the properties to expose to the outside
    this.kind = MONTH;
    this.monthStart = monthStart;
    this.monthNext = monthNext;
    this.monthWeekStart = monthWeekStart;
    this.monthPrev = monthPrev;
    this.weeks = weeks;
  }
}

export default MonthModel;
