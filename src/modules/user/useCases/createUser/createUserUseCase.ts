import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { Role, User } from '../../../../entities/user';
import { IUserRepository } from '../../repositories/types/IUserRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
    role?: Role;
    active?: boolean;
    virtual?: boolean;
    fut?: boolean;
    jogadorCaro?: boolean;
    manualPrime?: boolean;
    dueDate?: Date | null;
    mjcDate?: Date | null;
}
@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UserRepositories')
        private userRepository: IUserRepository,
    ) {}
    async execute({
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
    }: IRequest): Promise<User> {
        const exists = await this.userRepository.findByEmail({ email });
        if (exists) {
            return exists;
        }
        const passwordHash = await hash(password, 8);
        const user = await this.userRepository.create({
            name,
            email,
            role,
            active,
            virtual,
            fut,
            jogadorCaro,
            manualPrime,
            dueDate,
            mjcDate,
            password: passwordHash,
        });
        return user;
    }
}

export { CreateUserUseCase };
