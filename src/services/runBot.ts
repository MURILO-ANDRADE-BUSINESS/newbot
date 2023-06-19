/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { container } from 'tsyringe';

import config from '../config/index';
import { EventFilterUseCase } from '../modules/bet/useCases/eventFilter/eventFilterUseCase';
import {
    eventFilter,
    getBet365Data,
    getBetanoEvent,
    getEventView,
    getGameLink,
    getInplayGames,
    setEventMessage,
    setEventMessagePrime,
    templateMessage,
    templateMessagePrime,
} from './betsService';
import { botConfig } from './botConfig';

export function runBot(bot: any): any {
    return async () => {
        try {
            console.time('codezup');
            console.log('running a task every two minutes');
            const games = await getInplayGames();
            const filteredGames = games.results.filter(game => {
                return game.timer.tm >= 13 && game.timer.tm <= 20; // 13 & 20
            });
            if (filteredGames.length > 0) {
                const filteredGamesViews = [];
                for (const filteredGame of filteredGames) {
                    const filteredGameView = await getEventView(
                        filteredGame.id,
                    );
                    const filteredGameBet365Data = await getBet365Data(
                        filteredGame.bet365_id,
                    );
                    const gameLink = getGameLink(filteredGameBet365Data);
                    const gameData = {
                        success: filteredGameView.success,
                        results: [{ ...filteredGameView.results[0], gameLink }],
                    };
                    filteredGamesViews.push(gameData);
                }
                const gamesViewsFilteredByMetrics = await eventFilter(
                    filteredGamesViews,
                );
                console.log(
                    gamesViewsFilteredByMetrics,
                    'THE GAME WAS RETURNED',
                );

                const filteredGamesViewsResults =
                    gamesViewsFilteredByMetrics.map(fgame => fgame.results);
                const messages = filteredGamesViewsResults.map(async game => {
                    const {
                        attacks,
                        dangerous_attacks,
                        off_target,
                        on_target,
                        possession_rt,
                        corners,
                        goalattempts,
                        yellowcards,
                        redcards,
                    } = game[0].stats;
                    const {
                        home,
                        away,
                        bet365_id,
                        timer,
                        time,
                        gameLink,
                        firstHalfGoalChance,
                        id,
                        weather,
                    } = game[0];
                    // pusher.trigger('betbot', 'new-event', game[0]);
                    const betano = (await getBetanoEvent(
                        home.name,
                        away.name,
                        time,
                    )) as any;
                    const betanolink = betano;
                    return {
                        text: templateMessage({
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
                        textPrime:
                            firstHalfGoalChance > 79.9 // 79.9
                                ? templateMessagePrime({
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
                });
                for (const message of messages) {
                    try {
                        if ((await message).textPrime) {
                            const responsePrime = await bot.sendMessage(
                                botConfig.charPrime,
                                (
                                    await message
                                ).textPrime,
                            );
                            console.log(responsePrime);
                            await setEventMessage(
                                responsePrime.message_id,
                                (
                                    await message
                                ).eventId,
                                (
                                    await message
                                ).text,
                            );
                        }
                        const response = await bot.sendMessage(
                            botConfig.chat,
                            (
                                await message
                            ).text,
                        );
                        console.log(response);
                        await setEventMessage(
                            response.message_id,
                            (
                                await message
                            ).eventId,
                            (
                                await message
                            ).text,
                        );
                    } catch (err) {
                        console.log(err);
                        console.log(
                            `there was an error after message:${
                                (await message).eventId
                            }`,
                        );
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
}
