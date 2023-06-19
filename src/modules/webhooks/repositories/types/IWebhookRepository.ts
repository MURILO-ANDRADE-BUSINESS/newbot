import { Sale } from '../../../../entities/sales';

export interface IWebhookRepositoryCreate {
    affiliateValue: number;
    userId: string;
    date: any;
    invoice: string;
    product: string;
    value: number;
    status: boolean;
}
export interface ISale {
    id: string;
    affiliateValue: number;
    userId: string;
    date: any;
    invoice: string;
    product: string;
    value: number;
    status: boolean;
}
export interface IWebhookFindDTO {
    id: string;
    period: number;
}
export interface IWebhookFindInvoiceDTO {
    invoice: string;
}
interface IFindWebhookbyAfiliateIdlDTO {
    id: string;
    period: number;
}
export interface IResponse {
    sales: Sale[];
    byDates: { date: string; value: number }[];
}
export interface IWebhookRepository {
    list(): Promise<Sale[]>;
    create({
        affiliateValue,
        userId,
        date,
        invoice,
        product,
        value,
        status,
    }: IWebhookRepositoryCreate): Promise<Sale>;
    findByAfiliateId({
        id,
        period,
    }: IFindWebhookbyAfiliateIdlDTO): Promise<IResponse>;
    findByInvoice({ invoice }: IWebhookFindInvoiceDTO): Promise<Sale>;
    updateById({
        id,
        affiliateValue,
        userId,
        date,
        invoice,
        product,
        value,
        status,
    }: ISale): Promise<void>;
}
