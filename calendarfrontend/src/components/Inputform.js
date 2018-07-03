import React, {Component} from 'react';



class Inputform extends Component {
  render() {
    if (!this.props.showForm && !this.props.showEditForm) {
      return null;
    }

    if (this.props.showEditForm) {
      this.header = "Edit Event";
      this.defaultVal = this.props.editEventDescription;
    } else {
      this.header = "Add Event";
      this.defaultVal = null;
    }


    return (
      <div className="flex modal">


          <form className="inputForm"
          onSubmit={event=>{
            event.preventDefault();
            this.props.handleSubmitForm(
            event.target.start_time.value,
            event.target.end_time.value,
            event.target.description.value,
            )}}>
              <ul className="flex-outer-form">
                <li><h1 className="formheader">{this.header}</h1></li>
                <li>
                  <label>Description:</label>
                  <input
                  type="name"
                  placeholder="Event Description"
                  name="description"
                  id='description'
                  defaultValue={this.defaultVal}
                  required
                  />
                </li>

                <li>
                  <label>Start Time:</label>
                  <input id="start_time"
                  type="time"
                  name="start_time"
                  required
                  />
                </li>

                <li>
                  <label>End Time:</label>
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
