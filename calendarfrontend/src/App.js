import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Inputform from './components/Inputform';
import MonthModel from './models/MonthModel';
import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props)
    const now = new Date();
    const month = new MonthModel(now);
    this.state = {
      showForm: false,
      showEditForm: false,
      eventsData: {}, // Contains nested obj of day_id:[{event info}, {event info}]
      currentDayId: null,
      currentEditId: null,
      editEventDescription: null,
      month: month,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleMonthClick = this.handleMonthClick.bind(this)
  }


  async componentDidMount() {
    try {
      const allData = await axios.get('http://localhost:3001/events/')
      const dataArr = allData.data.events // response from db

      // function to iterate dataArr to make events obj for state
      const eventsObj = await this.makeEventsObj(dataArr)

      this.setState({
        eventsData: eventsObj
      })

    } catch (error) {
        console.log(error);
      }
  } // end component did mount

  // to click next month
  handleMonthClick(nextMonthTimestamp){
    this.setState({
      month: new MonthModel(nextMonthTimestamp)
    })
  }

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

// when you click on an edit button
  handleEditClick(event, description, id, day_id) {
    event.stopPropagation();
    this.setState({showEditForm: true, currentEditId:id, editEventDescription: description, currentDayId: day_id})
  }

// click each day-div  to add event form
  async handleClick(day_id) {
  // show input form on click event
    await this.setState({
      showForm: true,
      currentDayId: day_id
    })
  }

// close input form
  onClose() {
    this.setState({
      showForm: false,
      showEditForm: false,
    })
  }

  async handleDelete(id, event) {
    try {
      event.stopPropagation(); // stop click event from parent div
      const newData = await axios.delete(`http://localhost:3001/events/${id}`);
      const dataArr = newData.data.event
     //iterate over updated data to make new object
      const eventsObj = await this.makeEventsObj(dataArr)
     //update the state with new object
      this.setState({
        eventsData: eventsObj
      })
    } catch(error) {
      console.log(error);
    }
  };

  async handleSubmitForm(start_time, end_time, description){
    try {

      const current_day = this.state.currentDayId
      let getEvents; // declare variable for resonse data

      const postObj = {
        start_time: start_time,
        end_time: end_time,
        description: description,
        day_id: this.state.currentDayId // day_id keeps track of current day
      } // send input form values to database

      if (this.state.showForm) {
        this.onClose() // close event form
        getEvents = await axios.post('http://localhost:3001/events', postObj)
        // Only make one (post) request to the db & get back response data (instead of making a post & get request)
        // otherwise making two requests to db will slow down performance, send events in response object for individual day only, instead of data
        // for the whole year or whole month, so performance is more optimal
      } else if (this.state.showEditForm) {
        this.onClose() // close event form
        const id = this.state.currentEditId
        getEvents = await axios.put('http://localhost:3001/events/'+id, postObj)
      }

      this.setState(prevState => ({
        eventsData: {
          ...prevState.eventsData, // to not over-ride other day events
          [this.state.currentDayId]: getEvents.data.event
        },
        currentDayId: null, // to prevent bugs
        currentEditId: null
      }))

    } catch(error) {
        console.log(error)
      } // end try catch block

  } // end function


  render() {

    return (
      <div>
        <Calendar handleClick={this.handleClick}
        eventsData={this.state.eventsData}
        handleDelete={this.handleDelete}
        handleEditClick={this.handleEditClick}
        month={this.state.month}
        handleMonthClick={this.handleMonthClick}
        />


        <Inputform
        showForm={this.state.showForm}
        showEditForm={this.state.showEditForm}
        onClose={this.onClose}
        handleSubmitForm={this.handleSubmitForm}
        editEventDescription={this.state.editEventDescription}
        />
      </div>
    );
  }
}

export default App;





