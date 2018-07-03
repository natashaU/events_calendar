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

// create a list of all events for the day from "Events Data State"
  addEventList(dayId) {
    const events = this.props.eventsData[dayId]
    // map over this.state.dayId.events
    if (events) {
      return events.map(event => {
      const eventId = event.id;
      const startStr = event.start_time;
      const endStr = event.end_time;
      const eventDescription = event.description;

      const eventStr = `${startStr}-${endStr}
      ${eventDescription}`

      return <div key={eventId} id={eventId} className="eventdiv">
        <button onClick={(event)=>{this.props.handleDelete(eventId, event, dayId)}}>
          <i className="fa fa-trash"></i>
        </button>

        <button onClick={(event)=>{this.props.handleEditClick(event, eventDescription, eventId, dayId)}}>
         <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </button>
        {eventStr}
      </div>
      }); // end map
    } // end if
  } // end function


// This is to make a div for each day of the calendar. Each day includes
// a click event function that pops up the input form. DayId is the epoch time stamp at midnight of each day
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
              <button className='arrowBtn' onClick={()=>{this.props.handleMonthClick(this.props.month.monthPrev)}}><i className="fa fa-angle-double-left"></i></button>
              {this.props.month.monthStart.toLocaleString(navigator.language, { month: "long" })}
              {' '}
              {this.props.month.monthStart.getFullYear()}
              <button className='arrowBtn' onClick={()=>{this.props.handleMonthClick(this.props.month.monthNext)}}><i className="fa fa-angle-double-right"></i></button>
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
