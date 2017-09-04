const uberRouter = require('../resources/uber/uber-router');
const userRouter = require('../resources/users/user-router');
const authRouter = require('../resources/auth/auth-router');

const uberClient = require('../resources/uber/uber-client');

const requireAccessToken = (req, res, next) => {
    if (!req.session.access_token) {
        return res.redirect('/');
    }
    next();
};
module.exports = (app) => {
    app.use('/api/uber', requireAccessToken, uberRouter);
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/', (req, res) => res.send(`<a href="${uberClient.uber_login_endpoint}">Log In</a><br /><a href="/api/auth/logout">Log Out</a>`));
};
