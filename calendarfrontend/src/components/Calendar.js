import React, { Component } from 'react';
//import './App.css';








class Calendar extends Component {

makeEventDiv(data,id){
  let day_events = data[id]
  if(day_events){
    for (let obj of day_events){
      return <div className="event-div"><p>{obj.start_time}, {obj.end_time}, {obj.description}</p></div>
    }
  }
}


  makeWeek(start,end) {
    let firstWeek = [];
    for (let i=start;i<=end;i++) {
      firstWeek.push(<div  key={i} onClick={()=>{this.props.handleClick({i})


      }}//keep this // end of onClick
      className="day">{i}





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
            <div onClick={()=>{this.props.handleClick()}} className="day">08</div>
            <div onClick={()=>{alert("You clicked this day: Day 09" )}} className="day">09</div>
            <div onClick={()=>{alert("You clicked this day: Day 10" )}} className="day">10</div>
            <div onClick={()=>{alert("You clicked this day: Day 11" )}} className="day">11</div>
            <div onClick={()=>{alert("You clicked this day: Day 12" )}} className="day">12</div>
            <div onClick={()=>{alert("You clicked this day: Day 13" )}} className="day">13</div>
            <div onClick={()=>{alert("You clicked this day: Day 14" )}} className="day">14</div>
          </div>
          <div className="flex row-container">
            <div onClick={()=>{alert("You clicked this day: Day 15" )}} className="day">15</div>
            <div onClick={()=>{alert("You clicked this day: Day 16" )}} className="day">16</div>
            <div onClick={()=>{alert("You clicked this day: Day 17" )}} className="day">17</div>
            <div onClick={()=>{alert("You clicked this day: Day 18" )}} className="day">18</div>
            <div onClick={()=>{alert("You clicked this day: Day 19" )}} className="day">19</div>
            <div onClick={()=>{alert("You clicked this day: Day 20" )}} className="day">20</div>
            <div onClick={()=>{alert("You clicked this day: Day 21" )}} className="day">21</div>
          </div>
          <div className="flex row-container">
            <div onClick={()=>{alert("You clicked this day: Day 22" )}} className="day">22</div>
            <div onClick={()=>{alert("You clicked this day: Day 23" )}} className="day">23</div>
            <div onClick={()=>{alert("You clicked this day: Day 24" )}} className="day">24</div>
            <div onClick={()=>{alert("You clicked this day: Day 25" )}} className="day">25</div>
            <div onClick={()=>{alert("You clicked this day: Day 26" )}} className="day">26</div>
            <div onClick={()=>{alert("You clicked this day: Day 27" )}} className="day">27</div>
            <div onClick={()=>{alert("You clicked this day: Day 28" )}} className="day">28</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
