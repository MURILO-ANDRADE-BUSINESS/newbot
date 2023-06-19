/* eslint-disable no-restricted-syntax */
import moment from 'moment';

import { getDailyReports, getDailyReportsPrime } from './betsService';
import { botConfig } from './botConfig';

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
export const dailyMonthReport = async (bot: any) => {
    // find unfinished games that started more than one hour ago and less than 120 minutes ago
    const today = moment(new Date()).subtract(3, 'hours');

    const firstDay = new Date(today.year(), today.month(), 1);
    const dailyReports = await getDailyReports(firstDay);
    const dailyReportsPrime = await getDailyReportsPrime(firstDay);
    let message = `🤖 Relatório ROBÔGOL\n
    🔥${months[today.month()]}`;
    let messagePrime = `📊 RELATÓRIO PRIME\n
    🔥${months[today.month()]}`;
    for (const report of dailyReports) {
        const date = moment(report.date).subtract(3, 'hours');
        const month = date.month();
        const day = date.date();
        const Positivebalance = report.greens > report.reds;
        const equalBalance = report.greens === report.reds;
        if (month + 1 === today.month() + 1) {
            if (Positivebalance) {
                if (report.greens / (report.reds + report.greens) >= 0.7) {
                    message += `\n⚽${day}/${month + 1} = ${report.greens}x${
                        report.reds
                    }${'🔥🔥'}`;
                } else {
                    message += `\n⚽${day}/${month + 1} = ${report.greens}x${
                        report.reds
                    }${'✅'}`;
                }
            }
            if (equalBalance) {
                message += `\n⚽${day}/${month + 1} = ${report.greens}x${
                    report.reds
                }${'🔁'}`;
            }
            if (!Positivebalance && !equalBalance) {
                message += `\n⚽${day}/${month + 1} = ${report.greens}x${
                    report.reds
                }${'✖️'}`;
            }
        }
    }
    for (const report of dailyReportsPrime) {
        const date = moment(report.date).subtract(3, 'hours');
        const month = date.month();
        const day = date.date();
        const Positivebalance = report.greens > report.reds;
        const equalBalance = report.greens === report.reds;
        if (month + 1 === today.month() + 1) {
            if (Positivebalance) {
                if (report.greens / (report.reds + report.greens) >= 0.7) {
                    messagePrime += `\n🤖 ${day}/${month + 1} 👉 ${
                        report.greens
                    }x${report.reds}${'✅'}`;
                } else {
                    messagePrime += `\n🤖 ${day}/${month + 1} 👉 ${
                        report.greens
                    }x${report.reds}${'✅'}`;
                }
            }
            if (equalBalance) {
                messagePrime += `\n🤖 ${day}/${month + 1} 👉 ${report.greens}x${
                    report.reds
                }${'🔁'}`;
            }
            if (!Positivebalance && !equalBalance) {
                messagePrime += `\n🤖 ${day}/${month + 1} 👉 ${report.greens}x${
                    report.reds
                }${'✖️'}`;
            }
        }
    }

    await bot.sendMessage(botConfig.chat, message);
    await bot.sendMessage(botConfig.charPrime, messagePrime);
};
