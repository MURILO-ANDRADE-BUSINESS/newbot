import { inject, injectable } from 'tsyringe';

import { Afiliate } from '../../../../entities/afiliates';
import { IClientRepository } from '../../repositories/types/IClientsRepository';

interface IRequest {
    email: string;
}
@injectable()
export class FindClientByEmailUseCase {
    constructor(
        @inject('AfiliateRepositories')
        private clientRepository: IClientRepository,
    ) {}
    async execute({ email }: IRequest): Promise<Afiliate> {
        const exists = await this.clientRepository.findByEmail({ email });
        return exists;
    }
}
