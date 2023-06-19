import { inject, injectable } from 'tsyringe';

import { User } from '../../../../entities/user';
import { IUserRepository } from '../../repositories/types/IUserRepository';
import { IUser } from '../../repositories/UserRepositories';

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject('UserRepositories')
        private userRepository: IUserRepository,
    ) {}
    async execute({
        id,
        name,
        email,
        password,
        role,
        active,
        virtual,
        fut,
        jogadorCaro,
        manualPrime,
        dueDate,
        mjcDate,
    }: IUser): Promise<User> {
        const user = await this.userRepository.updateUserById({
            id,
            name,
            email,
            password,
            role,
            active,
            virtual,
            fut,
            jogadorCaro,
            manualPrime,
            dueDate,
            mjcDate,
        });
        return user;
    }
}

export { UpdateUserUseCase };
