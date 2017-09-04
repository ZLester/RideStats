const requireAuthentication = (req, res, next) => {
    if (!req.session.user) {
        return res.status(403).json({ error: 'Authentication Required.'});
    }
    next();
};

module.exports = requireAuthentication;
