import { Repository } from 'typeorm';

import { myDataSource } from '../../../../app-data-source-dev';
import { Afiliate } from '../../../entities/afiliates';
import {
    IClientFindDTO,
    IClientRepository,
    IUserFindDTO,
} from './types/IClientsRepository';

interface ICreateClientDTO {
    name: string;
    email: string;
    phone: string;
    document?: string;
    zipcode?: string;
    address?: string;
    district?: string;
    state?: string;
    city?: string;
}
interface IFindClientbyEmailDTO {
    email: string;
}
class AfiliatesRepositories implements IClientRepository {
    private repository: Repository<Afiliate>;
    // private static INSTANCE: AfiliateRepositories;
    constructor() {
        this.repository = myDataSource.getRepository(Afiliate);
    }
    async findByPlatform({ email, platform }: IUserFindDTO): Promise<Afiliate> {
        let user;
        if (platform === 'Eduzz') {
            user = await this.repository.findOne({
                where: { emailEduzz: email },
            });
        }
        if (platform === 'Braip') {
            const emailBraip = email;
            user = await this.repository.findOne({
                where: { emailBraip },
            });
        }
        if (platform === 'Kiwifi') {
            const emailKiwifi = email;
            user = await this.repository.findOne({
                where: { emailKiwifi },
            });
        }
        return user;
    }
    // public static getInstance(): UserRepositories {
    //     if (!UserRepositories.INSTANCE) {
    //         UserRepositories.INSTANCE = new UserRepositories();
    //     }
    //     return UserRepositories.INSTANCE;
    // }

    async create({
        name,
        email,
        phone,
        document,
    }: ICreateClientDTO): Promise<Afiliate> {
        const client = this.repository.create({
            name,
            email,
            phone,
            document,
        });
        await this.repository.save(client);
        return client;
    }

    async list(): Promise<Afiliate[]> {
        const clients = await this.repository.find();
        return clients;
    }

    async findByEmail({ email }: IFindClientbyEmailDTO): Promise<Afiliate> {
        const client = await this.repository.findOne({
            where: { email },
        });
        return client;
    }
}

export { AfiliatesRepositories };
