/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
// import axios from 'axios';
import { inject, injectable } from 'tsyringe';

import { BetanoEvent } from '../../../../entities/BetanoEvents';
import { IUpcommingEventsBetanoRepository } from '../../repositories/types/IBetsRepository';
// import { IUserRepository } from '../../repositories/types/IUserRepository';
// import { IUser } from '../../repositories/UserRepositories';

interface IRequest {
    event: any;
}
@injectable()
class BetanoEventFilterUseCase {
    constructor(
        @inject('BetanoEvents')
        private betanoEventsRepository: IUpcommingEventsBetanoRepository,
    ) {}
    async execute({ event }: IRequest): Promise<BetanoEvent[]> {
        const isEventOnDb =
            await this.betanoEventsRepository.getUpcomingEventFromDB(event);
        return isEventOnDb;
    }
}

export { BetanoEventFilterUseCase };
