import { inject, injectable } from 'tsyringe';

import { Sale } from '../../../../entities/sales';
import { IWebhookRepository } from '../../repositories/types/IWebhookRepository';

interface IRequest {
    id: string;
    period: number;
}
interface IResponse {
    sales: Sale[];
    byDates: { date: string; value: number }[];
}
@injectable()
export class FindSalesByUserUseCase {
    constructor(
        @inject('WebhookRepositories')
        private webhookRepository: IWebhookRepository,
    ) {}
    async execute({ id, period }: IRequest): Promise<IResponse> {
        const exists = await this.webhookRepository.findByAfiliateId({
            id,
            period,
        });
        return exists;
    }
}
