import React, { Component } from 'react';
//import './App.css';



class Calendar extends Component {


// create a list of all events for the day from "Events Data State", i = day_id
  addEventList(i) {
    var dayData = this.props.eventsData[i]
    if (this.props.eventsData[i]) { // Info for each event on the day. Convert the object
      //format to string, to save it to the div.

      let eventsArr = [];

      // pull out info from each event object and store it in a string.
      // Push each string format to array.
      for (let obj of dayData) {
        let eventStr = obj.start_time + "-" + obj.end_time + " " + obj.description;
        eventsArr.push(eventStr)
      }
        // map over events and store each string info to a div
      var allEvents = eventsArr.map((event, i) => {
        return <p key={i} className="eventdiv">{event}</p>
        })
      return allEvents
    } else {
      return
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
