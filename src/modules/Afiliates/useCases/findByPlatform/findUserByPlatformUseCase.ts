import { inject, injectable } from 'tsyringe';

import { Afiliate } from '../../../../entities/afiliates';
import { IClientRepository } from '../../repositories/types/IClientsRepository';

interface IRequest {
    email: string;
    platform: string;
}
@injectable()
export class FindUserByPlatformUseCase {
    constructor(
        @inject('UserRepositories')
        private userRepository: IClientRepository,
    ) {}
    async execute({ email, platform }: IRequest): Promise<Afiliate> {
        const exists = await this.userRepository.findByPlatform({
            email,
            platform,
        });
        return exists;
    }
}
