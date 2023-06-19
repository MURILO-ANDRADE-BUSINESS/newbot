/* eslint-disable no-unused-expressions */
import { Repository } from 'typeorm';

import { myDataSource } from '../../../../app-data-source-dev';
import { Role, User } from '../../../entities/user';
import { IUpdateUserById, IUserRepository } from './types/IUserRepository';

interface ICreateUserDTO {
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
interface IFindUserDTO {
    email: string;
    platform: string;
}
interface IFindUserbyEmailDTO {
    email: string;
}
export interface IUser {
    id: number;
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
class UserRepositories implements IUserRepository {
    private repository: Repository<User>;
    // private static INSTANCE: UserRepositories;
    constructor() {
        this.repository = myDataSource.getRepository(User);
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
        password,
        role,
        active,
        virtual,
        fut,
        jogadorCaro,
        manualPrime,
        dueDate,
        mjcDate,
    }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
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
        await this.repository.save(user);
        return user;
    }

    async list(): Promise<User[]> {
        const users = await this.repository.find({ relations: ['sale'] });
        return users;
    }

    async findByEmail({ email }: IFindUserbyEmailDTO): Promise<User> {
        const user = await this.repository.findOne({
            where: { email },
        });
        return user;
    }
    async updateUserById(user: IUser): Promise<User | null> {
        const exists = await this.repository.findOne({
            where: { id: user.id },
        });
        if (exists) {
            exists.name = user.name ? user.name : exists.name;
            exists.email = user.email ? user.email : user.email;
            exists.active =
                user.active !== undefined ? user.active : exists.active;
            (exists.role as any) = user.role
                ? user.role
                : (exists.role as Role);
            exists.fut = user.fut !== undefined ? user.fut : exists.fut;
            exists.manualPrime =
                user.manualPrime !== undefined
                    ? user.manualPrime
                    : exists.manualPrime;
            exists.jogadorCaro =
                user.jogadorCaro !== undefined
                    ? user.jogadorCaro
                    : exists.jogadorCaro;
            exists.mjcDate =
                user.mjcDate !== undefined ? user.mjcDate : exists.mjcDate;
            exists.dueDate = user.dueDate ? user.dueDate : exists.dueDate;
            const updated = await this.repository.save(exists);
            return updated;
        }
        return null;
    }
}

export { UserRepositories };
