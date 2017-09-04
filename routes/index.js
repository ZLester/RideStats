const uberRouter = require('../resources/uber/uber-router');
const userRouter = require('../resources/users/user-router');
const authRouter = require('../resources/auth/auth-router');

const requireAuthentication = require('../middleware/require-authentication');

module.exports = (app) => {
    app.use('/api/uber', requireAuthentication, uberRouter);
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
};
