import { IClientRepository } from '../repositories/types/IClientsRepository';

interface IRequest {
    name: string;
    email: string;
    phone: string;
    document: string;
    birthday: string;
    instagram: string;
    zipcode: string;
    address: string;
    district: string;
    state: string;
    city: string;
    secret: boolean;
    password: string;
}

class CreateClientService {
    constructor(private ClientRepository: IClientRepository) {}
    execute({
        name,
        email,
        phone,
        document,
        zipcode,
        address,
        district,
        state,
        city,
    }: IRequest): void {
        const exists = this.ClientRepository.findByEmail({ email });
        if (exists) {
            throw new Error('Usuário já cadastrado');
        }
        this.ClientRepository.create({
            name,
            email,
            phone,
            document,
            zipcode,
            address,
            district,
            state,
            city,
        });
    }
}

export { CreateClientService };
