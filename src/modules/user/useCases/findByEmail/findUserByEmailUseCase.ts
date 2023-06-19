import { inject, injectable } from 'tsyringe';

import { User } from '../../../../entities/user';
import { IUserRepository } from '../../repositories/types/IUserRepository';

interface IRequest {
    email: string;
}
@injectable()
export class FindUserByEmailUseCase {
    constructor(
        @inject('UserRepositories')
        private userRepository: IUserRepository,
    ) {}
    async execute({ email }: IRequest): Promise<User> {
        const exists = await this.userRepository.findByEmail({ email });
        return exists;
    }
}
