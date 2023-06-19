import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class initialMigration1685672628044 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',

                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },

                    { name: 'name', type: 'varchar', isNullable: true },

                    { name: 'email', type: 'varchar', isNullable: true },

                    { name: 'mjcDate', type: 'Date', isNullable: true },

                    { name: 'dueDate', type: 'Date', isNullable: true },

                    { name: 'manualPrime', type: 'boolean', isNullable: true },

                    { name: 'jogadorCaro', type: 'boolean', isNullable: true },

                    { name: 'fut', type: 'boolean', isNullable: true },

                    { name: 'role', type: 'varchar' },

                    { name: 'active', type: 'boolean' },

                    { name: 'password', type: 'varchar' },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'afiliates',

                columns: [
                    { name: 'id', type: 'varchar', isPrimary: true },

                    { name: 'name', type: 'varchar' },

                    { name: 'email', type: 'varchar' },

                    { name: 'document', type: 'varchar' },

                    { name: 'emailEduzz', type: 'varchar' },

                    { name: 'emailKiwifi', type: 'varchar' },

                    { name: 'emailBraip', type: 'varchar' },
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'daily_reports',

                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },

                    { name: 'date', type: 'timestamp' },

                    { name: 'greens', type: 'integer' },

                    { name: 'reds', type: 'integer' },

                    { name: 'total', type: 'integer' },
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'events',

                columns: [
                    { name: 'id', type: 'varchar', isPrimary: true },

                    { name: 'date', type: 'timestamp' },

                    { name: 'leagueId', type: 'varchar', isNullable: true },

                    {
                        name: 'homePreviousEvents',
                        type: 'json',
                        isNullable: true,
                    },

                    {
                        name: 'awayPreviousEvents',
                        type: 'json',
                        isNullable: true,
                    },
                    {
                        name: 'data',
                        type: 'json',
                    },
                    {
                        name: 'time',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'isFinished',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'goalsOnFirstHalf',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'messageId',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'messagePrimeId',
                        type: 'integer',
                        isNullable: true,
                    },
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'event_lineup',

                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },

                    { name: 'eventId', type: 'varchar' },

                    { name: 'data', type: 'json' },
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'event_odds',

                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },

                    { name: 'eventId', type: 'varchar' },

                    { name: 'data', type: 'json' },
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'event_weather_data',

                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },

                    { name: 'eventId', type: 'varchar' },

                    { name: 'data', type: 'json' },
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'messages',

                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },

                    {
                        name: 'text',
                        type: 'varchar(745)',
                        charset: 'utf8mb4',
                        collation: 'utf8mb4_general_ci',
                    },
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'products',

                columns: [
                    { name: 'id', type: 'varchar', isPrimary: true },

                    { name: 'name', type: 'varchar' },

                    { name: 'eduzzId', type: 'varchar', isNullable: true },

                    { name: 'braipId', type: 'varchar', isNullable: true },

                    { name: 'kiwifiId', type: 'varchar', isNullable: true },
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'upcoming_events',

                columns: [
                    { name: 'id', type: 'varchar', isPrimary: true },

                    { name: 'data', type: 'json' },

                    { name: 'time', type: 'integer', isNullable: true },

                    { name: 'leagueId', type: 'varchar', isNullable: true },
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'upcoming_events_odds',

                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },

                    { name: 'data', type: 'json' },

                    { name: 'eventId', type: 'varchar', isNullable: true },
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'betano_events',

                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },

                    { name: 'home', type: 'json' },

                    { name: 'away', type: 'json' },

                    { name: 'date', type: 'integer' },

                    { name: 'url', type: 'varchar' },
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'sales',

                columns: [
                    { name: 'id', type: 'varchar', isPrimary: true },

                    { name: 'affiliateValue', type: 'float' },

                    { name: 'userId', type: 'int' },

                    { name: 'date', type: 'datetime' },

                    { name: 'invoice', type: 'varchar' },

                    { name: 'product', type: 'varchar' },

                    { name: 'value', type: 'float' },

                    { name: 'status', type: 'boolean' },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
        await queryRunner.dropTable('afiliates');
        await queryRunner.dropTable('sales');
        await queryRunner.dropTable('events');
        await queryRunner.dropTable('daily_reports');
        await queryRunner.dropTable('event_lineup');
        await queryRunner.dropTable('event_weather_data');
        await queryRunner.dropTable('messages');
        await queryRunner.dropTable('products');
        await queryRunner.dropTable('upcoming_events');
        await queryRunner.dropTable('upcoming_events_odds');
        await queryRunner.dropTable('betano_events');
    }
}
