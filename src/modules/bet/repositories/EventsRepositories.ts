import { Between, Repository } from 'typeorm';

import { myDataSource } from '../../../../app-data-source-dev';
import { Event } from '../../../entities/Event';
import { UpcomingEvent } from '../../../entities/UpcomingEvent';
import {
    IEventsRepository,
    IUpcommingEventsRepository,
    IUserFindDTO,
} from './types/IBetsRepository';

class EventsRepository implements IEventsRepository {
    private repository: Repository<Event>;
    // private static INSTANCE: UserRepositories;
    constructor() {
        this.repository = myDataSource.getRepository(Event);
    }

    async getEventFromDB(id: string): Promise<Event> {
        const event = await this.repository.findOne({
            where: {
                id,
            },
        });
        return event;
    }
    async unfinishedEventsFilter(
        upperLimit: number,
        lowerLimit: number,
    ): Promise<Event[]> {
        const event = await this.repository.find({
            where: [
                {
                    time: Between(lowerLimit, upperLimit),
                    isFinished: false,
                },
                {
                    time: Between(lowerLimit, upperLimit),
                    isFinished: null,
                },
            ],
        });
        return event;
    }
    async EventsBetweenDatesFilter(
        upperLimit: number,
        lowerLimit: number,
    ): Promise<Event[]> {
        const event = await this.repository.find({
            where: [
                {
                    time: Between(lowerLimit, upperLimit),
                },
            ],
        });
        return event;
    }
    async create(data: any): Promise<Event> {
        const event = await this.repository.save(data);
        return event;
    }
}

export { EventsRepository };
