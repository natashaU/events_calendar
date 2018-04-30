import React, {Component} from 'react';



class Inputform extends Component {
  render() {
    if (!this.props.showForm) {
      return null;
    }
    console.log(this.props.day_id)

    return (
      <div className="modal">
        <div className='formdiv'>
          <form className="inputForm"
          onSubmit={event=>{
            event.preventDefault();
            this.props.handleSubmit(
            event.target.start_time.value,
            event.target.end_time.value,
            event.target.description.value,
            )}}>
              <input
              type="name"
              placeholder="Event Description"
              name="description"
              id='description'
              required
              />

              <input id="start_time"
              type="time"
              name="start_time"
              required
              />

              <input id="end_time"
              type="time"
              name="end_time"
              required
              />



          <button id="submit" className="btnform">Save!</button>
          </form>
          <button onClick={this.props.onClose}>
              Cancel
           </button>
      </div>
    </div>
      )
  }
}

export default Inputform;
