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


 async handleSubmit(start_time, end_time, description) {
  try  {

    let current_day = this.state.currentDayId

    this.setState({
      showForm: false
    })

    axios.post('http://localhost:3001/events', {
    start_time: start_time,
    end_time: end_time,
    description: description,
    day_id: this.state.currentDayId
  })

    if (!this.state.eventsData[current_day]) {
        this.setState(prevState => ({
          eventsData: {
            ...prevState.eventsData,
            [this.state.currentDayId]: [{start_time: start_time, end_time: end_time,
          description: description, day_id: current_day}]
          }
        }))


    } else {
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


