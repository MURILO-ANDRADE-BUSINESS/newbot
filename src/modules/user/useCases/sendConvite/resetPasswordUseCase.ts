import axios from 'axios';
import { inject, injectable } from 'tsyringe';

import { User } from '../../../../entities/user';
import { IUserRepository } from '../../repositories/types/IUserRepository';
import { IUser } from '../../repositories/UserRepositories';

interface IRequest {
    email: string[];
}
@injectable()
class ResetPasswordUseCase {
    constructor(
        @inject('UserRepositories')
        private userRepository: IUserRepository,
    ) {}
    async execute({ email }: IRequest): Promise<boolean> {
        try {
            const url = 'https://api.brevo.com/v3/smtp/email';
            const email1 = {
                sender: {
                    email: 'contato@murilohenrique.com',
                    name: 'Murilo Henrique',
                },
                subject: 'R$ 1.000 por dia fazendo isso...',
                templateId: 1,
                to: [
                    {
                        email,
                        name: email,
                    },
                ],
            };
            const options = {
                headers: {
                    'api-key':
                        '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',
                },
            };
            console.log('aqui');
            await axios.post(url, email1, options);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

export { ResetPasswordUseCase };
