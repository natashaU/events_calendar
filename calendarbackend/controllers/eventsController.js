const events = require("../models/events");

module.exports = {

// get all events for component did mount
  index(req, res) {
    events.findAll() // from model
     .then(events => {
       res.json({
        events // all events are sent back in json object
       });
      }).catch(err => {
        console.log(err);
        res.status(400).json({message: '400', err});
      });
    },


    // get events for one day_id to only update the state of that day_id
    getDay(req, res) {
      const id = parseInt(req.params.id)
      events.findById(id)
      .then(event => {
      res.json({
        event
      });
    }).catch(err => {
        console.log(err);
        res.status(400).json({message: '400', err});
      });
    },

// post new event
    create(req, res) {
    events.save({
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      description: req.body.description,
      day_id: req.body.day_id
    })
    .then(event => {
      res.json({ event });
    }).catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
  },
     // delete event
    destroy(req,res) {
      events.destroy(req.params.id)
      .then(event => {
        res.status(200).json({message:'200'});
      }).catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
  },
    // edit event
    update(req, res ) {
    const id = parseInt(req.params.id)
    events.update(id,req.body)
      .then((event) => {
        res.json({event})
      }).catch(err => {
        console.log(err);
      })
  }
};
