import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../erros/AppError';
import { IUserRepository } from '../../repositories/types/IUserRepository';
import { IUser } from '../../repositories/UserRepositories';

interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    user: IUser;
    token: string;
}
@injectable()
class AuthUserUseCase {
    constructor(
        @inject('UserRepositories')
        private userRepository: IUserRepository,
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse | null> {
        const user = (await this.userRepository.findByEmail({
            email,
        })) as IUser;
        if (!user) {
            throw new AppError('Email incorreto!', 401);
        }
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError('Senha incorreta!', 401);
        }
        const token = sign(
            { id: user.id },
            '702bfcb73eac4edf9edc10229ae774cd',
            {
                expiresIn: '1d',
            },
        );
        const tokenReturn: IResponse = {
            user,
            token,
        };
        return tokenReturn;
    }
}

export { AuthUserUseCase };
