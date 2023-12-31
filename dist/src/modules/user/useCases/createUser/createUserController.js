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
exports.CreateUserController = void 0;
const tsyringe_1 = require("tsyringe");
const createUserUseCase_1 = require("./createUserUseCase");
class CreateUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role, active, virtual, fut, jogadorCaro, manualPrime, dueDate, mjcDate, } = request.body;
            const createUserUseCase = tsyringe_1.container.resolve(createUserUseCase_1.CreateUserUseCase);
            const res = yield createUserUseCase.execute({
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
            if (!res) {
                return response.status(500).send({ message: 'Usuário já existe' });
            }
            return response.json(res);
        });
    }
}
exports.CreateUserController = CreateUserController;
