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
exports.FindUserByPlatformController = void 0;
const tsyringe_1 = require("tsyringe");
const findUserByPlatformUseCase_1 = require("./findUserByPlatformUseCase");
class FindUserByPlatformController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = `${request.params.id}`;
            const platform = `${request.params.platform}`;
            const findUserByEmailUseCase = tsyringe_1.container.resolve(findUserByPlatformUseCase_1.FindUserByPlatformUseCase);
            const user = yield findUserByEmailUseCase.execute({ email, platform });
            if (!user) {
                return response.status(400).send({ message: 'Usuário não existe' });
            }
            return response.json(user);
        });
    }
}
exports.FindUserByPlatformController = FindUserByPlatformController;
