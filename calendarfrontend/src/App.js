import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Inputform from './components/Inputform';
import Editform from './components/Editform';
import MockEvents from './models/MockEvents';
import MonthModel from './models/MonthModel';
import axios from "axios";

/// TO DO: FIX SPACING, INDENT***



class App extends Component {
  constructor(props) {
    super(props)
    const now = new Date();
    const month = new MonthModel(now);
    const events = new MockEvents(now);
    month.mergeEvents(events);
    this.state = {
      showForm: false,
      eventsData: {}, // Contains nested obj of day_id:[{event info}, {event info}]
      currentDayId: null,
      showEditForm: false,
      currentEditId: null,
      editEvent: null,
      currentMonth: null,
      month: month,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.closeEditForm = this.closeEditForm.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
  }



  async componentDidMount() {
    try {
      const allData = await axios.get('http://localhost:3001/events/')
      const dataArr = allData.data.events // response from db
      console.log(dataArr)
      console.log(this.state.eventsData)

      // function to iterate dataArr to make events obj for state
      const eventsObj = await this.makeEventsObj(dataArr)

      this.setState({
        eventsData: eventsObj
      })

    } catch (error) {
        console.log(error);
      }

  } // end component did mount


  makeEventsObj(dataArr) {
    // data arr = response from get request
    const eventsObj = {}
       // looping through all the response's events and storing them in an
      // nested obj, by Day_ID as the key, stored in "Events Data State."
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
  }





  async handleEditClick(event, description, id,day_id) {
    event.stopPropagation();
    await this.setState({showEditForm: true, currentEditId:id, editEvent: description})
    console.log(this.state.editEvent + ' state')

  }

  closeEditForm(){
    this.setState({showEditForm:false})
  }



// click each day div function
  async handleClick(event) {
    let day_id = event.i
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



  async handleDelete(id,event,day_id) {
    try {
      event.stopPropagation(); // stop click event from parent div
      const newData = await axios.delete(`http://localhost:3001/events/${id}`);
      const dataArr = newData.data.event

    // iterate over updated data to make new object
      const eventsObj = await this.makeEventsObj(dataArr)

    // update the state with new object
      this.setState({
        eventsData: eventsObj
      })

    } catch(error) {
      console.log(error);
    }
  };


// to handle submit form
 async handleEditSubmit(start_time, end_time, description) {
  try  {
    let current_day = this.state.currentDayId

    // hide input form
    this.setState({
      showEditForm: false
    })

    // post info to database
    let id = this.state.currentEditId
    let getEvents = await axios.put('http://localhost:3001/events/'+id, {
    start_time: start_time,
    end_time: end_time,
    description: description
    //day_id: this.state.currentDayId // day_id keeps track of current day
  })
} catch(error) {
    console.log(error)
  }
} // end edit function


// to handle submit form
 async handleSubmit(start_time, end_time, description) {
  try  {

    let current_day = this.state.currentDayId

    // hide input form
    this.setState({
      showForm: false
    })

    // post info to database
    let getEvents = await axios.post('http://localhost:3001/events', {
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
        <Calendar handleClick={this.handleClick}
        eventsData={this.state.eventsData}
        handleDelete={this.handleDelete}
        handleEditClick={this.handleEditClick}
        month={this.state.month}
        />

        <Editform
        editForm={this.state.showEditForm}
        onClose={this.closeEditForm}
        handleEditSubmit={this.handleEditSubmit}
        editEvent={this.state.editEvent}
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


