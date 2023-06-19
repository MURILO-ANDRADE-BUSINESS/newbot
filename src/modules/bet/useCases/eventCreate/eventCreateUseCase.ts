/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import axios from 'axios';
import { inject, injectable } from 'tsyringe';

import { Event } from '../../../../entities/Event';
import { EventWeatherData } from '../../../../entities/EventWeatherData';
import { UpcomingEvent } from '../../../../entities/UpcomingEvent';
import { UpcomingEventOdds } from '../../../../entities/UpcomingEventOdds';
import { AppError } from '../../../../erros/AppError';
import { EventView } from '../../../../utils/types';
import { IEventsRepository } from '../../repositories/types/IBetsRepository';
// import { IUserRepository } from '../../repositories/types/IUserRepository';
// import { IUser } from '../../repositories/UserRepositories';

interface IRequest {
    event: any;
}
@injectable()
class EventCreateUseCase {
    constructor(
        @inject('Events')
        private eventsRepository: IEventsRepository,
    ) {}
    async execute({ event }: IRequest): Promise<Event> {
        const isEventOnDb = await this.eventsRepository.create(event);
        return isEventOnDb;
    }
}

export { EventCreateUseCase };
