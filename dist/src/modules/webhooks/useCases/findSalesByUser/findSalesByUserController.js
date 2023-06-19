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
exports.FindSalesByUserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tsyringe_1 = require("tsyringe");
const findSalesByUserUseCase_1 = require("./findSalesByUserUseCase");
class FindSalesByUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line radix
            const period = parseInt(`${request.params.id}`);
            const findSalesByUserUseCase = tsyringe_1.container.resolve(findSalesByUserUseCase_1.FindSalesByUserUseCase);
            const token = request.headers.auth;
            if (!token) {
                console.log(request.headers);
                return response
                    .status(401)
                    .send({ auth: false, message: 'No token provided.' });
            }
            const decoded = jsonwebtoken_1.default.decode(token);
            const { id } = decoded;
            const user = yield findSalesByUserUseCase.execute({ id, period });
            if (!user) {
                return response.status(400).send({ message: 'Usuário não existe' });
            }
            return response.json(user);
        });
    }
}
exports.FindSalesByUserController = FindSalesByUserController;
