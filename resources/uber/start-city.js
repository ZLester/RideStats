const Sequelize = require('sequelize');
const db = require('../../db');

const StartCity = db.define('start_city', {
    display_name: {
        type: Sequelize.STRING
    },
    latitude: {
        type: Sequelize.REAL
    },
    longitude: {
        type: Sequelize.REAL
    }
}, { underscored: true });

module.exports = StartCity;
