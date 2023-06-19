import { Repository } from 'typeorm';

import { myDataSource } from '../../../../app-data-source-dev';
import { Message } from '../../../entities/Message';
import { IMessagesRepository } from './types/IBetsRepository';

class MessagesRepository implements IMessagesRepository {
    private repository: Repository<Message>;
    // private static INSTANCE: UserRepositories;
    constructor() {
        this.repository = myDataSource.getRepository(Message);
    }

    async getFromDB(id: number): Promise<Message> {
        const event = await this.repository.findOne({
            where: {
                id,
            },
        });
        return event;
    }
    async create(data: any): Promise<Message> {
        const event = await this.repository.save(data);
        return event;
    }
}

export { MessagesRepository };
