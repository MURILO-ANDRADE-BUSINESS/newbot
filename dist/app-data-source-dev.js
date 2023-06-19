"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.myDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    port: 3306,
    host: '177.154.191.234',
    username: 'robogolc_jcprime',
    password: '2P-u-KX?b,w)',
    database: 'robogolc_jcprime',
    migrations: ['src/database/migrations/**/*{.ts,.js}'],
    entities: ['src/entities/*.ts'],
    logging: true,
    synchronize: true,
    migrationsRun: true,
});
