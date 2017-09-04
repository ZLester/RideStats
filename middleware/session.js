const Session = require('express-session');

const session = Session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    },
});

module.exports = session;
