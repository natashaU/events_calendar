import React, { Component } from 'react';
//import './App.css';


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
        /*.toLocaleTimeString(
        navigator.language,
        {hour: '2-digit', minute:'2-digit'}
      );*/
        const endStr = event.end_time
      /*.toLocaleTimeString(
        navigator.language,
        {hour: '2-digit', minute:'2-digit'}
      );*/
        const eventStr = `${startStr}-${endStr} ${event.description}`
        console.log(eventStr +'eventstr')
        return <div key={eventId} id={eventId} className="eventdiv">{eventStr}</div>
      }) // end map
    } // end if
  } // end add event list


// This is to make a div for each day of the calendar. Each day includes
// a click event function that pops up the input form. i = day number.
// list of events is a child of this div.
  makeWeek(week) {
    return week.days.map(day => {
      //console.log(this.props.eventsData)
      //console.log('howdy')
      let dayId = day.dayStart.valueOf();
      //console.log(dayId + 'dayid')
      //dayId = dayId.toString()
      //console.log(dayId)
      //console.log(this.props.eventsData['1530417600000'])
      //console.log('bye')
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
              {this.props.month.monthStart.toLocaleString(navigator.language, { month: "long" })}
              {' '}
              {this.props.month.monthStart.getFullYear()}
              <button onClick={()=>{this.props.handleMonthClick()}}>next month</button>
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
