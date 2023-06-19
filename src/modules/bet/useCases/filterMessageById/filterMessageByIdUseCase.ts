import { inject, injectable } from 'tsyringe';

import { Message } from '../../../../entities/Message';
import { IMessagesRepository } from '../../repositories/types/IBetsRepository';
// import { AppError } from '../../../../erros/AppError';
// import { IUserRepository } from '../../repositories/types/IUserRepository';
// import { IUser } from '../../repositories/UserRepositories';

interface IRequest {
    event: any;
}
@injectable()
class MessagesFilterByIdUseCase {
    constructor(
        @inject('Messages')
        private messagesReposiory: IMessagesRepository,
    ) {}
    async execute({ event }: IRequest): Promise<Message> {
        const isEventOnDb = await this.messagesReposiory.getFromDB(event);
        return isEventOnDb;
    }
}

export { MessagesFilterByIdUseCase };
