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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const config = {};
config.admin = {
    name: process.env.ADMIN_NAME || 'admin',
    email: process.env.ADMIN_EMAIL || 'admin@hotmail.com',
    password: process.env.ADMIN_PASSWORD || 'teste',
};
config.env = process.env.NODE_ENV;
config.jwtSecret = process.env.JWT_SECRET || 'SECRET';
config.sendGridKey = '';
config.from = 'teste@hotmail.com';
config.telegramApiToken = '5553299118:AAHhgVtKz8wtq_LquIAqLIxvHt_rYsNn9H8'; // process.env.ACCESS_BOT_TOKEN ||'1995289161:AAHFnCwOdhjmdowG6AzoUDjKyvmfBvrUYRE'
config.telegramChatId = -1001760296023; // -1001582722078
config.eventsApiKey = '97036-xkyu7zXimmfs3P';
config.weatherApiKey = '0913990725ccf8dd64e0d1885f036d15';
config.bet365ApiKey = '97036-xkyu7zXimmfs3P';
config.port = process.env.PORT || 8080;
config.isAccess = process.env.IS_ACCESS || false;
config.kiwifySecret = process.env.KIWIFY_SECRET || 'htejewhsx5q';
config.pusherCredentials = {
    appId: process.env.PUSHER_APP_ID || '1294836',
    secret: process.env.PUSHER_SECRET || 'a362f1e36943be841104',
    cluster: process.env.PUSHER_CLUSTER || 'us2',
    useTLS: true,
    key: process.env.PUSHER_KEY || '9c9daa5f93bff0b16988',
};
config.isPrime = process.env.IS_PRIME === 'true';
exports.default = config;
