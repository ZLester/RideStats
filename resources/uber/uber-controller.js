const Ride = require('./ride');
const StartCity = require('./start-city');
const uberClient = require('./uber-client');
const User = require('../users/user');

const getMe = (req, res, next) => {
    res.json(req.session.user);
};

const createRides = (req, res, next) => {
    uberClient.getAllRides(req.session.access_token)
        .then((rides) => {
            return Promise.all([
                ...rides.map((ride) => Ride.create(ride, { include: [{ association: Ride.StartCity }] })),
                User.findById(req.session.user.id)
            ]);
        })
        .then((results) => {
            const user = results.pop();

            return user.setRides(results);
        })
        .then((user) => {
            return Ride.findAll({ where: { user_id: user.id }, include: [{ model: StartCity }], order: [['id', 'ASC']] });
        })
        .then((rides) => {
            res.status(201).json(rides);
        });
};

module.exports = {
    getMe,
    createRides,
};
