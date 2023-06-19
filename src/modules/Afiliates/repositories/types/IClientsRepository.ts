import { Afiliate } from '../../../../entities/afiliates';

export interface IClientRepositoryCreate {
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
export interface IClientFindDTO {
    email: string;
    platform: string;
}
interface IFindClientbyEmailDTO {
    email: string;
}
export interface IUserFindDTO {
    email: string;
    platform: string;
}
export interface IClientRepository {
    list(): Promise<Afiliate[]>;
    create({
        name,
        email,
        phone,
        document,
        zipcode,
        address,
        district,
        state,
        city,
    }: IClientRepositoryCreate): Promise<Afiliate>;
    findByEmail({ email }: IFindClientbyEmailDTO): Promise<Afiliate>;
    findByPlatform({ email, platform }: IUserFindDTO): Promise<Afiliate>;
}
