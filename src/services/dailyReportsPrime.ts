/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import { saveDailyReportPrime } from './betsService';
import { botConfig } from './botConfig';
import { dailyMonthReport } from './dailyMonthReport';

export async function dailyReportsPrime(events: any[], bot: any) {
    // find unfinished games that started more than one hour ago and less than 120 minutes ago
    let message = ``;
    let greens = 0;
    let reds = 0;
    for (const event of events) {
        try {
            let chunk;
            if (event.messagePrimeId) {
                if (event.goalsOnFirstHalf && event.goalsOnFirstHalf > 0) {
                    chunk = `\n jogo: ${event.data.home.name} x ${event.data.away.name} ✅✅✅ \n`;
                    greens++;
                } else {
                    chunk = `\n jogo: ${event.data.home.name} x ${event.data.away.name} ✖️ Sem gol \n`;
                    reds++;
                }
            } // message = message + chunk ;
        } catch (err) {
            console.log(err);
        }
    }

    message += `🚨 Relatório do dia  (${new Date().getDate() - 1}/${
        new Date().getMonth() + 1
    }/${new Date().getFullYear()})

Quantidade de jogos mandados pelo robôgol: ${greens + reds} jogos 

✅ Saiu gol: ${greens} jogos
✖️ Sem gol: ${reds} jogos`;

    await bot.sendMessage(botConfig.charPrime, message);
    await saveDailyReportPrime(greens, reds, greens + reds);
    await dailyMonthReport(bot);
}
