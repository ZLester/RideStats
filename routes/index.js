const uberRouter = require('../resources/uber/uber-router');
const userRouter = require('../resources/users/user-router');
const authRouter = require('../resources/auth/auth-router');

const requireAuthentication = require('../middleware/require-authentication');

module.exports = (app) => {
    app.use('/api/uber', requireAuthentication, uberRouter);
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/', (req, res, next) => {
        if (req.session.user) {
            return res.send(`Welome to the Uber Stats API, ${req.session.user.first_name}`);
        }
        res.send('Welcome to the Uber Stats API');
    });
    app.use((err, req, res, next) => {
        res.status(400).json({ error: err.message });
    });
};
