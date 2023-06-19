import { inject, injectable } from 'tsyringe';

import { Afiliate } from '../../../../entities/afiliates';
import { IClientRepository } from '../../repositories/types/IClientsRepository';

interface IRequest {
    name: string;
    email: string;
    phone: string;
    document: string;
}
@injectable()
class CreateClientUseCase {
    constructor(
        @inject('ClientRepositories')
        private clientRepository: IClientRepository,
    ) {}
    async execute({
        name,
        email,
        phone,
        document,
    }: IRequest): Promise<Afiliate> {
        const exists = await this.clientRepository.findByEmail({ email });
        if (exists) {
            return exists;
        }
        const user = await this.clientRepository.create({
            name,
            email,
            phone,
            document,
        });
        return user;
    }
}

export { CreateClientUseCase };
