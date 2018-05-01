const events = require("../models/events");

module.exports = {


  index(req, res) {
    events.findAll()
     .then(events => {
       res.json({
        message: 'ok',
        data: { events },
       });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({message: '400', err});
      });
    },


    getDay(req, res) {
      events.findById(req.params.id)
      .then(event => {
      res.json({
         event,
      });
    }).catch(err => {
        console.log(err);
        res.status(400).json({message: '400', err});
      });
    },


    create(req, res) {
    events.save({
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      description: req.body.description,
      day_id: req.body.day_id
    })
    .then(event => {
      res.json({message: 'ok', data: { event }});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
  }


};
