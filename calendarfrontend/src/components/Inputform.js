import React, {Component} from 'react';



class Inputform extends Component {
  render() {
    if (!this.props.showForm) {
      return null;
    }


    return (
      <div className="flex modal">


          <form className="inputForm"
          onSubmit={event=>{
            event.preventDefault();
            this.props.handleSubmit(
            event.target.event_start.value,
            event.target.event_end.value,
            event.target.description.value,
            )}}>
              <ul className="flex-outer-form">
                <li><h1 className="formheader">Add Event</h1></li>
                <li>
                  <label>Description:</label>
                  <input
                  type="name"
                  placeholder="Event Description"
                  name="description"
                  id='description'
                  required
                  />
                </li>

                <li>
                  <label>Start Time:</label>
                  <input id="event_start"
                  type="datetime-local"
                  name="event_start"
                  required
                  />
                </li>

                <li>
                  <label>End Time:</label>
                  <input id="event_end"
                  type="datetime-local"
                  name="event_end"
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
