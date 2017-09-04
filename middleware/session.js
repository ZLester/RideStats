const Session = require('express-session');
const RedisStore = require('connect-redis')(Session);
const redis = require('redis');

const client = redis.createClient(process.env.REDIS_URL || null);

const session = Session({
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({ client, ttl: 60000 }),
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60000,
    },
});

module.exports = session;
