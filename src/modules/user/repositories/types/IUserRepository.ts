import { Role, User } from '../../../../entities/user';
import { IUser } from '../UserRepositories';

export interface IUserRepositoryCreate {
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
export interface IUserFindDTO {
    email: string;
    platform: string;
}
interface IFindUserbyEmailDTO {
    email: string;
}
export interface IUpdateUserById {
    id: string;
    property: string;
    value: string;
}
export interface IUserRepository {
    list(): Promise<User[]>;
    create({
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
    }: IUserRepositoryCreate): Promise<User>;
    findByEmail({ email }: IFindUserbyEmailDTO): Promise<User>;
    updateUserById(user: IUser): Promise<User>;
}
