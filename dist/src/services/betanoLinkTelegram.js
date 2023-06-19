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
exports.betanoLinkOnTelegram = void 0;
const botConfig_1 = require("./botConfig");
function betanoLinkOnTelegram(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = `
Ganhe até 500 reais em bônus no primeiro depósito para cadastro novos através desse link 👇🏻

[Clica aqui para fazer seu cadastro](https://gml-grp.com/C.ashx?btag=a_14207b_2032c_&affid=4438&siteid=14207&adid=2032&c=) 
`;
        console.log('enviei');
        yield bot.sendPhoto(botConfig_1.botConfig.chat, 'https://videos.robogol.com.br/betano+card.png', { caption: message, parse_mode: 'MarkdownV2' });
        yield bot.sendPhoto(botConfig_1.botConfig.charPrime, 'https://videos.robogol.com.br/betano+card.png', { caption: message, parse_mode: 'MarkdownV2' });
    });
}
exports.betanoLinkOnTelegram = betanoLinkOnTelegram;
