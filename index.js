const app = require('./server');
const db = require('./db');
const logger = require('winston');
const cluster = require('cluster');

const PORT = process.env.PORT;
const MAX_WORKERS = process.env.MAX_WORKERS || require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < MAX_WORKERS; i++) {
        cluster.fork();
    }

    cluster.on('online', (worker) => {
        logger.info(`RideStats worker ${worker.id} started.`);
    });

    cluster.on('exit', (worker, code) => {
        logger.warn(`RideStats worker ${worker.id} died with code ${code}.`);
        cluster.fork();
    });
} else {
    db.sync().then(() => {
        app.listen(PORT, () => {
            logger.info(`RideStats listening on port ${PORT}`);
        });
    });
}
