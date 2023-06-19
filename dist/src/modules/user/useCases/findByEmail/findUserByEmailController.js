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
exports.FindUserByEmailController = void 0;
const tsyringe_1 = require("tsyringe");
const findUserByEmailUseCase_1 = require("./findUserByEmailUseCase");
class FindUserByEmailController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = `${request.params.id}`;
            const findUserByEmailUseCase = tsyringe_1.container.resolve(findUserByEmailUseCase_1.FindUserByEmailUseCase);
            const user = yield findUserByEmailUseCase.execute({ email });
            if (!user) {
                return response.status(400).send({ message: 'Usuário não existe' });
            }
            return response.json(user);
        });
    }
}
exports.FindUserByEmailController = FindUserByEmailController;
