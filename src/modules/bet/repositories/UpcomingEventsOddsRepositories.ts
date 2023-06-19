import { Repository } from 'typeorm';

import { myDataSource } from '../../../../app-data-source-dev';
import { UpcomingEventOdds } from '../../../entities/UpcomingEventOdds';
import { IUpcommingEventsOddsRepository } from './types/IBetsRepository';

class UpcomingEventsOddsRepository implements IUpcommingEventsOddsRepository {
    private repository: Repository<UpcomingEventOdds>;
    // private static INSTANCE: UserRepositories;
    constructor() {
        this.repository = myDataSource.getRepository(UpcomingEventOdds);
    }
    async getUpcomingEventOddsFromDB(id: number): Promise<UpcomingEventOdds> {
        const event = await this.repository.findOne({
            where: {
                id,
            },
        });
        return event;
    }
    async create(data: any): Promise<UpcomingEventOdds> {
        const event = await this.repository.save(data);
        return event;
    }
}

export { UpcomingEventsOddsRepository };
