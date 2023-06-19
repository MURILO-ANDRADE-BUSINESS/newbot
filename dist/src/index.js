"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const helmet_1 = __importDefault(require("helmet"));
const http = __importStar(require("http"));
const cron = __importStar(require("node-cron"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app_data_source_dev_1 = require("../app-data-source-dev");
require("./shared/container/index");
const AppError_1 = require("./erros/AppError");
const index_routes_1 = require("./routes/index.routes");
// import betsService from './services/betsService';
const betanoLinkTelegram_1 = require("./services/betanoLinkTelegram");
const betsService_1 = require("./services/betsService");
const checkSavedGamesResults_1 = require("./services/checkSavedGamesResults");
const eventSeeder_1 = require("./services/eventSeeder");
const runBot_1 = require("./services/runBot");
const swagger_json_1 = __importDefault(require("./swagger.json"));
const error_1 = require("./utils/error");
app_data_source_dev_1.myDataSource
    .initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch(err => {
    console.error('Error during Data Source initialization:', err, app_data_source_dev_1.myDataSource.options);
});
const bot = new node_telegram_bot_api_1.default('6098476572:AAFpqk9KGmtg5523Kx24FSAsRe4we1Keejo', {
    polling: true,
});
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true,
}));
app.use((0, cors_1.default)({ credentials: true }));
app.use(error_1.errorConverter);
app.use(error_1.errorHandler);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(index_routes_1.routes);
app.use((err, request, response, next) => {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`,
    });
});
const server = http.createServer(app).listen(3000, () => {
    console.log(`🚀 Server ready at port ${3000}`);
});
bot.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(msg, 'here is my messgae');
}));
bot.on('polling_error', msg => console.log(msg));
// eventSeeder();
cron.schedule('*/2 * * * *', (0, runBot_1.runBot)(bot));
cron.schedule('*/40 * * * *', () => (0, checkSavedGamesResults_1.checkSavedGamesResults)(bot));
cron.schedule('0 3,15,21 * * *', () => (0, betanoLinkTelegram_1.betanoLinkOnTelegram)(bot));
cron.schedule('0 5 * * *', () => (0, eventSeeder_1.eventSeeder)());
cron.schedule('0 4 * * *', () => (0, betsService_1.clearUpcomingEvents)());
const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info('Server closed');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
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
