import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Inputform from './components/Inputform';
import axios from "axios";




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      eventsData: {},
      currentDayId: null,




    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);


  }



/*componentDidMount(){
  console.log('im mounting')
  axios.get('http://localhost:3001/events', {
    params: {
      day_id: 1
    }
  })

  .then(res => {
    console.log('im mounting')
    var hello = res.data.data
    for (var obj of hello) {
      console.log(obj.description)
    }
  })
}*/


async handleClick(event) {
  var day_id = event.i

  await this.setState({
    showForm: true,
    currentDayId: day_id
  })




}

onClose() {
  this.setState({
    showForm: false
  })

}

 handleSubmit(start_time, end_time, description) {
  console.log('were in submit')
  console.log(start_time, end_time, description)

  this.setState({
    showForm: false
  })
  axios.post('http://localhost:3001/events', {
    start_time: start_time,
    end_time: end_time,
    description: description,
    day_id: this.state.currentDayId
  })

  .then(res => {

    //console.log(res.data.data.event.day_id);

    var day_id = res.data.data.event.day_id;
    var eventInfo = res.data.data.event;
    console.log(day_id + " day id")
    console.log(eventInfo + '   eventInfofirst')
// add the new event info to the state. Event info is an array of objects.
// eveninfo is an object, with the key being the day_id.
    if (!this.state.eventsData[day_id]) {
      this.setState({
        eventsData: {[day_id]: [eventInfo]}
      })
      } else {
        this.setState((prevState)=>{
          return {
          eventsData: {[day_id]: prevState.eventsData[day_id].concat(eventInfo)}
          }
        }) // end set state
      }// end else

      //.then(console.log(this.state.eventsData))


      })/*.catch(err=>console.log(err)) may need this*/
  // sort the array of event objects for the clicked on day, by their
  // start times.
      .then(()=>{
        var day_id = this.state.currentDayId;
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
        //}
      //  ** end last then **
      }).catch(err=>console.log(err))











      //})// end second then
//.catch(err=>console.log(err))
} // end handle submit funcion






  render() {

    return (
      <div>

        <Calendar handleClick={this.handleClick}
        eventsData={this.state.eventsData}
        />

        <Inputform
        showForm={this.state.showForm}
        onClose={this.onClose}
        handleSubmit={this.handleSubmit}
        />

      </div>
    );
  }
}

export default App;


