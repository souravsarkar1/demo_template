import express from 'express';
import cors from 'cors';
import logger from './loaders/logger';
import { NODE_ENV, PORT } from './config';
import { initDb } from './loaders/db';





const app = express();

const corsOptions = {
    origin: ['*'], // This allows all origins. In production, specify your frontend URL.
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
};

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors());

export async function init() {
    try {
        console.log('starting the server');
        logger.info(`init in ${NODE_ENV} env`);

        await initDb();
        // await EmployeeExpense.sync({ force: true }).then(() => {
        //   logger.info('Database & tables created!');
        // });
        initRoutes();
        initServer();
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

function initServer() {
    app.listen(PORT, () => {
        logger.info(`server is running at http://localhost:${PORT}`);
    });
}

function initRoutes() {
    app.get(`/health`, (req, res) => {
        res.send('OK');
    });

    app.use((err, req, res, next) => {
        res.status(500).json({ error: err.message || err });
        next();
    });
}

init();
