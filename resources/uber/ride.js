const Sequelize = require('sequelize');
const db = require('../../db');
const StartCity = require('./start-city');

const Ride = db.define('ride', {
    status: {
        type: Sequelize.STRING
    },
    product_id: {
        type: Sequelize.STRING
    },
    distance: {
        type: Sequelize.REAL
    },
    start_time: {
        type: Sequelize.INTEGER
    },
    end_time: {
        type: Sequelize.INTEGER
    },
    request_id: {
        type: Sequelize.STRING
    },
    request_time: {
        type: Sequelize.INTEGER
    }
}, { underscored: true });

Ride.StartCity = Ride.hasOne(StartCity);

module.exports = Ride;
