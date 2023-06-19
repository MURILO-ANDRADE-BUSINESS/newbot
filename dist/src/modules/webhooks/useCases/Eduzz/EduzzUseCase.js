"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.CreateSaleService = void 0;
/* eslint-disable no-plusplus */
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../erros/AppError");
let CreateSaleService = class CreateSaleService {
    constructor(SalesRepository, UserRepository, ClientRepository) {
        this.SalesRepository = SalesRepository;
        this.UserRepository = UserRepository;
        this.ClientRepository = ClientRepository;
    }
    execute({ trans_status, trans_createdate, trans_createtime, cus_name, cus_email, cus_cel, product_cod, trans_currency, 
    // eduzz_value,
    // pro_value,
    // cop_value,
    trans_value, trans_cod, 
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
    product_name, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.ClientRepository.findByPlatform({
                email: aff_email,
                platform: 'Eduzz',
            });
            const fut = !!(product_cod === 1772281 || product_cod === '1772281');
            const manualPrime = !!(product_cod === 1784056 || product_cod === '1784056');
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
                const sale = yield this.SalesRepository.findByInvoice({
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
                    const client = yield this.ClientRepository.findByEmail({
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
                        yield this.UserRepository.create(Object.assign({}, newClient));
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
                        };
                        yield this.SalesRepository.create(Object.assign({}, affBalance));
                    }
                    else {
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
                        };
                        yield this.SalesRepository.create(Object.assign({}, affBalance));
                    }
                }
                return true;
                // const copro = pro_value / 98
            }
            console.log('status', trans_status);
            const sale = yield this.SalesRepository.findByInvoice({
                invoice: `${trans_cod}`,
            });
            console.log('SALEEEEEEEEEEEEEEEEE\n\n', sale);
            if (sale) {
                const refund = Object.assign(Object.assign({}, sale), { status: false });
                yield this.SalesRepository.updateById(refund);
            }
            else {
                throw new AppError_1.AppError('Não foi possível localizar a venda.', 401);
            }
            return true;
            // }
            // this.SalesRepository.create({});
        });
    }
};
CreateSaleService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('WebhookRepositories')),
    __param(1, (0, tsyringe_1.inject)('UserRepositories')),
    __param(2, (0, tsyringe_1.inject)('ClientRepositories')),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateSaleService);
exports.CreateSaleService = CreateSaleService;
