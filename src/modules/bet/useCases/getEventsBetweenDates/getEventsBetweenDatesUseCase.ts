/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { inject, injectable } from 'tsyringe';

import { Event } from '../../../../entities/Event';
// import { AppError } from '../../../../erros/AppError';
import { IEventsRepository } from '../../repositories/types/IBetsRepository';
// import { IUserRepository } from '../../repositories/types/IUserRepository';
// import { IUser } from '../../repositories/UserRepositories';

interface IRequest {
    start: number;
    end: number;
}
@injectable()
class GetEventsBetweenDatesUseCase {
    constructor(
        @inject('Events')
        private eventsRepository: IEventsRepository,
    ) {}
    async execute({ start, end }: IRequest): Promise<Event[]> {
        const isEventOnDb =
            await this.eventsRepository.EventsBetweenDatesFilter(start, end);
        return isEventOnDb;
    }
}

export { GetEventsBetweenDatesUseCase };
