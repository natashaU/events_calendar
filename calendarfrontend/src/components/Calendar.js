import React, { Component } from 'react';
//import './App.css';



class Calendar extends Component {

// create a list of all events for the day from "Events Data State", i = day_id
  addEventList(i) {
    var dayData = this.props.eventsData[i] // all events for the day
    if (this.props.eventsData[i]) { // Info for each event on the day, if day events exists,
    // Convert the object format to string & save it to the div.

    // map over each event object to get data
      let allEvents = dayData.map((event, i) => {
        let id = event.id; // db id for delete request
        let eventStr = event.start_time + "-" + event.end_time + " " + event.description;
        return <div key={id} id={id} className="eventdiv">{eventStr}</div>
        })
      return allEvents // return divs to render event list
    }
  }


// This is to make a div for each day of the calendar (28 divs). Each day includes
// a click event function that pops up the input form. i = day number.
// list of events is a child of this div.
  makeWeek(start,end) {
    let firstWeek = [];

    for (let i=start;i<=end;i++) {
      firstWeek.push(<div  key={i} onClick={()=>{this.props.handleClick({i})
      }} className="day">{i}
      {this.addEventList(i)}
      </div>)
    }
   return firstWeek
  }


  render() {

    return (
      <div className="App">
        <div>
          <div className="flex row-container month-container">
            <h1>February 1979</h1>
          </div>
          <div className="flex row-container day-container">
          <div className="dayName">Sun</div>
          <div className="dayName">Mon</div>
          <div className="dayName">Tue</div>
          <div className="dayName">Wed</div>
          <div className="dayName">Thu</div>
          <div className="dayName">Fri</div>
          <div className="dayName">Sat</div>
          </div>
          <div className="flex row-container week-container">
            {this.makeWeek(1,7)}
          </div>
          <div className="flex row-container week-container">
            {this.makeWeek(8,14)}
          </div>
          <div className="flex row-container week-container">
           {this.makeWeek(15,21)}
          </div>
          <div className="flex row-container week-container">
            {this.makeWeek(22,28)}
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
