/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { inject, injectable } from 'tsyringe';

// import { AppError } from '../../../../erros/AppError';

import { DailyReport } from '../../../../entities/DailyReport';
import { IDailyReportsRepository } from '../../repositories/types/IBetsRepository';
// import { IUserRepository } from '../../repositories/types/IUserRepository';
// import { IUser } from '../../repositories/UserRepositories';

interface IRequest {
    dailyReport: any;
}
@injectable()
class DailyReportsCreateUseCase {
    constructor(
        @inject('DailyReports')
        private dailyReportsRepository: IDailyReportsRepository,
    ) {}
    async execute({ dailyReport }: IRequest): Promise<DailyReport> {
        const isEventOnDb = await this.dailyReportsRepository.create(
            dailyReport,
        );
        return isEventOnDb;
    }
}

export { DailyReportsCreateUseCase };
