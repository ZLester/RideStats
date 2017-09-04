const session = require('./session');
const logger = require('./logger');
const cors = require('cors')();

module.exports = (app) => {
    app.use(cors);
    app.use(logger);
    app.use(session);
};
