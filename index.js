const app = require('./server');
const db = require('./db');

const port = process.env.PORT;

db.sync().then(() => {
    app.listen(port, () => {
        console.log(`RideStatsServer listening on port ${port}`);
    });
});
