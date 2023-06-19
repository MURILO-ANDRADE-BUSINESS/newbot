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
exports.dailyReports = void 0;
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
const betsService_1 = require("./betsService");
const botConfig_1 = require("./botConfig");
const dailyReportsPrime_1 = require("./dailyReportsPrime");
function dailyReports(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        // find unfinished games that started more than one hour ago and less than 120 minutes ago
        const events = yield (0, betsService_1.getTodaysEvents)();
        let message = ``;
        let greens = 0;
        let reds = 0;
        for (const event of events) {
            try {
                let chunk;
                if (event.goalsOnFirstHalf && event.goalsOnFirstHalf > 0) {
                    chunk = `\n jogo: ${event.data.home.name} x ${event.data.away.name} ✅✅✅ \n`;
                    greens++;
                }
                else {
                    chunk = `\n jogo: ${event.data.home.name} x ${event.data.away.name} ✖️ Sem gol \n`;
                    reds++;
                }
                // message = message + chunk ;
            }
            catch (err) {
                console.log(err);
            }
        }
        message += `🚨 Relatório do dia  (${new Date().getDate() - 1}/${new Date().getMonth() + 1}/${new Date().getFullYear()})

Quantidade de jogos mandados pelo robôgol: ${greens + reds} jogos 

✅ Saiu gol: ${greens} jogos
✖️ Sem gol: ${reds} jogos`;
        yield bot.sendMessage(botConfig_1.botConfig.chat, message);
        yield (0, betsService_1.saveDailyReport)(greens, reds, greens + reds);
        yield (0, dailyReportsPrime_1.dailyReportsPrime)(events, bot);
    });
}
exports.dailyReports = dailyReports;
