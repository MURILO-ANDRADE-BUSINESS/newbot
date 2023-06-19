/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
import axios from 'axios';
import * as ss from 'simple-statistics';
import { container, delay } from 'tsyringe';

import { BetanoEvent } from '../entities/BetanoEvents';
import { DailyReport } from '../entities/DailyReport';
import { EventWeatherData } from '../entities/EventWeatherData';
import { Message } from '../entities/Message';
import { ClearUpcomingEventsBetanoUseCase } from '../modules/bet/useCases/clearBetanoEvents/clearBetanoEvents';
import { DailyReportsCreateUseCase } from '../modules/bet/useCases/createDailyReports/createDailyReports';
import { DailyReportsPrimeCreateUseCase } from '../modules/bet/useCases/createDailyReportsPrime/createDailyReportsPrime';
import { BetanoEventFilterUseCase } from '../modules/bet/useCases/eventBetanoFilter/eventBetanoFilterUseCase';
import { EventCreateUseCase } from '../modules/bet/useCases/eventCreate/eventCreateUseCase';
import { EventFilterUseCase } from '../modules/bet/useCases/eventFilter/eventFilterUseCase';
import { MessagesFilterByIdUseCase } from '../modules/bet/useCases/filterMessageById/filterMessageByIdUseCase';
import { FilterDailyReportsPrimeBetweenDatesUseCase } from '../modules/bet/useCases/filterPrimeReportsByDates/filterReportsByDatesUseCase';
import { FilterDailyReportsBetweenDatesUseCase } from '../modules/bet/useCases/filterReportsByDates/filterReportsByDatesUseCase';
import { GetEventsBetweenDatesUseCase } from '../modules/bet/useCases/getEventsBetweenDates/getEventsBetweenDatesUseCase';
import { GetUpcomingEventsUseCase } from '../modules/bet/useCases/getUpcommingEvents/getUpcomingEventsUseCase';
import { GetUpcomingEventsBetanoUseCase } from '../modules/bet/useCases/getUpcommingEventsBetano/getUpcommingEventsBetanoUseCase';
import { MessageCreateUseCase } from '../modules/bet/useCases/MessageCreate/MessageCreateUseCase';
import { UnfinishedEventsFilterUseCase } from '../modules/bet/useCases/unfinishedEvents/unfinishedEventsUseCase';
import { EventView } from '../utils/types';

