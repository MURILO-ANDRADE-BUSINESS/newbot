/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { inject, injectable } from 'tsyringe';

import { DailyReportPrime } from '../../../../entities/DailyReportsPrime';
// import { AppError } from '../../../../erros/AppError';
import { IDailyReportsPrimeRepository } from '../../repositories/types/IBetsRepository';
// import { IUserRepository } from '../../repositories/types/IUserRepository';
// import { IUser } from '../../repositories/UserRepositories';

interface IRequest {
    start: Date;
    end: Date;
}
@injectable()
class FilterDailyReportsPrimeBetweenDatesUseCase {
    constructor(
        @inject('PrimeReports')
        private dailyReportsRepository: IDailyReportsPrimeRepository,
    ) {}
    async execute({ start, end }: IRequest): Promise<DailyReportPrime[]> {
        const isEventOnDb =
            await this.dailyReportsRepository.betweenDatesFilter(start, end);
        return isEventOnDb;
    }
}

export { FilterDailyReportsPrimeBetweenDatesUseCase };
