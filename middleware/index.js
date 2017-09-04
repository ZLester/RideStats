const session = require('./session');

module.exports = (app) => {
    app.use(session);
};
