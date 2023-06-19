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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyMonthReport = void 0;
/* eslint-disable no-restricted-syntax */
const moment_1 = __importDefault(require("moment"));
const betsService_1 = require("./betsService");
const botConfig_1 = require("./botConfig");
const ONE_HOUR = 60;
const TWO_HOURS = 120;
const months = [
    'JANEIRO',
    'FEVEREIRO',
    'MARÇO',
    'ABRIL',
    'MAIO',
    'JUNHO',
    'JULHO',
    'AGOSTO',
    'SETEMBRO',
    'OUTUBRO',
    'NOVEMBRO',
    'DEZEMBRO',
];
const dailyMonthReport = (bot) => __awaiter(void 0, void 0, void 0, function* () {
    // find unfinished games that started more than one hour ago and less than 120 minutes ago
    const today = (0, moment_1.default)(new Date()).subtract(3, 'hours');
    const firstDay = new Date(today.year(), today.month(), 1);
    const dailyReports = yield (0, betsService_1.getDailyReports)(firstDay);
    const dailyReportsPrime = yield (0, betsService_1.getDailyReportsPrime)(firstDay);
    let message = `🤖 Relatório ROBÔGOL\n
    🔥${months[today.month()]}`;
    let messagePrime = `📊 RELATÓRIO PRIME\n
    🔥${months[today.month()]}`;
    for (const report of dailyReports) {
        const date = (0, moment_1.default)(report.date).subtract(3, 'hours');
        const month = date.month();
        const day = date.date();
        const Positivebalance = report.greens > report.reds;
        const equalBalance = report.greens === report.reds;
        if (month + 1 === today.month() + 1) {
            if (Positivebalance) {
                if (report.greens / (report.reds + report.greens) >= 0.7) {
                    message += `\n⚽${day}/${month + 1} = ${report.greens}x${report.reds}${'🔥🔥'}`;
                }
                else {
                    message += `\n⚽${day}/${month + 1} = ${report.greens}x${report.reds}${'✅'}`;
                }
            }
            if (equalBalance) {
                message += `\n⚽${day}/${month + 1} = ${report.greens}x${report.reds}${'🔁'}`;
            }
            if (!Positivebalance && !equalBalance) {
                message += `\n⚽${day}/${month + 1} = ${report.greens}x${report.reds}${'✖️'}`;
            }
        }
    }
    for (const report of dailyReportsPrime) {
        const date = (0, moment_1.default)(report.date).subtract(3, 'hours');
        const month = date.month();
        const day = date.date();
        const Positivebalance = report.greens > report.reds;
        const equalBalance = report.greens === report.reds;
        if (month + 1 === today.month() + 1) {
            if (Positivebalance) {
                if (report.greens / (report.reds + report.greens) >= 0.7) {
                    messagePrime += `\n🤖 ${day}/${month + 1} 👉 ${report.greens}x${report.reds}${'✅'}`;
                }
                else {
                    messagePrime += `\n🤖 ${day}/${month + 1} 👉 ${report.greens}x${report.reds}${'✅'}`;
                }
            }
            if (equalBalance) {
                messagePrime += `\n🤖 ${day}/${month + 1} 👉 ${report.greens}x${report.reds}${'🔁'}`;
            }
            if (!Positivebalance && !equalBalance) {
                messagePrime += `\n🤖 ${day}/${month + 1} 👉 ${report.greens}x${report.reds}${'✖️'}`;
            }
        }
    }
    yield bot.sendMessage(botConfig_1.botConfig.chat, message);
    yield bot.sendMessage(botConfig_1.botConfig.charPrime, messagePrime);
});
exports.dailyMonthReport = dailyMonthReport;
