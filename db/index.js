const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = db;
