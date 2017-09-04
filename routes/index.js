const uberRouter = require('../resources/uber/uber-router');
const userRouter = require('../resources/users/user-router');
const authRouter = require('../resources/auth/auth-router');

const uberClient = require('../resources/uber/uber-client');

const requireAuthentication = require('../middleware/require-authentication');

module.exports = (app) => {
    app.use('/api/uber', requireAuthentication, uberRouter);
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/', (req, res) => res.send(`<a href="${uberClient.uber_login_endpoint}">Log In</a><br /><a href="/api/auth/logout">Log Out</a>`));
};
