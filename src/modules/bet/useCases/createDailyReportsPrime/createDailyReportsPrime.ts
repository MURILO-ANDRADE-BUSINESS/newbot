/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { inject, injectable } from 'tsyringe';

// import { AppError } from '../../../../erros/AppError';

import { DailyReportPrime } from '../../../../entities/DailyReportsPrime';
import { IDailyReportsPrimeRepository } from '../../repositories/types/IBetsRepository';
// import { IUserRepository } from '../../repositories/types/IUserRepository';
// import { IUser } from '../../repositories/UserRepositories';

interface IRequest {
    dailyReport: any;
}
@injectable()
class DailyReportsPrimeCreateUseCase {
    constructor(
        @inject('PrimeReports')
        private dailyReportsRepository: IDailyReportsPrimeRepository,
    ) {}
    async execute({ dailyReport }: IRequest): Promise<DailyReportPrime> {
        const isEventOnDb = await this.dailyReportsRepository.create(
            dailyReport,
        );
        return isEventOnDb;
    }
}

export { DailyReportsPrimeCreateUseCase };
