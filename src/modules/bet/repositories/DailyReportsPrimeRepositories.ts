import { Between, Repository } from 'typeorm';

import { myDataSource } from '../../../../app-data-source-dev';
import { DailyReportPrime } from '../../../entities/DailyReportsPrime';
import { IDailyReportsPrimeRepository } from './types/IBetsRepository';

class DailyReportsPrimeRepository implements IDailyReportsPrimeRepository {
    private repository: Repository<DailyReportPrime>;
    // private static INSTANCE: UserRepositories;
    constructor() {
        this.repository = myDataSource.getRepository(DailyReportPrime);
    }
    async betweenDatesFilter(
        upperLimit: Date,
        lowerLimit: Date,
    ): Promise<DailyReportPrime[]> {
        const event = await this.repository.find({
            where: {
                date: Between(lowerLimit, upperLimit),
            },
        });
        return event;
    }
    async getFromDB(id: number): Promise<DailyReportPrime> {
        const event = await this.repository.findOne({
            where: {
                id,
            },
        });
        return event;
    }
    async create(data: any): Promise<DailyReportPrime> {
        const event = await this.repository.save(data);
        return event;
    }
}

export { DailyReportsPrimeRepository };
