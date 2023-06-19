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
exports.SendEmailController = void 0;
const tsyringe_1 = require("tsyringe");
const resetPasswordUseCase_1 = require("./resetPasswordUseCase");
class SendEmailController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = request.body;
            const resetPasswordUseCase = tsyringe_1.container.resolve(resetPasswordUseCase_1.ResetPasswordUseCase);
            const user = yield resetPasswordUseCase.execute({ email });
            return response
                .status(200)
                .send({ message: 'Email enviado com sucesso!!' });
        });
    }
}
exports.SendEmailController = SendEmailController;
