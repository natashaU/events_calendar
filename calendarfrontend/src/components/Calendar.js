import React, { Component } from 'react';
//import './App.css';



class Calendar extends Component {



  addEventList(i) {
  var dayData = this.props.eventsData[i]
    if (this.props.eventsData[i]) {
      let eventsArr = [];
      for (let obj of dayData) {
      var eventStr= "";
      eventStr = obj.start_time + "-" + obj.end_time + " " + obj.description;
      eventsArr.push(eventStr)
    }
    var allEvents = eventsArr.map((event, i) => {
      return <div key={i} className="eventdiv">{event}</div>
    })
     return allEvents
  } else {
    return
  }
}



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
            <h1>July 1979</h1>
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
