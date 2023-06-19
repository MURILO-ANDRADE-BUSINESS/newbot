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
exports.createDailyReportsPrime1686539599431 = void 0;
const typeorm_1 = require("typeorm");
class createDailyReportsPrime1686539599431 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'daily_reports_prime',
                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },
                    { name: 'date', type: 'timestamp' },
                    { name: 'greens', type: 'integer' },
                    { name: 'reds', type: 'integer' },
                    { name: 'total', type: 'integer' },
                ],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('daily_reports_prime');
        });
    }
}
exports.createDailyReportsPrime1686539599431 = createDailyReportsPrime1686539599431;
