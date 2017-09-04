const requireAuthentication = (req, res, next) => {
    if (!req.session.user) {
        return res.status(403).json({ message: 'Authentication Required.'});
    }
    next();
};

module.exports = requireAuthentication;
