import { Between, Repository } from 'typeorm';

import { myDataSource } from '../../../../app-data-source-dev';
import { Sale } from '../../../entities/sales';
import {
    IWebhookRepository,
    IWebhookFindDTO,
    IWebhookRepositoryCreate,
    IWebhookFindInvoiceDTO,
    ISale,
    IResponse,
} from './types/IWebhookRepository';

interface IFindClientbyEmailDTO {
    email: string;
}

class WebhookRepositories implements IWebhookRepository {
    private repository: Repository<Sale>;
    // private static INSTANCE: ClientRepositories;
    constructor() {
        this.repository = myDataSource.getRepository(Sale);
    }
    async findByAfiliateId({
        id,
        period,
    }: IWebhookFindDTO): Promise<IResponse> {
        const byDates = [];
        const months = [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
        ];
        const a = new Date();
        a.setDate(a.getDate() - period);
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < period + 1; i++) {
            a.setDate(a.getDate() + i);
            const day = a.getDate();
            const month = a.getMonth();
            const newDate = `${`${day}`.length > 1 ? day : `0${day}`} de ${
                months[month]
            }`;
            const obj = { date: newDate, value: 0 };
            byDates.push(obj);
        }
        const today = new Date();
        const aux = today.setDate(today.getDate() - period);
        const start = `${new Date(aux)
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')}`;
        const endDate = `${new Date()
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')}`;
        console.log(start, endDate);
        const sales = await this.repository.find({
            where: {
                userId: id,
                date: Between(start, endDate),
            },
        });
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < sales.length; i++) {
            const element = sales[i];
            const date = new Date(element.date);
            const day = date.getDate();
            const month = date.getMonth();
            const newDate = `${`${day}`.length > 1 ? day : `0${day}`} de ${
                months[month]
            }`;
            const exists = byDates.filter(item => item.date === newDate);
            if (exists.length > 0) {
                exists[0].value += element.affiliateValue;
            }
        }
        return { sales, byDates };
    }
    // public static getInstance(): UserRepositories {
    //     if (!UserRepositories.INSTANCE) {
    //         UserRepositories.INSTANCE = new UserRepositories();
    //     }
    //     return UserRepositories.INSTANCE;
    // }
    async findByInvoice({ invoice }: IWebhookFindInvoiceDTO): Promise<Sale> {
        const sale = await this.repository.findOne({
            where: {
                invoice,
            },
        });
        return sale;
    }
    async create({
        affiliateValue,
        userId,
        date,
        invoice,
        product,
        value,
        status,
    }: IWebhookRepositoryCreate): Promise<Sale> {
        const sale = this.repository.create({
            affiliateValue,
            userId,
            date,
            invoice,
            product,
            value,
            status,
        });
        const save = await this.repository.save(sale);
        return save;
    }
    async updateById({
        id,
        affiliateValue,
        userId,
        date,
        invoice,
        product,
        value,
        status,
    }: ISale): Promise<void> {
        await this.repository.save({
            id,
            affiliateValue,
            userId,
            date,
            invoice,
            product,
            value,
            status,
        });
    }
    async list(): Promise<Sale[]> {
        const clients = await this.repository.find();
        return clients;
    }
}

export { WebhookRepositories };
