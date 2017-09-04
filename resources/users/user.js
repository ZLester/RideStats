const Sequelize = require('sequelize');
const db = require('../../db');
const Ride = require('../uber/ride');

const User = db.define('user', {
    picture: {
        type: Sequelize.STRING
    },
    rider_id: {
        type: Sequelize.STRING
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    uuid: {
        type: Sequelize.STRING
    },
    promo_code: {
        type: Sequelize.STRING
    },
    mobile_verified: {
        type: Sequelize.BOOLEAN
    }
}, { underscored: true });

User.Rides = User.hasMany(Ride);

module.exports = User;
