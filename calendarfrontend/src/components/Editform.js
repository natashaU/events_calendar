import React, {Component} from 'react';



class Editform extends Component {
  constructor(props){
    super(props)
    this.state = {
      defaultval: this.props.editEvent
    }

  }



  render() {
    if (!this.props.editForm) {
      return null;
    }


    return (

      <div className="flex modal">


          <form className="inputForm"
          onSubmit={event=>{
            event.preventDefault();
            this.props.handleEditSubmit(
            event.target.start_time.value,
            event.target.end_time.value,
            event.target.description.value,

            )}}>
              <ul className="flex-outer-form">
                <li><h1 className="formheader">Edit Event</h1></li>
                <li>
                  <label>Description:</label>
                  <input
                  type="name"
                  name="description"
                  id='description'
                  defaultValue={this.state.defaultval}
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

export default Editform;