const config = {
    betsApiKey: '97036-xkyu7zXimmfs3P',
    bet365ApiKey: '97036-xkyu7zXimmfs3P',
    weatherApiKey: '0913990725ccf8dd64e0d1885f036d15',
    baseUrl: 'https://api.b365api.com/v2/',
};
type GameHistoryStats = {
    homeGoalsHistory;
    awayGoalsHistory;
    homeAverageGoals;
    homeResultsFrequencies;
    homeGoalsSufferedStd;
    homeAverageGoalsSuffered;
    homeGoalsStd;
    homeResultsHistory;
    awayGoalsSufferedHistory;
    awayAverageGoalsSuffered;
    awayAverageGoals;
    awayResultsHistory;
    awayResutsFrequencies;
    homeDataArray;
    awayDataArray;
    awayGoalsOnFirstHalfHistory: number[];
    awayGoalsSufferedOnFirstHalfHistory: number[];
    homeGoalsOnFirstHalfHistory: number[];
    homeGoalsSufferedOnFirstHalfHistory: number[];
};
const filterEventUseCase = container.resolve(delay(() => EventFilterUseCase));
const betanoFilterUseCase = container.resolve(
    delay(() => BetanoEventFilterUseCase),
);
const eventCreateUseCase = container.resolve(delay(() => EventCreateUseCase));
const messageCreateUseCase = container.resolve(
    delay(() => MessageCreateUseCase),
);
const filterUnfinishedEventsUseCase = container.resolve(
    delay(() => UnfinishedEventsFilterUseCase),
);
const messageFilterByIdUseCase = container.resolve(
    delay(() => MessagesFilterByIdUseCase),
);
const getUpcomingEventUseCase = container.resolve(
    delay(() => GetUpcomingEventsUseCase),
);
const getUpcomingEventBetanoUseCase = container.resolve(
    delay(() => GetUpcomingEventsBetanoUseCase),
);
const eventsBetweenDatesUseCase = container.resolve(
    delay(() => GetEventsBetweenDatesUseCase),
);
const dailyReportsCreateUseCase = container.resolve(
    delay(() => DailyReportsCreateUseCase),
);
const dailyReportsPrimeCreateUseCase = container.resolve(
    delay(() => DailyReportsPrimeCreateUseCase),
);
const filterDailyReportsByDatesUseCase = container.resolve(
    delay(() => FilterDailyReportsBetweenDatesUseCase),
);
const filterDailyReportsPrimeByDatesUseCase = container.resolve(
    delay(() => FilterDailyReportsPrimeBetweenDatesUseCase),
);
const clearUpcomingEventsBetanoUseCase = container.resolve(
    ClearUpcomingEventsBetanoUseCase,
);
export const getUpcomingEvents = async () => {
    await getUpcomingEventUseCase.execute();
    await getUpcomingEventBetanoUseCase.execute();
};
export const clearUpcomingEvents = async () => {
    await clearUpcomingEventsBetanoUseCase.execute();
};
export const getEventPreMatchOdd = async (bet365Id: number) => {
    const url = `https://api.b365api.com/v3/bet365/prematch?token=${config.bet365ApiKey}&FI=${bet365Id}`;
    const results = (await axios.get(url)).data;
    return results;
};
export const getEventView = async eventId => {
    const url = `https://api.b365api.com/v1/event/view?token=${config.betsApiKey}&event_id=${eventId}`;
    const results = await axios.get(url);
    return results.data;
};
export const getBet365Data = async bet365_id => {
    const url = `https://api.b365api.com/v1/bet365/event?token=${config.bet365ApiKey}&FI=${bet365_id}`;
    const results = await axios.get(url);
    if (results) {
        return results.data.results[0];
    }
    return null;
};
export const getGameLink = bet365Data => {
    const eventData = bet365Data.filter(obj => obj.type === 'EV')[0];
    const gameString: string = eventData.EI;
    const str = gameString.split('-');
    const gameLink = `${str[1] + str[2] + str[3] + str[4]}C1`;
    return gameLink;
};
export const getTeamHistory = async teamId => {
    const url = `https://api.b365api.com/v2/events/ended?sport_id=1&team_id=${teamId}&token=${config.betsApiKey}`;
    const results = await axios.get(url);
    let data = [];
    if (results.data && results.data.results && results.data.results.length) {
        data =
            results.data.results.length > 5
                ? results.data.results.slice(0, 5)
                : results.data.results;
    }
    return data;
};
export const filterTeamsHistory = async (
    homeId: number,
    awayId: number,
): Promise<GameHistoryStats> => {
    const homeHistory = await getTeamHistory(homeId);
    const awayHistory = await getTeamHistory(awayId);

    const scoresArrayFilter = event => {
        const score = event.ss;
        return !!score;
    };

    const statsMapper = event => {
        const { home, away, ss, stats, scores } = event;
        const score = ss;
        let yellowcards = ['0', '0'];
        let redcards = ['0', '0'];
        if (stats) {
            yellowcards = stats.yellowcards;
            redcards = stats.redcards;
        }

        // console.log(score);

        const isHome = home.id === homeId;

        if (ss) {
            const scoresArray = ss.split('-');
            const teamGoals = isHome
                ? parseInt(scoresArray[0])
                : parseInt(scoresArray[1]);
            const oponentGoals = isHome
                ? parseInt(scoresArray[1])
                : parseInt(scoresArray[0]);
            const teamYellowCards = isHome
                ? parseInt(yellowcards[1])
                : parseInt(yellowcards[0]);
            const teamRedCards = isHome
                ? parseInt(redcards[1])
                : parseInt(redcards[0]);

            let result;
            if (teamGoals > oponentGoals) {
                result = 'WIN';
            }
            if (teamGoals === oponentGoals) {
                result = 'DRAW';
            }
            if (teamGoals < oponentGoals) {
                result = 'LOSS';
            }

            let firstHalfGoals = null;
            let firstHalfGoalsSuffered = null;
            if (scores) {
                if (scores['1']) {
                    firstHalfGoals = isHome
                        ? parseInt(scores['1'].home)
                        : parseInt(scores['1'].away);
                    firstHalfGoalsSuffered = isHome
                        ? parseInt(scores['1'].away)
                        : parseInt(scores['1'].home);
                }
            }
            return {
                teamGoals,
                oponentGoals,
                result,
                teamYellowCards,
                teamRedCards,
                firstHalfGoals,
                firstHalfGoalsSuffered,
            };
        }
        return null;
    };
    const homeDataArray = [];
    const awayDataArray = [];

    const resultsFrequencies = data => {
        let winCount = 0;
        let drawCount = 0;
        let lossCount = 0;
        for (const result of data) {
            if (result === 'WIN') {
                winCount++;
            }
            if (result === 'DRAW') {
                drawCount++;
            }
            if (result === 'LOSS') {
                lossCount++;
            }
        }
        return { WIN: winCount, DRAW: drawCount, LOSS: lossCount };
    };

    // console.log(
    //     homeHistory.filter(scoresArrayFilter),
    //     // '\n\n\n\n\n\n\n\n\n HERE',
    // );
    // console.log(
    //     awayHistory.filter(scoresArrayFilter),
    //     // '\n\n\n\n\n\n\n\n\n HERE 2',
    // );

    const homeGoalsHistory = homeHistory
        .filter(scoresArrayFilter)
        .map(statsMapper)
        .map(g => g.teamGoals);
    const homeAverageGoals = parseFloat(ss.mean(homeGoalsHistory).toFixed(4));
    const homeGoalsStd = parseFloat(
        ss.standardDeviation(homeGoalsHistory).toFixed(4),
    );
    const homeGoalsSufferedHistory = homeHistory
        .filter(scoresArrayFilter)
        .map(statsMapper)
        .map(g => g.oponentGoals);
    const homeGoalsSufferedOnFirstHalfHistory: number[] = homeHistory
        .filter(scoresArrayFilter)
        .map(g => g.firstHalfGoalsSuffered)
        .filter(f => f !== null && f !== undefined);
    const homeGoalsOnFirstHalfHistory: number[] = homeHistory
        .filter(scoresArrayFilter)
        .map(g => g.firstHalfGoals)
        .filter(f => f !== null && f !== undefined);
    const homeAverageGoalsSuffered = ss.mean(homeGoalsSufferedHistory);
    const homeGoalsSufferedStd = parseFloat(
        ss.standardDeviation(homeGoalsSufferedHistory).toFixed(4),
    );
    const homeResultsHistory = homeHistory
        .filter(scoresArrayFilter)
        .map(statsMapper)
        .map(g => g.result);
    const awayGoalsHistory = awayHistory
        .filter(scoresArrayFilter)
        .map(statsMapper)
        .map(g => g.teamGoals);
    const awayAverageGoals = parseFloat(ss.mean(awayGoalsHistory).toFixed(4));
    const awayGoalsSufferedHistory = awayHistory
        .filter(scoresArrayFilter)
        .map(statsMapper)
        .map(g => g.oponentGoals);
    const awayAverageGoalsSuffered = parseFloat(
        ss.mean(awayGoalsSufferedHistory).toFixed(4),
    );
    const awayResultsHistory = awayHistory
        .filter(scoresArrayFilter)
        .map(statsMapper)
        .map(g => g.result);
    const awayResutsFrequencies = resultsFrequencies(awayResultsHistory);
    const homeResultsFrequencies = resultsFrequencies(homeResultsHistory);
    const awayGoalsSufferedOnFirstHalfHistory: number[] = awayHistory
        .filter(scoresArrayFilter)
        .map(g => g.firstHalfGoalsSuffered)
        .filter(f => f !== null && f !== undefined);
    const awayGoalsOnFirstHalfHistory: number[] = awayHistory
        .filter(scoresArrayFilter)
        .map(g => g.firstHalfGoals)
        .filter(f => f !== null && f !== undefined);
    if (homeHistory && homeHistory.length) {
        for (let i = 0; i < homeHistory.length; i++) {
            homeDataArray.push(homeHistory[i]);
            awayDataArray.push(awayHistory[i]);
        }
    }

    return {
        homeGoalsHistory,
        awayGoalsHistory,
        homeAverageGoals,
        homeResultsFrequencies,
        homeGoalsSufferedStd,
        homeAverageGoalsSuffered,
        homeGoalsStd,
        homeResultsHistory,
        awayGoalsSufferedHistory,
        awayAverageGoalsSuffered,
        awayAverageGoals,
        awayResultsHistory,
        awayResutsFrequencies,
        homeDataArray,
        awayDataArray,
        awayGoalsOnFirstHalfHistory,
        awayGoalsSufferedOnFirstHalfHistory,
        homeGoalsOnFirstHalfHistory,
        homeGoalsSufferedOnFirstHalfHistory,
    };
};
export const getWeatherData = async (lat, lng) => {
    // console.log(
    //     `lat: ${lat}, lng:${lng}`,
    //     '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
    // );
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${parseFloat(
        lat,
    )}&lon=${parseFloat(lng)}&appid=${config.weatherApiKey}`;
    const results = await axios.get(url);
    return results.data;
};
export function getDangerousAttacksPerMinuteContribution(event) {
    const { stats, timer } = event.results[0];
    const { dangerous_attacks, off_target, on_target, goals } = stats;
    const homeDangerousAttacks = parseInt(dangerous_attacks[0]);
    const awayDangerousAttacks = parseInt(dangerous_attacks[1]);
    console.log(dangerous_attacks, 'dangerous_attacks \n\n');
    const time = timer.tm;
    const homeDangerousAttacksPerMinute = Math.floor(
        homeDangerousAttacks / time,
    );
    const awayDangerousAttacksPerMinute = Math.floor(
        awayDangerousAttacks / time,
    );
    console.log('Time:', time);
    let percentage = 0;
    // const shotsOnTargetPercentage = 0;
    // const shotsOfTargetPercentage = 0;
    const maxContribution = 50;
    if (
        homeDangerousAttacksPerMinute >= 1 ||
        awayDangerousAttacksPerMinute >= 1
    ) {
        const hasHomeShots = !!(
            homeDangerousAttacksPerMinute >= 1 &&
            (parseInt(off_target[0]) >= 1 || parseInt(on_target[0]) >= 1)
        );
        const hasAwayShots = !!(
            awayDangerousAttacksPerMinute >= 1 &&
            (parseInt(off_target[1]) >= 1 || parseInt(on_target[1]) >= 1)
        );
        console.log(hasHomeShots, hasAwayShots);
        const hasShots = hasHomeShots || hasAwayShots;
        percentage += hasShots ? 45 : 0;
        const bothTeamsContribution =
            homeDangerousAttacksPerMinute >= 1 &&
            awayDangerousAttacksPerMinute >= 1
                ? 10
                : 0;
        const homeExtraContribution =
            homeDangerousAttacksPerMinute >= 1
                ? 0.5 * (homeDangerousAttacks - time)
                : 0;
        const awayExtraContribution =
            awayDangerousAttacksPerMinute >= 1
                ? 0.5 * (awayDangerousAttacks - time)
                : 0;
        percentage +=
            bothTeamsContribution +
            homeExtraContribution +
            awayExtraContribution;
        percentage =
            percentage >= maxContribution ? maxContribution : percentage;
    }
    console.log('percentage: ', percentage);
    return percentage;
}

export function getOffTargetContribution(off_target: string[]) {
    console.log('OFF_TARGET \n\n', off_target);
    const homeOffTarget = parseInt(off_target[0]);
    const awayOffTarget = parseInt(off_target[1]);
    const maxPercentage = 15;
    const totalOffTarget = homeOffTarget + awayOffTarget;
    if (totalOffTarget >= 1) {
        let percentage = 5 + 1 * (totalOffTarget - 1);
        percentage = percentage > maxPercentage ? maxPercentage : percentage;
        return percentage;
    }

    return 0;
}

export function getOnTargetContribution(on_target: string[]) {
    console.log('ON_TARGET \n\n', on_target);
    const homeOnTarget = parseInt(on_target[0]);
    const awayOnTarget = parseInt(on_target[1]);
    const totalOnTarget = homeOnTarget + awayOnTarget;
    const maxPercentage = 20;
    if (totalOnTarget >= 1) {
        let percentage = 10 + 2.5 * (totalOnTarget - 1);
        percentage = percentage > maxPercentage ? maxPercentage : percentage;
        return percentage;
    }

    return 0;
}
export function getCornersContribution(corners: string[]) {
    console.log('CORNOERS \n\n', corners);
    const homeCorners = parseInt(corners[0]);
    const awayCorners = parseInt(corners[1]);
    const totalCorners = homeCorners + awayCorners;
    const maxPercentage = 15;
    if (totalCorners >= 1) {
        let percentage = 10 + 2.5 * (totalCorners - 1);
        percentage = percentage > maxPercentage ? maxPercentage : percentage;
        return percentage;
    }

    return 0;
}
export const getCurrentBet365EventOdds = async eventId => {
    const now = (Math.floor(new Date().getTime() / 1000) - 120).toString();
    const url = `https://api.b365api.com/v2/event/odds?token=${config.bet365ApiKey}&event_id=${eventId}&source=bet365&since_time=${now}`;
    const results = await axios.get(url);
    // console.log('ODDS DATA HERE', results.data.results.odds);
    const data = results.data.results.odds;
    return data;
};
export const getEventLineup = async eventId => {
    const url = `https://api.b365api.com/v1/event/lineup?token=${config.betsApiKey}&event_id=${eventId}`;
    const results = await axios.get(url);
    const data = results.data.results;
    return data;
};
export const eventFilter = async (events: EventView[]) => {
    try {
        // eslint-disable-next-line no-plusplus
        const eventsAsyncData: {
            eventId: string;
            weatherData;
            teamsGoalsHistory;
            currentOdds;
        }[] = [];

        const stage1_filteredEvents = events.filter(event => {
            const { stats, timer } = event.results[0];
            if (!stats || !timer) {
                return false;
            }

            if (timer.tm <= 12) {
                // 12
                return false;
            }
            // FILTER DANGEROUS ATTACKS
            const { dangerous_attacks, off_target, on_target, goals } = stats;
            if (!dangerous_attacks || !off_target || !on_target) {
                return false;
            }

            const homeGoals = parseInt(goals[0]);
            const awayGoals = parseInt(goals[1]);
            const scoreFilter = homeGoals === 0 && awayGoals === 0;

            return scoreFilter;
        });
        console.log(stage1_filteredEvents, 'STAGE1');
        const stage2_filteredEvents = stage1_filteredEvents
            .map(event => {
                return {
                    ...event,
                    percentage: getDangerousAttacksPerMinuteContribution(event),
                };
            })
            .filter(event => event.percentage >= 45); // 45;
        console.log(stage1_filteredEvents, 'STAGE2');
        for (const event of stage2_filteredEvents) {
            const { home, away, id, extra } = event.results[0];
            let weatherData;
            if (extra) {
                if (extra.stadium_data) {
                    if (extra.stadium_data.googlecoords) {
                        const latlng =
                            extra.stadium_data.googlecoords.split(',');
                        try {
                            weatherData = await getWeatherData(
                                latlng[0],
                                latlng[1],
                            );
                            // console.log(latlng);
                        } catch (err) {
                            console.log(err);
                        }
                    }
                }
            }

            const teamsGoalsHistory = await filterTeamsHistory(
                parseInt(home.id),
                parseInt(away.id),
            );
            const currentOdds = await getCurrentBet365EventOdds(id);
            eventsAsyncData.push({
                teamsGoalsHistory,
                eventId: id,
                weatherData,
                currentOdds,
            });
        }

        const filteredEvents = stage2_filteredEvents;
        const returnData = [];
        for (const filteredEvent of filteredEvents) {
            // let betanolink = await getUpcomingEventsBetano(filteredEvent.results[0].home.name,filteredEvent.results[0].away.name)
            let firstHalfGoalChance = filteredEvent.percentage;
            const isEventOnDb = await filterEventUseCase.execute({
                event: filteredEvent.results[0].id,
            });

            const newEventId = filteredEvent.results[0].id;
            const { teamsGoalsHistory, weatherData, currentOdds } =
                eventsAsyncData.filter(data => data.eventId === newEventId)[0];
            const { homeDataArray, awayDataArray, ...restOfteamHistory } =
                teamsGoalsHistory;
            const newEventData = {
                ...filteredEvent.results[0],
                teamsStats: restOfteamHistory,
            };
            const newEventLeagueId = filteredEvent.results[0].league.id;
            const newEventTime = parseInt(filteredEvent.results[0].time);
            const newEventAwayPreviousEvents = awayDataArray;
            const newEventHomePreviousEvents = homeDataArray;
            const checkCorners = filteredEvent.results[0].stats.corners;
            const cornersCheck =
                parseInt(checkCorners[0]) + parseInt(checkCorners[1]);
            const newEvent = {
                id: newEventId,
                data: newEventData,
                leagueId: newEventLeagueId,
                time: newEventTime,
                awayPreviousEvents: newEventAwayPreviousEvents,
                homePreviousEvents: newEventHomePreviousEvents,
            };
            // if ((!isEventOnDb && betanolink && betanolink.flag && (cornersCheck>0))) {
            if (!isEventOnDb && cornersCheck > 0) {
                firstHalfGoalChance += getOffTargetContribution(
                    filteredEvent.results[0].stats.off_target,
                );
                firstHalfGoalChance += getOnTargetContribution(
                    filteredEvent.results[0].stats.on_target,
                );
                firstHalfGoalChance += getCornersContribution(
                    filteredEvent.results[0].stats.corners,
                );
                firstHalfGoalChance =
                    firstHalfGoalChance >= 100 ? 99 : firstHalfGoalChance;
                if (firstHalfGoalChance > 60) {
                    // 60
                    const eventLineup = await getEventLineup(newEvent.id);

                    const newEventLineupEventId = newEvent.id;
                    const newEventLineupData = eventLineup;
                    const newEventLineup = {
                        eventId: newEventLineupEventId,
                        data: newEventLineupData,
                    };
                    const eventOddsData =
                        currentOdds &&
                        currentOdds['1_6'] &&
                        currentOdds['1_6'][0]
                            ? { firstHalfGoalOdds: currentOdds['1_6'][0] }
                            : {};
                    const eventOddsEventId = newEvent.id;
                    const eventOdds = {
                        eventId: eventOddsEventId,
                        data: eventOddsData,
                    };
                    await eventCreateUseCase.execute({ event: newEvent });
                    // await manager.save(EventLineup, newEventLineup);
                    // await manager.save(EventOdds, eventOdds);
                    let eventWeatherData: EventWeatherData;
                    if (weatherData && weatherData.weather) {
                        eventWeatherData = {} as any;
                        eventWeatherData.eventId = newEvent.id;
                        eventWeatherData.data = weatherData;
                        // await manager.save(
                        //     EventWeatherData,
                        //     eventWeatherData,
                        // );
                    }

                    const event = {
                        success: filteredEvent.success,
                        results: [
                            {
                                ...filteredEvent.results[0],
                                firstHalfGoalChance,
                                weather:
                                    eventWeatherData && eventWeatherData.data
                                        ? eventWeatherData.data
                                        : null,
                            },
                        ],
                    };
                    returnData.push(event);
                }
            }
        }
        return returnData;
    } catch {
        return [];
    }
};
export const getInplayGames = async () => {
    const url = `${config.baseUrl}events/inplay?sport_id=1&token=${config.betsApiKey}`;
    const results = await axios.get(
        `https://api.b365api.com/v2/events/inplay?sport_id=1&token=${config.betsApiKey}`,
    );
    return results.data;
};
export const getUpcomingEventsBetano = async (name: any, away: any) => {
    const arr1 = name.split(' ').filter(item => item !== 'B' && item !== 'de');
    const arr2 = away.split(' ').filter(item => item !== 'B' && item !== 'de');
    const newHome = arr1.join(' ');
    const newAway = arr2.join(' ');
    const url = 'https://br.betano.com/api/live'; // https://br.betano.com/api/sport/futebol/jogos-de-hoje/?req=la,s,tn,stnf,c,mb
    const resultados = await axios.get(url);
    let sub21 = false;
    let sub19 = false;
    let sub20 = false;
    let women = false;
    let array = [];
    if (
        resultados.data &&
        resultados.data.structureComponents &&
        resultados.data.structureComponents.live &&
        resultados.data.structureComponents.live.data
    ) {
        const aux = resultados.data.structureComponents.live.data.filter(
            item => item.sportId === 'FOOT',
        );
        if (aux[0] && aux[0].events) {
            array = aux[0].events;
        }
    }
    const aux1 = newHome.toLowerCase().trim();
    const aux2 = newAway.toLowerCase().trim();
    let home = aux1.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let awayname = aux2.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (home.includes('ec')) {
        home = home.replace('ec', '');
        home = home.trim();
    }
    if (awayname.includes('ec')) {
        awayname = awayname.replace('ec', '');
        awayname = awayname.trim();
    }
    if (home.includes('fc')) {
        home = home.replace('fc', '');
        home = home.trim();
    }
    if (awayname.includes('fc')) {
        awayname = awayname.replace('fc', '');
        awayname = awayname.trim();
    }
    if (home.includes('fk')) {
        home = home.replace('fk', '');
        home = home.trim();
    }
    if (awayname.includes('fk')) {
        awayname = awayname.replace('fk', '');
        awayname = awayname.trim();
    }
    if (home.includes('women')) {
        home = home.replace('women', '');
        home = home.trim();
        women = true;
    }
    if (awayname.includes('women')) {
        awayname = awayname.replace('women', '');
        awayname = awayname.trim();
        women = true;
    }
    if (home.includes('u20')) {
        home = home.replace('u20', '');
        home = home.trim();
        sub20 = true;
    }
    if (awayname.includes('u20')) {
        awayname = awayname.replace('u20', '');
        awayname = awayname.trim();
        sub20 = true;
    }
    if (home.includes('u21')) {
        home = home.replace('u21', '');
        home = home.trim();
        sub21 = true;
    }
    if (awayname.includes('u21')) {
        awayname = awayname.replace('u21', '');
        awayname = awayname.trim();
        sub21 = true;
    }
    if (home.includes('u19')) {
        home = home.replace('u19', '');
        home = home.trim();
        sub19 = true;
    }
    if (awayname.includes('u19')) {
        awayname = awayname.replace('u19', '');
        awayname = awayname.trim();
        sub19 = true;
    }
    if (home.includes('reserves')) {
        home = home.replace('reserves', '');
        home = home.trim();
    }
    if (awayname.includes('reserves')) {
        awayname = awayname.replace('reserves', '');
        awayname = awayname.trim();
    }

    let game = { link: '', flag: false };
    if (array) {
        for (let index = 0; index < array.length; index++) {
            const arrNameBetano = array[index].name
                .split(' ')
                .filter(item => item !== 'B' && item !== 'de');
            const arrShortBetano = array[index].shortName
                .split(' ')
                .filter(item => item !== 'B' && item !== 'de');
            const nameBetano = arrNameBetano
                .join(' ')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
            const shortBetano = arrShortBetano
                .join(' ')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
            if (
                nameBetano.toLowerCase().includes(home) ||
                nameBetano.toLowerCase().includes(awayname) ||
                shortBetano.toLowerCase().includes(home) ||
                shortBetano.toLowerCase().includes(awayname)
            ) {
                let aux = array[index].url;
                aux = `https://br.betano.com${aux}`;
                game = { link: aux, flag: true };
            } else {
                const element = array[index].participants;
                for (let j = 0; j < element.length; j++) {
                    const elementName = `${element[j].name}`;
                    const strArr = elementName
                        .split(' ')
                        .filter(item => item !== 'B' && item !== 'de');
                    const str = strArr.join(' ');
                    const names = str
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    if (names.includes(home)) {
                        if (sub21 && names.includes('21')) {
                            let aux = array[index].url;
                            aux = `https://br.betano.com${aux}`;
                            game = { link: aux, flag: true };
                        }
                        if (sub19 && names.includes('19')) {
                            let aux = array[index].url;
                            aux = `https://br.betano.com${aux}`;
                            game = { link: aux, flag: true };
                        }
                        if (sub20 && names.includes('20')) {
                            let aux = array[index].url;
                            aux = `https://br.betano.com${aux}`;
                            game = { link: aux, flag: true };
                        }
                        if (women && names.includes('(f)')) {
                            let aux = array[index].url;
                            aux = `https://br.betano.com${aux}`;
                            game = { link: aux, flag: true };
                        }
                        if (!sub19 && !sub21 && !sub20 && !women) {
                            let aux = array[index].url;
                            aux = `https://br.betano.com${aux}`;
                            game = { link: aux, flag: true };
                        }
                    }
                    if (names.includes(awayname)) {
                        if (sub21 && names.includes('21')) {
                            let aux = array[index].url;
                            aux = `https://br.betano.com${aux}`;
                            game = { link: aux, flag: true };
                        }
                        if (sub19 && names.includes('19')) {
                            let aux = array[index].url;
                            aux = `https://br.betano.com${aux}`;
                            game = { link: aux, flag: true };
                        }
                        if (sub20 && names.includes('20')) {
                            let aux = array[index].url;
                            aux = `https://br.betano.com${aux}`;
                            game = { link: aux, flag: true };
                        }
                        if (women && names.includes('(f)')) {
                            let aux = array[index].url;
                            aux = `https://br.betano.com${aux}`;
                            game = { link: aux, flag: true };
                        }
                        if (!sub19 && !sub21 && !sub20 && !women) {
                            let aux = array[index].url;
                            aux = `https://br.betano.com${aux}`;
                            game = { link: aux, flag: true };
                        }
                    }
                }
            }
        }
    }

    if (!game.flag) {
        const url = 'https://betanojson.s3.sa-east-1.amazonaws.com/betano.json';
        const newresultados = await axios.get(url);
        const array = newresultados.data.data;
        if (array && array.length) {
            for (let index = 0; index < array.length; index++) {
                const element = array[index].participants;
                for (let j = 0; j < element.length; j++) {
                    const elementName1 = `${array[index].name}`;
                    const strArr = elementName1
                        .split(' ')
                        .filter(item => item !== 'B' && item !== 'de');
                    const str = strArr.join(' ');
                    const names = str
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    if (names.includes(home)) {
                        if (sub21 && names.includes('21')) {
                            let aux = array[index].url;
                            aux = aux.replace(
                                '/odds',
                                'https://br.betano.com/live',
                            );
                            game = { link: aux, flag: true };
                        }
                        if (sub19 && names.includes('19')) {
                            let aux = array[index].url;
                            aux = aux.replace(
                                '/odds',
                                'https://br.betano.com/live',
                            );
                            game = { link: aux, flag: true };
                        }
                        if (sub20 && names.includes('20')) {
                            let aux = array[index].url;
                            aux = aux.replace(
                                '/odds',
                                'https://br.betano.com/live',
                            );
                            game = { link: aux, flag: true };
                        }
                        if (women && names.includes('(f)')) {
                            let aux = array[index].url;
                            aux = aux.replace(
                                '/odds',
                                'https://br.betano.com/live',
                            );
                            game = { link: aux, flag: true };
                        }
                        if (!sub19 && !sub21 && !women && !sub20) {
                            let aux = array[index].url;
                            aux = aux.replace(
                                '/odds',
                                'https://br.betano.com/live',
                            );
                            game = { link: aux, flag: true };
                        }
                    }
                    if (names.includes(awayname)) {
                        if (sub21 && names.includes('21')) {
                            let aux = array[index].url;
                            aux = aux.replace(
                                '/odds',
                                'https://br.betano.com/live',
                            );
                            game = { link: aux, flag: true };
                        }
                        if (sub19 && names.includes('19')) {
                            let aux = array[index].url;
                            aux = aux.replace(
                                '/odds',
                                'https://br.betano.com/live',
                            );
                            game = { link: aux, flag: true };
                        }
                        if (sub20 && names.includes('20')) {
                            let aux = array[index].url;
                            aux = aux.replace(
                                '/odds',
                                'https://br.betano.com/live',
                            );
                            game = { link: aux, flag: true };
                        }
                        if (women && names.includes('(f)')) {
                            let aux = array[index].url;
                            aux = aux.replace(
                                '/odds',
                                'https://br.betano.com/live',
                            );
                            game = { link: aux, flag: true };
                        }
                        if (!sub19 && !sub21 && !women && !sub20) {
                            let aux = array[index].url;
                            aux = aux.replace(
                                '/odds',
                                'https://br.betano.com/live',
                            );
                            game = { link: aux, flag: true };
                        }
                    }
                }
            }
        }
    }
    console.log('\n\n BETANO URL', game);
    return game;
};
export const getBetanoEvent = async (
    home: string,
    away: string,
    time: number,
) => {
    const arr1 = home.split(' ').filter(item => item !== 'B' && item !== 'de');
    const arr2 = away.split(' ').filter(item => item !== 'B' && item !== 'de');
    const newHome = arr1.join(' ');
    const newAway = arr2.join(' ');
    const aux1 = newHome.toLowerCase().trim();
    const aux2 = newAway.toLowerCase().trim();
    let women = false;
    let sub19 = false;
    let sub20 = false;
    let sub21 = false;
    let url = '';
    let homename = aux1.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let awayname = aux2.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (homename.includes('ec')) {
        homename = homename.replace('ec', '');
        homename = homename.trim();
    }
    if (awayname.includes('ec')) {
        awayname = awayname.replace('ec', '');
        awayname = awayname.trim();
    }
    if (homename.includes('fc')) {
        homename = homename.replace('fc', '');
        homename = homename.trim();
    }
    if (awayname.includes('fc')) {
        awayname = awayname.replace('fc', '');
        awayname = awayname.trim();
    }
    if (homename.includes('fk')) {
        homename = homename.replace('fk', '');
        homename = homename.trim();
    }
    if (awayname.includes('fk')) {
        awayname = awayname.replace('fk', '');
        awayname = awayname.trim();
    }
    if (homename.includes('women')) {
        homename = homename.replace('women', '');
        homename = homename.trim();
        women = true;
    }
    if (awayname.includes('women')) {
        awayname = awayname.replace('women', '');
        awayname = awayname.trim();
        women = true;
    }
    if (homename.includes('u20')) {
        homename = homename.replace('u20', '');
        homename = homename.trim();
        sub20 = true;
    }
    if (awayname.includes('u20')) {
        awayname = awayname.replace('u20', '');
        awayname = awayname.trim();
        sub20 = true;
    }
    if (homename.includes('u21')) {
        homename = homename.replace('u21', '');
        homename = homename.trim();
        sub21 = true;
    }
    if (awayname.includes('u21')) {
        awayname = awayname.replace('u21', '');
        awayname = awayname.trim();
        sub21 = true;
    }
    if (homename.includes('u19')) {
        homename = homename.replace('u19', '');
        homename = homename.trim();
        sub19 = true;
    }
    if (awayname.includes('u19')) {
        awayname = awayname.replace('u19', '');
        awayname = awayname.trim();
        sub19 = true;
    }
    if (homename.includes('reserves')) {
        homename = homename.replace('reserves', '');
        homename = homename.trim();
    }
    if (awayname.includes('reserves')) {
        awayname = awayname.replace('reserves', '');
        awayname = awayname.trim();
    }
    const betanoGames = await betanoFilterUseCase.execute({ event: time });

    for (let i = 0; i < betanoGames.length; i++) {
        const element = betanoGames[i];
        const strArr = element.name
            .split(' ')
            .filter(item => item !== 'B' && item !== 'de');
        const str = strArr.join(' ');
        const names = str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        const homeBetanoName =
            element.home && element.home.name
                ? element.home.name
                : names
                      .split(' ')
                      .filter(item => item !== 'B' && item !== 'de')
                      .join(' ')
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '');
        const homeBetanoNickName =
            element.home && element.home.nickname
                ? element.home.nickname
                : names
                      .split(' ')
                      .filter(item => item !== 'B' && item !== 'de')
                      .join(' ')
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '');
        const homeBetanoAbvr =
            element.home && element.home.abbr
                ? element.home.abbr
                : names
                      .split(' ')
                      .filter(item => item !== 'B' && item !== 'de')
                      .join(' ')
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '');
        const awayBetanoName =
            element.away && element.away.name
                ? element.away.name
                : names
                      .split(' ')
                      .filter(item => item !== 'B' && item !== 'de')
                      .join(' ')
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '');
        const awayBetanoNickName =
            element.away && element.away.nickname
                ? element.away.nickname
                : names
                      .split(' ')
                      .filter(item => item !== 'B' && item !== 'de')
                      .join(' ')
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '');
        const awayBetanoAbvr =
            element.away && element.away.abbr
                ? element.away.abbr
                : names
                      .split(' ')
                      .filter(item => item !== 'B' && item !== 'de')
                      .join(' ')
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '');
        if (names.includes(homename) || names.includes(awayname)) {
            url = element.url;
        }
        if (homeBetanoName.includes(homename)) {
            url = element.url;
        }
        if (homeBetanoNickName.includes(homename)) {
            url = element.url;
        }
        if (homename.includes(homeBetanoAbvr)) {
            url = element.url;
        }
        if (awayBetanoName.includes(awayname)) {
            url = element.url;
        }
        if (awayBetanoNickName.includes(awayname)) {
            url = element.url;
        }
        if (awayname.includes(awayBetanoAbvr)) {
            url = element.url;
        }
    }
    return url;
};
export function templateMessage({
    weather,
    id,
    time,
    yellowcards,
    redcards,
    firstHalfGoalChance,
    gameLink,
    home,
    away,
    bet365_id,
    attacks,
    dangerous_attacks,
    possession_rt,
    corners,
    off_target,
    on_target,
    betanolink,
}) {
    // console.log({
    //     home,
    //     away,
    //     bet365_id,
    //     attacks,
    //     dangerous_attacks,
    //     possession_rt,
    //     corners,
    //     off_target,
    //     on_target,
    // });

    const temperature = weather ? (weather.main.temp - 273).toFixed(2) : null;
    const windSpeed = weather ? weather.wind.speed : null;
    const humidity = weather ? weather.main.humidity : null;
    const weatherstr = `Clima: Temperatura ${temperature || '?'} °C | Umidade ${
        humidity || '?'
    }% | Vento ${windSpeed || '?'} m/s `;
    return `⚽${home.name} x ${away.name}
⏱️${time}" - 1º tempo 

${betanolink ? `🔗Link do jogo betano:\n ${betanolink}` : ''}

🔗Link do jogo bet365:
https://www.bet365.com/#/IP/EV${gameLink}


📈 Eventos Casa/Visitante 
Ataques: ${attacks[0]}/${attacks[1]}
Ataques Perigosos: ${dangerous_attacks[0]}/${dangerous_attacks[1]}
Posse de bola: ${possession_rt ? possession_rt[0] : '?'}/${
        possession_rt ? possession_rt[1] : '?'
    }
Escanteios: ${corners[0]}/${corners[1]}

🤖Análise RoboGol 
Over 0.5 HT: ${firstHalfGoalChance}% 

🥅Chutes Casa/Visitante 
Total: ${parseInt(off_target[0]) + parseInt(on_target[0])}/${
        parseInt(off_target[1]) + parseInt(on_target[1])
    }
No Gol: ${on_target[0]}/${on_target[1]}
Fora do Gol: ${off_target[0]}/${off_target[1]};
${weather ? weatherstr : '\n'}
`;
}
export function templateMessagePrime({
    weather,
    id,
    time,
    yellowcards,
    redcards,
    firstHalfGoalChance,
    gameLink,
    home,
    away,
    bet365_id,
    attacks,
    dangerous_attacks,
    possession_rt,
    corners,
    off_target,
    on_target,
    betanolink,
}) {
    // console.log({
    //     home,
    //     away,
    //     bet365_id,
    //     attacks,
    //     dangerous_attacks,
    //     possession_rt,
    //     corners,
    //     off_target,
    //     on_target,
    // });

    const temperature = weather ? (weather.main.temp - 273).toFixed(2) : null;
    const windSpeed = weather ? weather.wind.speed : null;
    const humidity = weather ? weather.main.humidity : null;
    const weatherstr = `Clima: Temperatura ${temperature || '?'} °C | Umidade ${
        humidity || '?'
    }% | Vento ${windSpeed || '?'} m/s `;
    return `🎗 JOGO PRIME 
    ➡️ ${home.name} x ${away.name}
    
    ⏱️${time} minutos do primeiro tempo 
     
     🎗Link do jogo betano: 
    ${betanolink}
    
    📌Link do jogo bet365:
    https://www.bet365.com/#/IP/EV${gameLink}
    
    🥅 informações climáticas no jogo: 
    
    ${weather ? weatherstr : '\n'}
    
    📊 Eventos Casa/Visitante 
    
    ➡️ Ataques: ${attacks[0]}/${attacks[1]}
    ➡️ Ataques Perigosos: ${dangerous_attacks[0]}/${dangerous_attacks[1]}
    ➡️ Posse de bola: ${possession_rt ? possession_rt[0] : '?'}/${
        possession_rt ? possession_rt[1] : '?'
    }
    ➡️ Escanteios: ${corners[0]}/${corners[1]}
    
    ⚽️ Chutes Casa/Visitante 
    
    📌 Total: ${parseInt(off_target[0]) + parseInt(on_target[0])}/${
        parseInt(off_target[1]) + parseInt(on_target[1])
    }
    📌 No Gol: ${on_target[0]}/${on_target[1]}
    📌 Fora do Gol: ${off_target[0]}/${off_target[1]};
    🤖🎗 Análise do ROBÔGOL PRIME: 
    ⚜️ Porcentagem para sair 0.5 gols no primeiro tempo: ${firstHalfGoalChance}% 
     `;
}
export const setEventMessage = async (message_id, eventId, text) => {
    const event = await filterEventUseCase.execute(eventId);
    event.messageId = message_id;
    await eventCreateUseCase.execute({ event });
    const message = new Message();
    message.id = message_id;
    message.text = { data: text };
    await messageCreateUseCase.execute({ message });
};
export const setEventMessagePrime = async (message_id, eventId, text) => {
    const event = await filterEventUseCase.execute(eventId);
    event.messagePrimeId = message_id;
    await eventCreateUseCase.execute({ event });
    const message = new Message();
    message.id = message_id;
    message.text = { data: text };
    await messageCreateUseCase.execute({ message });
};
export const getUnfinishedSavedGames = async (upperLimit, lowerLimit) => {
    const now = Math.floor(new Date().getTime() / 1000);
    const upperLimitTime = now - 60 * upperLimit;
    const lowerLimitTime = now - 60 * lowerLimit;
    const events = await filterUnfinishedEventsUseCase.execute({
        start: lowerLimitTime,
        end: upperLimitTime,
    });
    return events;
};
export const updateEvent = async data => {
    const event = await filterEventUseCase.execute(data.id);
    if (!event) {
        throw new Error('Event not found');
    }
    await eventCreateUseCase.execute(data);
};
export const getMessageById = async message_id => {
    const message = await messageFilterByIdUseCase.execute(message_id);
    return message;
};
export const setMessageAsGreen = async message_id => {
    const green = `\n Gol! ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ \n`;
    const message = await messageFilterByIdUseCase.execute(message_id);
    message.text.data += green;
    await messageCreateUseCase.execute({ message });
    return message;
};

