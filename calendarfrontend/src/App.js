import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Inputform from './components/Inputform';
import MockEvents from './models/MockEvents';
import MonthModel from './models/MonthModel';
import axios from "axios";



class App extends Component {
  constructor(props) {
    super(props)
    const now = new Date();
    const month = new MonthModel(now);
    const events = new MockEvents(now);
    //month.mergeEvents(events);
    this.state = {
      showForm: false,
      eventsData: {}, // Contains nested obj of day_id:[{event info}, {event info}]
      currentDayId: null,
      month: month,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }


 // loading events data from database
  async componentDidMount() {
    try {
      const allData = await axios.get('http://localhost:3001/events/')
      const dataArr = allData.data.events // response from db



      // looping through all the response's events and storing them in an
      // nested obj, by Day_ID as the key, stored in "Events Data State."
      const makeEventsObj = await (() => {
        const eventsObj = {}

        for (let obj of dataArr) {
          if (!eventsObj[obj.day_id]){
            eventsObj[obj.day_id] = [obj] // day_id is the key, the value is an array of nested objects.
          } else {
            let old_val = eventsObj[obj.day_id];
            eventsObj[obj.day_id] = old_val.concat(obj) // concat if events exist
            // so old event info is not over-written
          }
        }
        return eventsObj
      })

      let eventsObj = await makeEventsObj()

      this.setState({
        eventsData: eventsObj
      })

      //const month = this.state.month

      //month.mergeEvents(this.state.eventsData)
      //month.mergeEvents(this.state.eventsData)

      console.log(this.state.eventsData)

    } catch (error) {
        console.log(error);
      }

  } // end component did mount


// click each day div function
async handleClick(day_id) {
  //var day_id = event.i


// show input form on click event
  await this.setState({
    showForm: true,
    currentDayId: day_id
  })
}

// close input form
onClose() {
  this.setState({
    showForm: false
  })
}


// to handle submit form
 async handleSubmit(start_time, end_time, description) {
  try  {

    let current_day = this.state.currentDayId

    // hide input form
    this.setState({
      showForm: false
    })

    // post info to database
    await axios.post('http://localhost:3001/events', {
    start_time: start_time,
    end_time: end_time,
    description: description,
    day_id: this.state.currentDayId // day_id keeps track of current day
  })

// Setting the state of eventsData with updated info from form. Adding new event to state.
// if the current_day id doesn't exist, just add one event to state.
    if (!this.state.eventsData[current_day]) {
        this.setState(prevState => ({
          eventsData: {
            ...prevState.eventsData, // keep all info of events intact
            // only update day_id objects
            [this.state.currentDayId]: [{ start_time: start_time, end_time: end_time,
          description: description, day_id: current_day}]
          }
        }))


    } else {
      // if day_id exists, get all event info from database to reflect new
      // event that was just added
      let getEvents = await axios.get('http://localhost:3001/events/'+current_day);
      this.setState(prevState => ({
        eventsData: {
          ...prevState.eventsData,
          [this.state.currentDayId]: getEvents.data.event
        }
      }))
    } // end if-else statement

  } catch (error) {
        console.log(error);
      }

} // end handle-submit function



  render() {

    return (
      <div>
        <Calendar
          handleClick={this.handleClick}
          eventsData={this.state.eventsData}
          month={this.state.month}
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


