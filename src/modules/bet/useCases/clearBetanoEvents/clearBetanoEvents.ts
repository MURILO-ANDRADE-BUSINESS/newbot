/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import axios from 'axios';
import { inject, injectable } from 'tsyringe';

// import { AppError } from '../../../../erros/AppError';
import { IUpcommingEventsBetanoRepository } from '../../repositories/types/IBetsRepository';
// import { IUserRepository } from '../../repositories/types/IUserRepository';
// import { IUser } from '../../repositories/UserRepositories';

@injectable()
class ClearUpcomingEventsBetanoUseCase {
    constructor(
        @inject('BetanoEvents')
        private upcomingEventsBetanoRepository: IUpcommingEventsBetanoRepository,
    ) {}
    async execute(): Promise<boolean> {
        await this.upcomingEventsBetanoRepository.clear();
        return true;
    }
}

export { ClearUpcomingEventsBetanoUseCase };
