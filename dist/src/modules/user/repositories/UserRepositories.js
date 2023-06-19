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
exports.UserRepositories = void 0;
const app_data_source_dev_1 = require("../../../../app-data-source-dev");
const user_1 = require("../../../entities/user");
class UserRepositories {
    // private static INSTANCE: UserRepositories;
    constructor() {
        this.repository = app_data_source_dev_1.myDataSource.getRepository(user_1.User);
    }
    // public static getInstance(): UserRepositories {
    //     if (!UserRepositories.INSTANCE) {
    //         UserRepositories.INSTANCE = new UserRepositories();
    //     }
    //     return UserRepositories.INSTANCE;
    // }
    create({ name, email, password, role, active, virtual, fut, jogadorCaro, manualPrime, dueDate, mjcDate, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.repository.create({
                name,
                email,
                password,
                role,
                active,
                virtual,
                fut,
                jogadorCaro,
                manualPrime,
                dueDate,
                mjcDate,
            });
            yield this.repository.save(user);
            return user;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.repository.find({ relations: ['sale'] });
            return users;
        });
    }
    findByEmail({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOne({
                where: { email },
            });
            return user;
        });
    }
    updateUserById(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.repository.findOne({
                where: { id: user.id },
            });
            if (exists) {
                exists.name = user.name ? user.name : exists.name;
                exists.email = user.email ? user.email : user.email;
                exists.active =
                    user.active !== undefined ? user.active : exists.active;
                exists.role = user.role
                    ? user.role
                    : exists.role;
                exists.fut = user.fut !== undefined ? user.fut : exists.fut;
                exists.manualPrime =
                    user.manualPrime !== undefined
                        ? user.manualPrime
                        : exists.manualPrime;
                exists.jogadorCaro =
                    user.jogadorCaro !== undefined
                        ? user.jogadorCaro
                        : exists.jogadorCaro;
                exists.mjcDate =
                    user.mjcDate !== undefined ? user.mjcDate : exists.mjcDate;
                exists.dueDate = user.dueDate ? user.dueDate : exists.dueDate;
                const updated = yield this.repository.save(exists);
                return updated;
            }
            return null;
        });
    }
}
exports.UserRepositories = UserRepositories;
