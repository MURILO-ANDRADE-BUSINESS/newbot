/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { inject, injectable } from 'tsyringe';

import { DailyReport } from '../../../../entities/DailyReport';
// import { AppError } from '../../../../erros/AppError';
import { IDailyReportsRepository } from '../../repositories/types/IBetsRepository';
// import { IUserRepository } from '../../repositories/types/IUserRepository';
// import { IUser } from '../../repositories/UserRepositories';

interface IRequest {
    start: Date;
    end: Date;
}
@injectable()
class FilterDailyReportsBetweenDatesUseCase {
    constructor(
        @inject('DailyReports')
        private dailyReportsRepository: IDailyReportsRepository,
    ) {}
    async execute({ start, end }: IRequest): Promise<DailyReport[]> {
        const isEventOnDb =
            await this.dailyReportsRepository.betweenDatesFilter(start, end);
        return isEventOnDb;
    }
}

export { FilterDailyReportsBetweenDatesUseCase };
