/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { inject, injectable } from 'tsyringe';

// import { AppError } from '../../../../erros/AppError';
import { Message } from '../../../../entities/Message';
import { IMessagesRepository } from '../../repositories/types/IBetsRepository';
// import { IUserRepository } from '../../repositories/types/IUserRepository';
// import { IUser } from '../../repositories/UserRepositories';

interface IRequest {
    message: any;
}
@injectable()
class MessageCreateUseCase {
    constructor(
        @inject('Messages')
        private eventsRepository: IMessagesRepository,
    ) {}
    async execute({ message }: IRequest): Promise<Message> {
        const isEventOnDb = await this.eventsRepository.create(message);
        return isEventOnDb;
    }
}

export { MessageCreateUseCase };
