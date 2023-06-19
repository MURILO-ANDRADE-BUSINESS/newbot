import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSaleService } from './EduzzUseCase';

export class CreateEduzzController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            trans_status,
            trans_createdate,
            trans_createtime,
            cus_name,
            cus_email,
            cus_cel,
            cus_address,
            cus_address_number,
            cus_address_country,
            cus_address_district,
            cus_address_city,
            cus_address_state,
            cus_address_zip_code,
            trans_currency,
            eduzz_value,
            pro_value,
            cop_value,
            trans_value,
            trans_cod,
            trans_items,
            aff_cod,
            aff_name,
            aff_email,
            aff_document_number,
            aff_value,
            utm_source,
            utm_content,
            utm_medium,
            utm_campaign,
            product_name,
            product_cod,
        } = request.body;
        const createUserUseCase = container.resolve(CreateSaleService);
        const res = await createUserUseCase.execute({
            trans_status,
            trans_createdate,
            trans_createtime,
            cus_name,
            cus_email,
            cus_cel,
            cus_address,
            cus_address_number,
            cus_address_country,
            cus_address_district,
            cus_address_city,
            cus_address_state,
            cus_address_zip_code,
            trans_currency,
            eduzz_value,
            pro_value,
            cop_value,
            trans_value,
            trans_cod,
            trans_items,
            aff_cod,
            aff_name,
            aff_email,
            aff_document_number,
            aff_value,
            utm_source,
            utm_content,
            utm_medium,
            utm_campaign,
            product_name,
            product_cod,
        });
        if (res) {
            return response.status(200).send({ message: 'OK!' });
        }
        return response
            .status(401)
            .send({ message: 'Afiliado ou compra não foram encontrados.' });
    }
}
