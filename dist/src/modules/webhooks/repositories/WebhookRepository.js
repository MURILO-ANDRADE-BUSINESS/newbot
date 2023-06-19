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
exports.WebhookRepositories = void 0;
const typeorm_1 = require("typeorm");
const app_data_source_dev_1 = require("../../../../app-data-source-dev");
const sales_1 = require("../../../entities/sales");
class WebhookRepositories {
    // private static INSTANCE: ClientRepositories;
    constructor() {
        this.repository = app_data_source_dev_1.myDataSource.getRepository(sales_1.Sale);
    }
    findByAfiliateId({ id, period, }) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const newDate = `${`${day}`.length > 1 ? day : `0${day}`} de ${months[month]}`;
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
            const sales = yield this.repository.find({
                where: {
                    userId: id,
                    date: (0, typeorm_1.Between)(start, endDate),
                },
            });
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < sales.length; i++) {
                const element = sales[i];
                const date = new Date(element.date);
                const day = date.getDate();
                const month = date.getMonth();
                const newDate = `${`${day}`.length > 1 ? day : `0${day}`} de ${months[month]}`;
                const exists = byDates.filter(item => item.date === newDate);
                if (exists.length > 0) {
                    exists[0].value += element.affiliateValue;
                }
            }
            return { sales, byDates };
        });
    }
    // public static getInstance(): UserRepositories {
    //     if (!UserRepositories.INSTANCE) {
    //         UserRepositories.INSTANCE = new UserRepositories();
    //     }
    //     return UserRepositories.INSTANCE;
    // }
    findByInvoice({ invoice }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield this.repository.findOne({
                where: {
                    invoice,
                },
            });
            return sale;
        });
    }
    create({ affiliateValue, userId, date, invoice, product, value, status, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = this.repository.create({
                affiliateValue,
                userId,
                date,
                invoice,
                product,
                value,
                status,
            });
            const save = yield this.repository.save(sale);
            return save;
        });
    }
    updateById({ id, affiliateValue, userId, date, invoice, product, value, status, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.save({
                id,
                affiliateValue,
                userId,
                date,
                invoice,
                product,
                value,
                status,
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield this.repository.find();
            return clients;
        });
    }
}
exports.WebhookRepositories = WebhookRepositories;
