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
exports.checkSavedGamesResults = void 0;
/* eslint-disable radix */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const betsService_1 = require("./betsService");
const botConfig_1 = require("./botConfig");
const ONE_HOUR = 40;
const TWO_HOURS = 120;
function checkSavedGamesResults(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        // find unfinished games that started more than one hour ago and less than 120 minutes ago
        console.log('START RUNNING JOB');
        const events = yield (0, betsService_1.getUnfinishedSavedGames)(ONE_HOUR, TWO_HOURS);
        for (const event of events) {
            try {
                const eventView = yield (0, betsService_1.getEventView)(event.id);
                const firstHalfScores = eventView.results[0].scores['1'];
                if (firstHalfScores) {
                    const homeGoals = parseInt(firstHalfScores.home);
                    const awayGoals = parseInt(firstHalfScores.away);
                    event.isFinished = true;
                    event.goalsOnFirstHalf = homeGoals + awayGoals;
                    console.log(`Running Job now, found event:${event.id},with ${event.goalsOnFirstHalf} goals`);
                    yield (0, betsService_1.updateEvent)(event);
                    if (event.messageId) {
                        let message = yield (0, betsService_1.getMessageById)(event.messageId);
                        if (event.goalsOnFirstHalf > 0) {
                            message = yield (0, betsService_1.setMessageAsGreen)(message.id);
                            yield bot.editMessageText(message.text.data, {
                                message_id: message.id,
                                chat_id: botConfig_1.botConfig.chat,
                            });
                        }
                        else {
                            message = yield (0, betsService_1.setMessageAsRed)(message.id);
                            yield bot.editMessageText(message.text.data, {
                                message_id: message.id,
                                chat_id: botConfig_1.botConfig.chat,
                            });
                        }
                    }
                    if (event.messagePrimeId) {
                        let message = yield (0, betsService_1.getMessageById)(event.messagePrimeId);
                        if (event.goalsOnFirstHalf > 0) {
                            message = yield (0, betsService_1.setMessageAsGreen)(message.id);
                            yield bot.editMessageText(message.text.data, {
                                message_id: message.id,
                                chat_id: botConfig_1.botConfig.chat,
                            });
                        }
                        else {
                            message = yield (0, betsService_1.setMessageAsRed)(message.id);
                            yield bot.editMessageText(message.text.data, {
                                message_id: message.id,
                                chat_id: botConfig_1.botConfig.chat,
                            });
                        }
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    });
}
exports.checkSavedGamesResults = checkSavedGamesResults;
