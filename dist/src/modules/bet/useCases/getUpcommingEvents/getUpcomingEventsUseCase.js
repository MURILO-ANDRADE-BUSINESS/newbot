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
exports.GetUpcomingEventsUseCase = void 0;
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const axios_1 = __importDefault(require("axios"));
const tsyringe_1 = require("tsyringe");
const UpcomingEvent_1 = require("../../../../entities/UpcomingEvent");
const UpcomingEventOdds_1 = require("../../../../entities/UpcomingEventOdds");
const betsService_1 = require("../../../../services/betsService");
let GetUpcomingEventsUseCase = class GetUpcomingEventsUseCase {
    constructor(upcomingEventsRepository, upcomingEventsOddsRepository) {
        this.upcomingEventsRepository = upcomingEventsRepository;
        this.upcomingEventsOddsRepository = upcomingEventsOddsRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line no-plusplus
                for (let i = 1; i <= 9; i++) {
                    const url = `https://api.b365api.com/v3/events/upcoming?sport_id=1&token=97036-xkyu7zXimmfs3P&page=${i}`;
                    const results = yield axios_1.default.get(url);
                    const data = results.data.results;
                    for (const event of results.data.results) {
                        const eventLeagueId = event.league.id;
                        const eventTime = event.time;
                        const isEventOnDB = false;
                        yield this.upcomingEventsRepository.getUpcomingEventFromDB(event.id);
                        if (!isEventOnDB) {
                            try {
                                if (event.bet365_id) {
                                    const dbEvent = new UpcomingEvent_1.UpcomingEvent();
                                    dbEvent.data = event;
                                    dbEvent.leagueId = eventLeagueId;
                                    dbEvent.time = parseInt(eventTime, 10);
                                    dbEvent.id = event.id;
                                    yield this.upcomingEventsRepository.create(dbEvent);
                                    const oddsData = (yield (0, betsService_1.getEventPreMatchOdd)(event.bet365_id)).results;
                                    const eventOdds = new UpcomingEventOdds_1.UpcomingEventOdds();
                                    eventOdds.data = oddsData;
                                    eventOdds.eventId = event.id;
                                    yield this.upcomingEventsOddsRepository.create(eventOdds);
                                }
                            }
                            catch (err) {
                                console.log(err);
                            }
                        }
                    }
                }
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
};
GetUpcomingEventsUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UpcomingEvents')),
    __param(1, (0, tsyringe_1.inject)('UpcomingEventsOdds')),
    __metadata("design:paramtypes", [Object, Object])
], GetUpcomingEventsUseCase);
exports.GetUpcomingEventsUseCase = GetUpcomingEventsUseCase;
