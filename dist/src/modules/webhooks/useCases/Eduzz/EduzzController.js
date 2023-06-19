"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEduzzController = void 0;
const tsyringe_1 = require("tsyringe");
const EduzzUseCase_1 = require("./EduzzUseCase");
class CreateEduzzController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { trans_status, trans_createdate, trans_createtime, cus_name, cus_email, cus_cel, cus_address, cus_address_number, cus_address_country, cus_address_district, cus_address_city, cus_address_state, cus_address_zip_code, trans_currency, eduzz_value, pro_value, cop_value, trans_value, trans_cod, trans_items, aff_cod, aff_name, aff_email, aff_document_number, aff_value, utm_source, utm_content, utm_medium, utm_campaign, product_name, product_cod, } = request.body;
            const createUserUseCase = tsyringe_1.container.resolve(EduzzUseCase_1.CreateSaleService);
            const res = yield createUserUseCase.execute({
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
        });
    }
}
exports.CreateEduzzController = CreateEduzzController;