export const setMessageAsRed = async message_id => {
    const red = `\n Sem gol ✖️ \n`;
    const message = await messageFilterByIdUseCase.execute(message_id);
    message.text.data += red;
    await messageCreateUseCase.execute({ message });
    return message;
};
export const getTodaysEvents = async () => {
    const ONE_DAY = 60 * 60 * 24;
    const now = Math.floor(new Date().getTime() / 1000);
    const oneDayAgo = now - ONE_DAY + 120; // add two minutes so there's no overlap
    const events = await eventsBetweenDatesUseCase.execute({
        start: oneDayAgo,
        end: now,
    });
    return events;
};

export const saveDailyReport = async (
    greens: number,
    reds: number,
    total: number,
) => {
    const dailyReport = new DailyReport();
    dailyReport.greens = greens;
    dailyReport.reds = reds;
    dailyReport.total = total;
    await dailyReportsCreateUseCase.execute({ dailyReport });
};
export const saveDailyReportPrime = async (
    greens: number,
    reds: number,
    total: number,
) => {
    const dailyReport = new DailyReport();
    dailyReport.greens = greens;
    dailyReport.reds = reds;
    dailyReport.total = total;
    await dailyReportsPrimeCreateUseCase.execute({ dailyReport });
};
export const getDailyReports = async (startDate: Date) => {
    const reports = await filterDailyReportsByDatesUseCase.execute({
        start: startDate,
        end: new Date(),
    });
    return reports;
};
export const getDailyReportsPrime = async (startDate: Date) => {
    const reports = await filterDailyReportsPrimeByDatesUseCase.execute({
        start: startDate,
        end: new Date(),
    });
    return reports;
};
// export default class BetsService {}
