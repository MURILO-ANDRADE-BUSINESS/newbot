"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialMigration1685672628044 = void 0;
const typeorm_1 = require("typeorm");
class initialMigration1685672628044 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'daily_reports',
                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },
                    { name: 'date', type: 'timestamp' },
                    { name: 'greens', type: 'integer' },
                    { name: 'reds', type: 'integer' },
                    { name: 'total', type: 'integer' },
                ],
            }));
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'event_lineup',
                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },
                    { name: 'eventId', type: 'varchar' },
                    { name: 'data', type: 'json' },
                ],
            }));
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'event_odds',
                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },
                    { name: 'eventId', type: 'varchar' },
                    { name: 'data', type: 'json' },
                ],
            }));
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'event_weather_data',
                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },
                    { name: 'eventId', type: 'varchar' },
                    { name: 'data', type: 'json' },
                ],
            }));
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'products',
                columns: [
                    { name: 'id', type: 'varchar', isPrimary: true },
                    { name: 'name', type: 'varchar' },
                    { name: 'eduzzId', type: 'varchar', isNullable: true },
                    { name: 'braipId', type: 'varchar', isNullable: true },
                    { name: 'kiwifiId', type: 'varchar', isNullable: true },
                ],
            }));
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'upcoming_events',
                columns: [
                    { name: 'id', type: 'varchar', isPrimary: true },
                    { name: 'data', type: 'json' },
                    { name: 'time', type: 'integer', isNullable: true },
                    { name: 'leagueId', type: 'varchar', isNullable: true },
                ],
            }));
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'upcoming_events_odds',
                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },
                    { name: 'data', type: 'json' },
                    { name: 'eventId', type: 'varchar', isNullable: true },
                ],
            }));
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'betano_events',
                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },
                    { name: 'home', type: 'json' },
                    { name: 'away', type: 'json' },
                    { name: 'date', type: 'integer' },
                    { name: 'url', type: 'varchar' },
                ],
            }));
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('users');
            yield queryRunner.dropTable('afiliates');
            yield queryRunner.dropTable('sales');
            yield queryRunner.dropTable('events');
            yield queryRunner.dropTable('daily_reports');
            yield queryRunner.dropTable('event_lineup');
            yield queryRunner.dropTable('event_weather_data');
            yield queryRunner.dropTable('messages');
            yield queryRunner.dropTable('products');
            yield queryRunner.dropTable('upcoming_events');
            yield queryRunner.dropTable('upcoming_events_odds');
            yield queryRunner.dropTable('betano_events');
        });
    }
}
exports.initialMigration1685672628044 = initialMigration1685672628044;
