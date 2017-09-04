const User = require('./user');
const Ride = require('../uber/ride');
const StartCity = require('../uber/start-city');

const getAll = (req, res, next) => {
    User.findAll()
        .then((users) => {
            res.json(users);
        });
};

const getOneById = (req, res, next) => {
    const { id } = req.params;
    User.findById(id, { include: [{ model: Ride, include: StartCity }] })
        .then((user) => {
            res.json(user);
        })
};

const getOneByPromoCode = (req, res, next) => {
    const { promo_code } = req.params;
    User.findOne({ where: { promo_code }, include: [{ model: Ride, include: StartCity }] })
        .then((user) => {
            if (!user) {
                return res.sendStatus(404);
            }
            res.json(user);
        });
};

const getAllRidesById = (req, res, next) => {
    const { id } = req.params;

    Ride.findAll({ where: { user_id: id }, include: [{ model: StartCity }] })
        .then((rides) => {
            res.json(rides);
        });
};

module.exports = {
    getAll,
    getOneById,
    getOneByPromoCode,
    getAllRidesById
};
