var express = require('express');
var eventsRouter = express.Router();
const controller = require('../controllers/eventsController');


eventsRouter
  .route("/")
  .get(controller.index)
  .post(controller.create)
  //.delete(controller.destroy);

  eventsRouter
  .route("/:id")
  .get(controller.getDay)

module.exports = eventsRouter;
