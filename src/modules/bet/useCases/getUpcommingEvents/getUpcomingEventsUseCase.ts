/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import axios from 'axios';
import { inject, injectable } from 'tsyringe';

import { UpcomingEvent } from '../../../../entities/UpcomingEvent';
import { UpcomingEventOdds } from '../../../../entities/UpcomingEventOdds';
import { AppError } from '../../../../erros/AppError';
import { getEventPreMatchOdd } from '../../../../services/betsService';
import {
    IUpcommingEventsOddsRepository,
    IUpcommingEventsRepository,
} from '../../repositories/types/IBetsRepository';
// import { IUserRepository } from '../../repositories/types/IUserRepository';
// import { IUser } from '../../repositories/UserRepositories';

interface IRequest {
    page: string;
}
@injectable()
class GetUpcomingEventsUseCase {
    constructor(
        @inject('UpcomingEvents')
        private upcomingEventsRepository: IUpcommingEventsRepository,
        @inject('UpcomingEventsOdds')
        private upcomingEventsOddsRepository: IUpcommingEventsOddsRepository,
    ) {}
    async execute(): Promise<boolean> {
        try {
            // eslint-disable-next-line no-plusplus
            for (let i = 1; i <= 9; i++) {
                const url = `https://api.b365api.com/v3/events/upcoming?sport_id=1&token=97036-xkyu7zXimmfs3P&page=${i}`;
                const results = await axios.get(url);
                const data = results.data.results as any[];
                for (const event of results.data.results) {
                    const eventLeagueId = event.league.id;
                    const eventTime = event.time;
                    const isEventOnDB = false;
                    await this.upcomingEventsRepository.getUpcomingEventFromDB(
                        event.id,
                    );
                    if (!isEventOnDB) {
                        try {
                            if (event.bet365_id) {
                                const dbEvent = new UpcomingEvent();
                                dbEvent.data = event;
                                dbEvent.leagueId = eventLeagueId;
                                dbEvent.time = parseInt(eventTime, 10);
                                dbEvent.id = event.id;
                                await this.upcomingEventsRepository.create(
                                    dbEvent,
                                );
                                const oddsData = (
                                    await getEventPreMatchOdd(event.bet365_id)
                                ).results;
                                const eventOdds = new UpcomingEventOdds();
                                eventOdds.data = oddsData;
                                eventOdds.eventId = event.id;
                                await this.upcomingEventsOddsRepository.create(
                                    eventOdds,
                                );
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }
                }
            }
            return true;
        } catch {
            return false;
        }
    }
}

export { GetUpcomingEventsUseCase };
