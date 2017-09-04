const session = require('./session');
const logger = require('./logger');

module.exports = (app) => {
    app.use(logger);
    app.use(session);
};
