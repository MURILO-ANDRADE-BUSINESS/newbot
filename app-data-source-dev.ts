import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
    type: 'mysql',
    port: 3306,
    host: '177.154.191.234', // Aqui fica como localhost
    username: 'robogolc_jcprime', // robogolc_jcprime
    password: '2P-u-KX?b,w)', // VPPrfwuc@GrOLG1C
    database: 'robogolc_jcprime', // jcprime
    migrations: ['src/database/migrations/**/*{.ts,.js}'],
    entities: ['src/entities/*.ts'],
    logging: true,
    synchronize: true,
    migrationsRun: true,
});
