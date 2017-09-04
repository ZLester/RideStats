const User = require('../users/user');
const Ride = require('./ride');
const StartCity = require('./start-city');

const uberClient = require('./uber-client');

const getMe = (req, res, next) => {
    res.json(req.session.user);
};

const createRides = (req, res, next) => {
    uberClient.getAllRides(req.session.access_token)
        .then((rides) => {
            return Promise.all([User.findById(req.session.user.id), ...rides.map((ride) => Ride.create(ride))]);
        })
        .then((results) => {
            const [user, ...rides] = results;

            return user.setRides(rides);
        })
        .then((user) => {
            return Ride.findAll({ where: { user_id: user.id }, order: [['id', 'ASC']] });
        })
        .then((rides) => {
            res.status(201).json(rides);
        });
};

module.exports = {
    getMe,
    createRides,
};
