/* eslint-disable no-plusplus */
import { inject, injectable } from 'tsyringe';

import { Sale } from '../../../../entities/sales';
import { AppError } from '../../../../erros/AppError';
import { IClientRepository } from '../../../Afiliates/repositories/types/IClientsRepository';
import { IUserRepository } from '../../../user/repositories/types/IUserRepository';
import {
    ISale,
    IWebhookRepository,
    IWebhookRepositoryCreate,
} from '../../repositories/types/IWebhookRepository';

interface IRequest {
    trans_status: number;
    trans_createdate: string;
    trans_createtime: string;
    cus_name: string;
    cus_email: string;
    cus_cel: string;
    cus_address?: string;
    cus_address_number?: string;
    cus_address_country?: string;
    cus_address_district?: string;
    cus_address_city?: string;
    cus_address_state?: string;
    cus_address_zip_code?: string;
    trans_currency: string;
    eduzz_value: number;
    pro_value: number;
    cop_value: number;
    trans_value: number;
    trans_cod: string;
    trans_items: any[];
    aff_cod: string;
    aff_name: string;
    aff_email: string;
    aff_document_number: string;
    aff_value: number;
    utm_source?: string;
    utm_content?: string;
    utm_medium?: string;
    utm_campaign?: string;
    product_name: string;
    product_cod: any;
}
@injectable()
class CreateSaleService {
    constructor(
        @inject('WebhookRepositories')
        private SalesRepository: IWebhookRepository,
        @inject('UserRepositories') private UserRepository: IUserRepository,
        @inject('ClientRepositories')
        private ClientRepository: IClientRepository,
    ) {}
    async execute({
        trans_status,
        trans_createdate,
        trans_createtime,
        cus_name,
        cus_email,
        cus_cel,
        product_cod,
        trans_currency,
        // eduzz_value,
        // pro_value,
        // cop_value,
        trans_value,
        trans_cod,
        // trans_items,
        // aff_cod,
        // aff_name,
        aff_email,
        // aff_document_number,
        aff_value,
        // utm_source,
        // utm_content,
        // utm_medium,
        // utm_campaign,
        product_name,
    }: IRequest): Promise<boolean> {
        const exists = await this.ClientRepository.findByPlatform({
            email: aff_email,
            platform: 'Eduzz',
        });
        const fut = !!(product_cod === 1772281 || product_cod === '1772281');
        const manualPrime = !!(
            product_cod === 1784056 || product_cod === '1784056'
        );
        const mjc = !!(product_cod === 1798627 || product_cod === '1798627');
        let prod = '';
        if (product_cod === 1772281 || product_cod === '1772281') {
            prod = 'robogol';
        }
        if (product_cod === 1784056 || product_cod === '1784056') {
            prod = 'mjp';
        }
        if (product_cod === 1798627 || product_cod === '1798627') {
            prod = 'mjc';
        }
        const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        const passwordLength = 4;
        let password = '';
        for (let i = 0; i <= passwordLength; i++) {
            const randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        if (trans_status === 3) {
            const sale = await this.SalesRepository.findByInvoice({
                invoice: `${trans_cod}`,
            });
            if (!sale) {
                const day = trans_createdate.slice(6);
                const month = trans_createdate.slice(4, 6);
                const year = trans_createdate.slice(0, 4);
                const createdAt = `${year}-${month}-${day} ${trans_createtime}`;
                const date = new Date(createdAt)
                    .toISOString()
                    .slice(0, 19)
                    .replace('T', ' ');
                const client = await this.ClientRepository.findByEmail({
                    email: cus_email,
                });
                if (!client) {
                    const newClient = {
                        name: cus_name,
                        email: cus_email.toLowerCase(),
                        phone: cus_cel,
                        password,
                        active: true,
                        fut,
                        jogadorCaro: mjc,
                        manualPrime,
                        dueDate: fut ? new Date() : null,
                        mjcDate: mjc ? new Date() : null,
                    };
                    await this.UserRepository.create({ ...newClient });
                }
                if (exists) {
                    const affBalance = {
                        status: true,
                        date,
                        userId: exists.id,
                        currency: trans_currency,
                        affiliateValue: aff_value,
                        value: trans_value,
                        platform: 'Eduzz',
                        product: product_name,
                        invoice: trans_cod,
                    } as IWebhookRepositoryCreate;
                    await this.SalesRepository.create({
                        ...affBalance,
                    });
                } else {
                    const affBalance = {
                        status: true,
                        date,
                        userId: 'mp2',
                        currency: trans_currency,
                        affiliateValue: aff_value,
                        value: trans_value,
                        platform: 'Eduzz',
                        product: product_name,
                        invoice: trans_cod,
                    } as IWebhookRepositoryCreate;
                    await this.SalesRepository.create({
                        ...affBalance,
                    });
                }
            }
            return true;
            // const copro = pro_value / 98
        }
        console.log('status', trans_status);
        const sale = await this.SalesRepository.findByInvoice({
            invoice: `${trans_cod}`,
        });
        console.log('SALEEEEEEEEEEEEEEEEE\n\n', sale);
        if (sale) {
            const refund = { ...sale, status: false } as ISale;
            await this.SalesRepository.updateById(refund);
        } else {
            throw new AppError('Não foi possível localizar a venda.', 401);
        }

        return true;

        // }
        // this.SalesRepository.create({});
    }
}

export { CreateSaleService };
