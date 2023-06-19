import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import * as http from 'http';
import * as cron from 'node-cron';
import TelegramBot from 'node-telegram-bot-api';
import swaggerUi from 'swagger-ui-express';

import { myDataSource } from '../app-data-source-dev';
import './shared/container/index';
import { AppError } from './erros/AppError';
import { routes } from './routes/index.routes';
// import betsService from './services/betsService';
import { betanoLinkOnTelegram } from './services/betanoLinkTelegram';
import { clearUpcomingEvents } from './services/betsService';
import { checkSavedGamesResults } from './services/checkSavedGamesResults';
import { eventSeeder } from './services/eventSeeder';
import { runBot } from './services/runBot';
import SwaggerFile from './swagger.json';
import { errorConverter, errorHandler } from './utils/error';

myDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch(err => {
        console.error(
            'Error during Data Source initialization:',
            err,
            myDataSource.options,
        );
    });
const bot = new TelegramBot('6098476572:AAFpqk9KGmtg5523Kx24FSAsRe4we1Keejo', {
    polling: true,
});
const app = express();

app.use(helmet());

app.use(express.json({ limit: '50mb' }));
app.use(
    express.urlencoded({
        limit: '50mb',
        parameterLimit: 100000,
        extended: true,
    }),
);
app.use(cors({ credentials: true }));
app.use(errorConverter);
app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerFile));

app.use(routes);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }
        return response.status(500).json({
            status: 'error',
            message: `Internal server error - ${err.message}`,
        });
    },
);
const server = http.createServer(app).listen(3000, () => {
    console.log(`🚀 Server ready at port ${3000}`);
});
bot.on('message', async msg => {
    console.log(msg, 'here is my messgae');
});
bot.on('polling_error', msg => console.log(msg));
// eventSeeder();
cron.schedule('*/2 * * * *', runBot(bot));
cron.schedule('*/40 * * * *', () => checkSavedGamesResults(bot));
cron.schedule('0 3,15,21 * * *', () => betanoLinkOnTelegram(bot));
cron.schedule('0 5 * * *', () => eventSeeder());
cron.schedule('0 4 * * *', () => clearUpcomingEvents());
const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: any) => {
    console.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    console.info('SIGTERM received');
    if (server) {
        server.close();
    }
});

// app.listen(3000, () => console.log('server is running'));
