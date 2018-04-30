var express = require('express');
var eventsRouter = express.Router();
const controller = require('../controllers/eventsController');


eventsRouter
  .route("/")
  .get(controller.index)
  //.get(controller.getDay)
  .post(controller.create)
  .delete(controller.destroy);

module.exports = eventsRouter;
