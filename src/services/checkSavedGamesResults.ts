/* eslint-disable radix */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
    getEventView,
    getMessageById,
    getUnfinishedSavedGames,
    setMessageAsGreen,
    setMessageAsRed,
    updateEvent,
} from './betsService';
import { botConfig } from './botConfig';

const ONE_HOUR = 40;
const TWO_HOURS = 120;

export async function checkSavedGamesResults(bot: any) {
    // find unfinished games that started more than one hour ago and less than 120 minutes ago
    console.log('START RUNNING JOB');
    const events = await getUnfinishedSavedGames(ONE_HOUR, TWO_HOURS);
    for (const event of events) {
        try {
            const eventView = await getEventView(event.id);
            const firstHalfScores = eventView.results[0].scores['1'];
            if (firstHalfScores) {
                const homeGoals = parseInt(firstHalfScores.home);
                const awayGoals = parseInt(firstHalfScores.away);
                event.isFinished = true;
                event.goalsOnFirstHalf = homeGoals + awayGoals;
                console.log(
                    `Running Job now, found event:${event.id},with ${event.goalsOnFirstHalf} goals`,
                );
                await updateEvent(event);
                if (event.messageId) {
                    let message = await getMessageById(event.messageId);
                    if (event.goalsOnFirstHalf > 0) {
                        message = await setMessageAsGreen(message.id);
                        await bot.editMessageText(message.text.data, {
                            message_id: message.id,
                            chat_id: botConfig.chat,
                        });
                    } else {
                        message = await setMessageAsRed(message.id);
                        await bot.editMessageText(message.text.data, {
                            message_id: message.id,
                            chat_id: botConfig.chat,
                        });
                    }
                }
                if (event.messagePrimeId) {
                    let message = await getMessageById(event.messagePrimeId);
                    if (event.goalsOnFirstHalf > 0) {
                        message = await setMessageAsGreen(message.id);
                        await bot.editMessageText(message.text.data, {
                            message_id: message.id,
                            chat_id: botConfig.chat,
                        });
                    } else {
                        message = await setMessageAsRed(message.id);
                        await bot.editMessageText(message.text.data, {
                            message_id: message.id,
                            chat_id: botConfig.chat,
                        });
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
}
