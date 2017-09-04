const requireAuthentication = (req, res, next) => {
    if (!req.session.access_token) {
        return res.redirect('/');
    }
    next();
};

module.exports = requireAuthentication;
