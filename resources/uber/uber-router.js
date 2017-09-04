const express = require('express');
const uberRouter = express.Router();
const uberController = require('./uber-controller');

uberRouter.route('/me')
    .get(uberController.getMe);

uberRouter.route('/rides')
    .get(uberController.createRides);

module.exports = uberRouter;
