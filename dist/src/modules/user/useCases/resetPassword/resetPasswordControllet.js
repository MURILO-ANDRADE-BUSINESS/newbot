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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordController = void 0;
const axios_1 = __importDefault(require("axios"));
const tsyringe_1 = require("tsyringe");
const resetPasswordUseCase_1 = require("./resetPasswordUseCase");
class ResetPasswordController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = request.body;
            const resetPasswordUseCase = tsyringe_1.container.resolve(resetPasswordUseCase_1.ResetPasswordUseCase);
            const user = yield resetPasswordUseCase.execute({ email });
            if (!user) {
                return response
                    .status(400)
                    .send({ message: 'Usuário não encontrado.' });
            }
            const url = 'https://api.brevo.com/v3/smtp/email';
            const email1 = {
                sender: {
                    email: 'contato@murilohenrique.com',
                    name: 'Murilo Henrique',
                },
                subject: 'Seu novo acesso chegou!',
                templateId: 2,
                to: [
                    {
                        email,
                    },
                ],
                params: {
                    TOKEN: user.id,
                },
            };
            const options = {
                headers: {
                    'api-key': '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',
                },
            };
            yield axios_1.default.post(url, email1, options);
            return response
                .status(200)
                .send({ message: 'Email enviado com sucesso!!' });
        });
    }
}
exports.ResetPasswordController = ResetPasswordController;
