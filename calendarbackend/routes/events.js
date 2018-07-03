var express = require('express');
var eventsRouter = express.Router();
const controller = require('../controllers/eventsController');


eventsRouter
  .route('/')
  .get(controller.index)
  .post(controller.create)


  eventsRouter
  .route('/:id')
  .get(controller.getEvents)
  .put(controller.update)
  .delete(controller.destroy)



module.exports = eventsRouter;
