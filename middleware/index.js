const Session = require('express-session');

const session = Session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    },
});

module.exports = (app) => {
    app.use(session);
};
