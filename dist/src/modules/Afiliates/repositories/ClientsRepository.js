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
exports.AfiliatesRepositories = void 0;
const app_data_source_dev_1 = require("../../../../app-data-source-dev");
const afiliates_1 = require("../../../entities/afiliates");
class AfiliatesRepositories {
    // private static INSTANCE: AfiliateRepositories;
    constructor() {
        this.repository = app_data_source_dev_1.myDataSource.getRepository(afiliates_1.Afiliate);
    }
    findByPlatform({ email, platform }) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (platform === 'Eduzz') {
                user = yield this.repository.findOne({
                    where: { emailEduzz: email },
                });
            }
            if (platform === 'Braip') {
                const emailBraip = email;
                user = yield this.repository.findOne({
                    where: { emailBraip },
                });
            }
            if (platform === 'Kiwifi') {
                const emailKiwifi = email;
                user = yield this.repository.findOne({
                    where: { emailKiwifi },
                });
            }
            return user;
        });
    }
    // public static getInstance(): UserRepositories {
    //     if (!UserRepositories.INSTANCE) {
    //         UserRepositories.INSTANCE = new UserRepositories();
    //     }
    //     return UserRepositories.INSTANCE;
    // }
    create({ name, email, phone, document, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.repository.create({
                name,
                email,
                phone,
                document,
            });
            yield this.repository.save(client);
            return client;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield this.repository.find();
            return clients;
        });
    }
    findByEmail({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.repository.findOne({
                where: { email },
            });
            return client;
        });
    }
}
exports.AfiliatesRepositories = AfiliatesRepositories;
