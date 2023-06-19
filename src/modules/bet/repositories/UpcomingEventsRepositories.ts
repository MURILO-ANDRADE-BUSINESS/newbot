import { Repository } from 'typeorm';

import { myDataSource } from '../../../../app-data-source-dev';
import { UpcomingEvent } from '../../../entities/UpcomingEvent';
import { IUpcommingEventsRepository } from './types/IBetsRepository';

class UpcomingEventsRepository implements IUpcommingEventsRepository {
    private repository: Repository<UpcomingEvent>;
    // private static INSTANCE: UserRepositories;
    constructor() {
        this.repository = myDataSource.getRepository(UpcomingEvent);
    }

    async getUpcomingEventFromDB(id: string): Promise<UpcomingEvent> {
        const event = await this.repository.findOne({
            where: {
                id,
            },
        });
        return event;
    }
    async create(data: any): Promise<UpcomingEvent> {
        const event = await this.repository.save(data);
        return event;
    }
}

export { UpcomingEventsRepository };
