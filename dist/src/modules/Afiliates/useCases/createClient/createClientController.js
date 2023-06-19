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
exports.CreateClientController = void 0;
const tsyringe_1 = require("tsyringe");
const createClientUseCase_1 = require("./createClientUseCase");
class CreateClientController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone, document } = request.body;
            const createUserUseCase = tsyringe_1.container.resolve(createClientUseCase_1.CreateClientUseCase);
            const res = yield createUserUseCase.execute({
                name,
                email,
                phone,
                document,
            });
            if (!res) {
                return response.status(500).send({ message: 'Usuário já existe' });
            }
            return response.json(res);
        });
    }
}
exports.CreateClientController = CreateClientController;
