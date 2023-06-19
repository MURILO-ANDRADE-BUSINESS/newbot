import { Repository } from 'typeorm';

import { myDataSource } from '../../../../app-data-source-dev';
import { BetanoEvent } from '../../../entities/BetanoEvents';
import { IUpcommingEventsBetanoRepository } from './types/IBetsRepository';

class UpcomingEventsBetanoRepository
    implements IUpcommingEventsBetanoRepository
{
    private repository: Repository<BetanoEvent>;
    // private static INSTANCE: UserRepositories;
    constructor() {
        this.repository = myDataSource.getRepository(BetanoEvent);
    }

    async getUpcomingEventFromDB(id: number): Promise<BetanoEvent[]> {
        const event = await this.repository.find();
        return event;
    }
    async create(data: any): Promise<BetanoEvent> {
        const event = await this.repository.save(data);
        return event;
    }
    async clear(): Promise<boolean> {
        await this.repository.clear();
        return true;
    }
}

export { UpcomingEventsBetanoRepository };
