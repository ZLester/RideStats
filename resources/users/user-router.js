const express = require('express');
const userRouter = express.Router();
const userController = require('./user-controller');

userRouter.route('/')
    .get(userController.getAll)

userRouter.route('/:id')
    .get(userController.getOneById);

userRouter.route('/:id/rides')
    .get(userController.getAllRidesById);

userRouter.route('/promo_code/:promo_code')
    .get(userController.getOneByPromoCode);

module.exports = userRouter;
