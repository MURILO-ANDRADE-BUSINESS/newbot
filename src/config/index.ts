import * as dotenv from 'dotenv';

dotenv.config();
const config: any = {};
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
export default config;
