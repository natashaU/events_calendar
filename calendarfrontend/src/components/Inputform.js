import React, {Component} from 'react';



class Inputform extends Component {
  render() {
    if (!this.props.showForm) {
      return null;
    }

    //<div className="flex modal">
       // <div className="formdiv">


    return (
      <div className="flex modal">


          <form className="inputForm"
          onSubmit={event=>{
            event.preventDefault();
            this.props.handleSubmit(
            event.target.start_time.value,
            event.target.end_time.value,
            event.target.description.value,
            )}}>
              <ul className="flex-outer-form">
                <li><h1>Add Event</h1></li>
                <li className="description">
                  <label for="Description">Description:</label>
                  <input
                  type="name"
                  placeholder="Event Description"
                  name="description"
                  id='description'
                  required
                  />
                </li>

                <li className="starttime">
                  <label for="start-time">Start Time:</label>
                  <input id="start_time"
                  type="time"
                  name="start_time"
                  required
                  />
                </li>

                <li className="endtime">
                  <label for="end-time">End Time:</label>
                  <input id="end_time"
                  type="time"
                  name="end_time"
                  required
                  />
                </li>
                <li className="btn-container">
                  <button id="submit" className="btnform">Save</button>
                  <button className="btnform" onClick={this.props.onClose}>Cancel</button>
                </li>
            </ul>
          </form>

    </div>
      )
  }
}

export default Inputform;
