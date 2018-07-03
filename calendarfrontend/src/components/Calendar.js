import React, { Component } from 'react';
//import './App.css';
// import 'font-awesome/css/font-awesome.min.css'

const DAYS_SHORT = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

// todo***
// do database calls when you do month next, month prev, and today buttons.
/// take result of the request and take those events, and pass it into a new month model.

// set values on input form, to const now = new Date()
//eventStart = new Date(now.getFullYear, now.getDate(), now.getHour() +1)
//eventEnd = new Date(now.getFullYear, now.getDate(), now.getHour() +2)
// do not enable submitButton if event.end <= event.Start


class Calendar extends Component {

// create a list of all events for the day from "Events Data State", i = day_id
  addEventList(events) {
    return events.map(event => {
      // use epoch timestamp as id when using mock data
      const eventId = event.eventStart.valueOf();
      const startStr = event.eventStart.toLocaleTimeString(
        navigator.language,
        {hour: '2-digit', minute:'2-digit'}
      );
      const endStr = event.eventEnd.toLocaleTimeString(
        navigator.language,
        {hour: '2-digit', minute:'2-digit'}
      );
      const eventStr = `${startStr}-${endStr} ${event.description}`
      return <div key={eventId} id={eventId} className="eventdiv">
        <button onClick={(event)=>{this.props.handleDelete(eventId, event)}}>
          <i className="fa fa-trash"></i>
        </button>
        <button onClick={(event, description)=>{this.props.handleEditClick(event, description, eventId, 0)}}>edit</button>
        {eventStr}
      </div>
    });
  }


// This is to make a div for each day of the calendar. Each day includes
// a click event function that pops up the input form. i = day number.
// list of events is a child of this div.
  makeWeek(week) {
    return week.days.map(day => {
      const dayId = day.dayStart.valueOf();
      return (
        <div key={dayId} onClick={()=>{this.props.handleClick(day)}} className="day">
          {day.dayStart.getDate()}
          {this.addEventList(day.events)}
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
