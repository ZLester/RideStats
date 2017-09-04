const morgan = require('morgan');

const loggingType = process.env.NODE_ENV === 'dev'
    ? 'dev'
    : 'tiny';

module.exports = morgan(loggingType);
