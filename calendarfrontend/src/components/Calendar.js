import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css'

const DAYS_SHORT = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

class Calendar extends Component {

// create a list of all events for the day from "Events Data State", i = day_id
  addEventList(dayId) {
    const events = this.props.eventsData[dayId]
    if (events) {
      return events.map(event => {
      // use epoch timestamp as id when using mock data
      const eventId = event.id;
      const startStr = event.start_time
      const endStr = event.end_time
      const eventStr = `${startStr}-${endStr} ${event.description}`
      return <div key={eventId} id={eventId} className="eventdiv">
        <button onClick={(event)=>{this.props.handleDelete(eventId, event)}}>
          <i className="fa fa-trash"></i>
        </button>
        <button onClick={(event, description)=>{this.props.handleEditClick(event, description, eventId, dayId)}}>
         <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </button>
        {eventStr}
      </div>
      }); // end map
    } // end if
  } // end function


// This is to make a div for each day of the calendar. Each day includes
// a click event function that pops up the input form. DayId is the epoch time stamp
// list of events is a child of this div.
  makeWeek(week) {
    return week.days.map(day => {
      const dayId = day.dayStart.valueOf();
      return (
        <div key={dayId} onClick={()=>{this.props.handleClick(dayId)}} className="day">
          {day.dayStart.getDate()}
          {this.addEventList(dayId)}
        </div>
      );
    });
  }


  render() {

    return (
      <div className="App">
        <div>
          <div className="flex row-container month-container">
            <h1>
              <button onClick={()=>{this.props.handleMonthClick(this.props.month.monthPrev)}}>previous month</button>
              {this.props.month.monthStart.toLocaleString(navigator.language, { month: "long" })}
              {' '}
              {this.props.month.monthStart.getFullYear()}
              <button onClick={()=>{this.props.handleMonthClick(this.props.month.monthNext)}}>next month</button>
              <button onClick={()=>{this.props.handleMonthClick(new Date())}}>today</button>
            </h1>
          </div>
          <div className="flex row-container day-container">
          {DAYS_SHORT.map(day =>
            <div className="dayName">{day}</div>
          )}
          </div>
          {this.props.month.weeks.map(week =>
            <div className="flex row-container week-container">
              {this.makeWeek(week)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Calendar;
