"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ResetPasswordUseCase = void 0;
const axios_1 = __importDefault(require("axios"));
const tsyringe_1 = require("tsyringe");
let ResetPasswordUseCase = class ResetPasswordUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = 'https://api.brevo.com/v3/smtp/email';
                const email1 = {
                    sender: {
                        email: 'contato@murilohenrique.com',
                        name: 'Murilo Henrique',
                    },
                    subject: 'R$ 1.000 por dia fazendo isso...',
                    templateId: 1,
                    to: [
                        {
                            email,
                            name: email,
                        },
                    ],
                };
                const options = {
                    headers: {
                        'api-key': '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',
                    },
                };
                console.log('aqui');
                yield axios_1.default.post(url, email1, options);
                return true;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        });
    }
};
ResetPasswordUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UserRepositories')),
    __metadata("design:paramtypes", [Object])
], ResetPasswordUseCase);
exports.ResetPasswordUseCase = ResetPasswordUseCase;
