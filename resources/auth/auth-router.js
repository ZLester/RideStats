const express = require('express');
const authRouter = express.Router();

const authController = require('./auth-controller');

authRouter.route('/callback')
    .get(authController.authorize);

authRouter.route('/login')
    .get(authController.login);

authRouter.route('/logout')
    .get(authController.logout);

module.exports = authRouter;
