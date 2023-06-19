import { Between, Repository } from 'typeorm';

import { myDataSource } from '../../../../app-data-source-dev';
import { DailyReport } from '../../../entities/DailyReport';
import { IDailyReportsRepository } from './types/IBetsRepository';

class DailyReportsRepository implements IDailyReportsRepository {
    private repository: Repository<DailyReport>;
    // private static INSTANCE: UserRepositories;
    constructor() {
        this.repository = myDataSource.getRepository(DailyReport);
    }
    async betweenDatesFilter(
        upperLimit: Date,
        lowerLimit: Date,
    ): Promise<DailyReport[]> {
        const event = await this.repository.find({
            where: {
                date: Between(lowerLimit, upperLimit),
            },
        });
        return event;
    }
    async getFromDB(id: number): Promise<DailyReport> {
        const event = await this.repository.findOne({
            where: {
                id,
            },
        });
        return event;
    }
    async create(data: any): Promise<DailyReport> {
        const event = await this.repository.save(data);
        return event;
    }
}

export { DailyReportsRepository };
