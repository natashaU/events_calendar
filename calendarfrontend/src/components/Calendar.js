import React, { Component } from 'react';
//import './App.css';








class Calendar extends Component {
  /*constructor(props) {
    super(props)
      this.state = {
        dayView: this.props.eventsData
    }

    //this.addEventList = this.addEventList.bind(this);
    //this.makeWeek = this.makeWeek.bind(this);
  }*/

/*var day_id = this.state.currentDayId;
        var eventsData = this.state.eventsData[day_id]

        var sortedEvents= eventsData.map(obj=>{
          var time = obj.start_time;

          var hours = parseInt(time.split(':')[0]);
          var minutes = parseInt(time.split(':')[1]);

          obj.hours = hours;
          obj.minutes = minutes;

          return obj;
        }).sort((a,b) => {
          return (a.hours * 100 + a.minutes) - (b.hours * 100 + b.minutes);
        });//end map function

        //may need to delete this:
        return sortedEvents


        }) // end 2nd then
       //.catch(err=>console.log(err))
       // last then
       .then((sortedEvents)=>{
        var day_id = this.state.currentDayId
        this.setState({
          eventsData: {[day_id]:[sortedEvents]}
        })
        //}*/

/*addEventList(i) {
  var dayData = this.props.eventsData[i]
  if (this.props.eventsData[i]) {
    let eventsArr = [];

    var sortedEvents= dayData.map(obj=>{
          var time = obj.start_time;

          var hours = parseInt(time.split(':')[0]);
          var minutes = parseInt(time.split(':')[1]);

          obj.hours = hours;
          obj.minutes = minutes;

          return obj;
        }).sort((a,b) => {
          return (a.hours * 100 + a.minutes) - (b.hours * 100 + b.minutes);
        });



    for (let obj of sortedEvents) {
      var eventStr= "";
      eventStr = obj.start_time + "-" + obj.end_time + " " + obj.description;
      eventsArr.push(eventStr)
    }

    eventsArr.map((event, i) => {
      <div className="event-list">{event}</div>
    })

    this.setState({
      dayView: {[i]: [eventsArr]}

    })

    return this.state.dayView[i]
  } else {
    return <div>nothing here bro</div>
  }*/





  /*addEventList(i) {
  var dayData = this.props.eventsData[i]
  if (this.props.eventsData[i]) {
    let eventsArr = [];
    for (let obj of dayData) {
      var eventStr= "";
      eventStr = obj.start_time + "-" + obj.end_time + " " + obj.description;
      eventsArr.push(eventStr)
    }


    eventsArr.map((event, i) => {
      <div className="event-list">{event}</div>
    })

     return eventsArr
  } else {
    return <div>nothing here bro</div>
  }


}*/
/*for (let event of this.state.eventsData[current_day]){
        console.log(event.description + '  in for loop')
      }*/
  addEventList(i) {
  var dayData = this.props.eventsData[i]
  if (this.props.eventsData[i]) {
    let eventsArr = [];
    for (let obj of dayData) {
      var eventStr= "";
      eventStr = obj.start_time + "-" + obj.end_time + " " + obj.description;
      eventsArr.push(eventStr)
    }


    eventsArr.map((event, i) => {
      <div className="event-list">{event}</div>
    })

     return eventsArr
  } else {
    return <div>nothing here bro</div>
  }


}




//{this.addEventList(i)} ** put under className"day">{i}

//firstWeek.push(<div  key={i} onClick={()=>{this.props.handleClick({i})
      //}}//keep this // end of onClick
  makeWeek(start,end) {
    let firstWeek = [];
    for (let i=start;i<=end;i++) {
      firstWeek.push(<div  key={i} onClick={()=>{this.props.handleClick({i})


      }}//keep this // end of onClick
      className="day">{i}
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
            <div onClick={()=>{this.props.handleClick(8)}}
            className="day">08

            </div>
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
