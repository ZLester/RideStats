const uberClient = require('../uber/uber-client');
const User = require('../users/user');
const Ride = require('../uber/ride');
const StartCity = require('../uber/start-city');

const authorize = (req, res, next) => {
    const { code } = req.query;
    if (!code) {
        return next(new Error('Authorization code required.'));
    }
    req.session.code = code;

    uberClient.getAccessToken(code)
        .then((result) => {
            if (result.error) {
                return next(new Error('Invalid authorization code.'));
            }

            req.session.access_token = result.access_token;
            return uberClient.getMe(req.session.access_token)
        })
        .then((user) => {
            return User.findOrCreate({ where: { rider_id: user.rider_id }, defaults: user, include: [{ model: Ride, include: StartCity }] });
        })
        .then((result) => {
            const [user, created] = result;
            req.session.user = user;
            
            res.json(user);
        });
};

const login = (req, res, next) => {
    res.redirect(uberClient.uber_login_endpoint);
};

const logout = (req, res, next) => {
    req.session.destroy();

    res.redirect('/');
};

module.exports = {
    authorize,
    login,
    logout
};
