const events = require("../models/events");

module.exports = {

// get all events for component did mount

  index(req, res) {
    events.findAll() // from model
     .then(events => {
       res.json({
        events // all events are sent back in json object
       });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({message: '400', err});
      });
    },



    // get events for one day_id to only update the state of that day_id
    getEvents(req, res) {
      const start = new Date(req.params.start);
      const end = new Date(req.params.end);
      events.findByDate(
        start,
        end,
      ).then(events => {
        res.json({
          events
        });
      }).catch(err => {
        console.log(err);
        res.status(400).json({message: '400', err});
      });
    },

// post new event
    create(req, res) {
    events.save({
      event_start: req.body.event_start,
      event_end: req.body.event_end,
      description: req.body.description,
    })
    .then(event => {
      res.json({message: 'ok', data: { event }});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
  },

    destroy(req,res) {
      events.destroy(req.params.id)
      .then(event => {
        res.status(200).json({event});
      })
      .catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
  },

    update(req, res ) {
    const id = parseInt(req.params.id)
    console.log(id, 'update controller');
    events.update(id,req.body)
      .then((event) => {
        res.json({event})

      })
      .catch(err => {
        console.log(err);

      })
  }


};
