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
exports.eventSeeder = void 0;
/* eslint-disable radix */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const betsService_1 = require("./betsService");
function eventSeeder() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`estamos esxecutando aqui!`);
            yield (0, betsService_1.getUpcomingEvents)();
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.eventSeeder = eventSeeder;
