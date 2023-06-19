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
exports.runBot = void 0;
const betsService_1 = require("./betsService");
const botConfig_1 = require("./botConfig");
function runBot(bot) {
    return () => __awaiter(this, void 0, void 0, function* () {
        try {
            console.time('codezup');
            console.log('running a task every two minutes');
            const games = yield (0, betsService_1.getInplayGames)();
            const filteredGames = games.results.filter(game => {
                return game.timer.tm >= 13 && game.timer.tm <= 20; // 13 & 20
            });
            if (filteredGames.length > 0) {
                const filteredGamesViews = [];
                for (const filteredGame of filteredGames) {
                    const filteredGameView = yield (0, betsService_1.getEventView)(filteredGame.id);
                    const filteredGameBet365Data = yield (0, betsService_1.getBet365Data)(filteredGame.bet365_id);
                    const gameLink = (0, betsService_1.getGameLink)(filteredGameBet365Data);
                    const gameData = {
                        success: filteredGameView.success,
                        results: [Object.assign(Object.assign({}, filteredGameView.results[0]), { gameLink })],
                    };
                    filteredGamesViews.push(gameData);
                }
                const gamesViewsFilteredByMetrics = yield (0, betsService_1.eventFilter)(filteredGamesViews);
                console.log(gamesViewsFilteredByMetrics, 'THE GAME WAS RETURNED');
                const filteredGamesViewsResults = gamesViewsFilteredByMetrics.map(fgame => fgame.results);
                const messages = filteredGamesViewsResults.map((game) => __awaiter(this, void 0, void 0, function* () {
                    const { attacks, dangerous_attacks, off_target, on_target, possession_rt, corners, goalattempts, yellowcards, redcards, } = game[0].stats;
                    const { home, away, bet365_id, timer, time, gameLink, firstHalfGoalChance, id, weather, } = game[0];
                    // pusher.trigger('betbot', 'new-event', game[0]);
                    const betano = (yield (0, betsService_1.getBetanoEvent)(home.name, away.name, time));
                    const betanolink = betano;
                    return {
                        text: (0, betsService_1.templateMessage)({
                            weather,
                            id,
                            time: timer.tm,
                            yellowcards,
                            redcards,
                            firstHalfGoalChance,
                            home,
                            away,
                            attacks,
                            bet365_id,
                            dangerous_attacks,
                            off_target,
                            on_target,
                            possession_rt,
                            corners,
                            gameLink,
                            betanolink,
                        }),
                        textPrime: firstHalfGoalChance > 79.9 // 79.9
                            ? (0, betsService_1.templateMessagePrime)({
                                weather,
                                id,
                                time: timer.tm,
                                yellowcards,
                                redcards,
                                firstHalfGoalChance,
                                home,
                                away,
                                attacks,
                                bet365_id,
                                dangerous_attacks,
                                off_target,
                                on_target,
                                possession_rt,
                                corners,
                                gameLink,
                                betanolink,
                            })
                            : null,
                        eventId: id,
                    };
                }));
                for (const message of messages) {
                    try {
                        if ((yield message).textPrime) {
                            const responsePrime = yield bot.sendMessage(botConfig_1.botConfig.charPrime, (yield message).textPrime);
                            console.log(responsePrime);
                            yield (0, betsService_1.setEventMessage)(responsePrime.message_id, (yield message).eventId, (yield message).text);
                        }
                        const response = yield bot.sendMessage(botConfig_1.botConfig.chat, (yield message).text);
                        console.log(response);
                        yield (0, betsService_1.setEventMessage)(response.message_id, (yield message).eventId, (yield message).text);
                    }
                    catch (err) {
                        console.log(err);
                        console.log(`there was an error after message:${(yield message).eventId}`);
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.runBot = runBot;
