import { inject, injectable } from 'tsyringe';

import { User } from '../../../../entities/user';
import { IUserRepository } from '../../repositories/types/IUserRepository';
import { IUser } from '../../repositories/UserRepositories';

interface IRequest {
    email: string;
}
@injectable()
class ResetPasswordUseCase {
    constructor(
        @inject('UserRepositories')
        private userRepository: IUserRepository,
    ) {}
    async execute({ email }: IRequest): Promise<User> {
        const exists = await this.userRepository.findByEmail({ email });
        return exists;
    }
}

export { ResetPasswordUseCase };
