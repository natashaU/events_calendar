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
      return <p key={i} className="eventdiv">{event}</p>
    })
     return allEvents
  } else {
    return
  }
}


/*makeWeek(start,end) {
    let firstWeek = [];
    for (let i=start;i<=end;i++) {
      firstWeek.push(i)
    }
  firstWeek = firstWeek.map((num, i) => {
    return <div  key={num} onClick={()=>{this.props.handleClick({num})
      }} className="day">{num}
      {this.addEventList(num)}
      </div>
  })
  return firstWeek
  }*/

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
          <div className="flex row-container">
            <h3>July 1979</h3>
          </div>
          <div className='flex row-container'>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          </div>
          <div className="flex row-container">
            {this.makeWeek(1,7)}
          </div>
          <div className="flex row-container">
            {this.makeWeek(8,14)}
          </div>
          <div className="flex row-container">
           {this.makeWeek(15,21)}
          </div>
          <div className="flex row-container">
            {this.makeWeek(22,28)}
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
