import express from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';

import { config } from './config/config';
import Logging from './library/Logging';
import userRoutes from './routes/UserRoutes';
import accountRoutes from './routes/AccountRoutes';
import transactionRoutes from './routes/TransactionRoutes';

const router = express();

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to database');
        StartServer();
    })
    .catch((error) => Logging.error('Error while connecting to database: ' + error));

const StartServer = () => {
    router.use((req, res, next) => {
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`));

        next();
    });

    router.use(express.urlencoded({ extended: true }));

    router.use(express.json());

    router.use((req, res, next) => {
        res.header('Acess-Control-Allow-Origin', '*');
        res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    router.use((req, res, next) => {
        res.on('finish', () => {
            if (res.statusCode >= 500) {
                const uuid = crypto.randomUUID();
                const error = new Error(`Unexpected error, please contact support with the code: ${uuid}`);
                Logging.error(error);
            }
        });
        next();
    });

    router.use('/users', userRoutes);
    router.use('/accounts', accountRoutes);
    router.use('/transactions', transactionRoutes);

    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    router.use((req, res, next) => {
        const uuid = crypto.randomUUID();
        const error = new Error('route not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    router.listen(config.server.port, () => Logging.info(`Server running in port ${config.server.port}`));
};
