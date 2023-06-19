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
exports.GetUpcomingEventsBetanoUseCase = void 0;
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const axios_1 = __importDefault(require("axios"));
const tsyringe_1 = require("tsyringe");
// import { IUserRepository } from '../../repositories/types/IUserRepository';
// import { IUser } from '../../repositories/UserRepositories';
let GetUpcomingEventsBetanoUseCase = class GetUpcomingEventsBetanoUseCase {
    constructor(upcomingEventsBetanoRepository) {
        this.upcomingEventsBetanoRepository = upcomingEventsBetanoRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = 'https://br.betano.com/api/sport/futebol/jogos-de-hoje/?req=la,s,tn,stnf,c,mb';
                const resultados = yield axios_1.default.get(url);
                const array = resultados.data.data.blocks[0].events;
                let flag = true;
                const date = new Date();
                const day = date.getDate();
                const plusDate = new Date().setDate(day + 1);
                const aux = new Date(plusDate);
                const plusDay = aux.getDate();
                let count = 0;
                while (flag === true) {
                    try {
                        const { length } = array;
                        const games = yield axios_1.default.get(`https://br.betano.com/api/sport/futebol/jogos-de-hoje/?latestId=${array[length - 1].id}&req=la,s,tn,stnf,c,mb`);
                        if (games.data.data.blocks[0] &&
                            games.data.data.blocks[0].events[0]) {
                            const gameDate = new Date(games.data.data.blocks[0].events[0].startTime);
                            const gameDay = gameDate.getDate();
                            if (gameDay === day || gameDay === plusDay) {
                                for (let j = 0; j < games.data.data.blocks[0].events.length; j++) {
                                    array.push(games.data.data.blocks[0].events[j]);
                                }
                            }
                            else if (count > 10) {
                                flag = false;
                            }
                            else {
                                for (let j = 0; j < games.data.data.blocks[0].events.length; j++) {
                                    array.push(games.data.data.blocks[0].events[j]);
                                }
                                count += 1;
                            }
                        }
                        else {
                            flag = false;
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                for (let i = 0; i < array.length; i++) {
                    try {
                        const element = array[i];
                        const sportRadarGame = yield axios_1.default.get(`https://stats.fn.sportradar.com/betano/br/America:Montevideo/gismo/match_get/${element.betRadarId}`);
                        const currentGame = sportRadarGame.data.doc[0].data.teams;
                        const gameUrl = element.url.replace('/odds', 'https://br.betano.com/live');
                        const game = {
                            id: element.id,
                            name: element.name,
                            home: currentGame && currentGame.home
                                ? currentGame.home
                                : null,
                            away: currentGame && currentGame.away
                                ? currentGame.away
                                : null,
                            time: element.startTime,
                            url: gameUrl,
                        };
                        yield this.upcomingEventsBetanoRepository.create(game);
                    }
                    catch (e) {
                        console.log(e);
                        console.log(`erro na aquisicao de links da sportRadar`);
                    }
                }
                console.log('jogos atualizados 🚀');
                return true;
            }
            catch (e) {
                console.log(`erro na aquisicao de links da betano`);
                console.log(e);
                return false;
            }
        });
    }
};
GetUpcomingEventsBetanoUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('BetanoEvents')),
    __metadata("design:paramtypes", [Object])
], GetUpcomingEventsBetanoUseCase);
exports.GetUpcomingEventsBetanoUseCase = GetUpcomingEventsBetanoUseCase;
