const User = require('./user');
const Ride = require('../uber/ride.js');

const getAll = (req, res, next) => {
    User.findAll({ include: [{ model: Ride }] })
        .then((users) => {
            res.json(users);
        });
};

const getOneById = (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
        .then((user) => {
            res.json(user);
        })
};

const getAllRidesById = (req, res, next) => {
    const { id } = req.params;

    Ride.findAll({ where: { user_id: id } })
        .then((rides) => {
            res.json(rides);
        });
};

module.exports = {
    getAll,
    getOneById,
    getAllRidesById
};
