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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const EventLineup_1 = require("./EventLineup");
const EventOdds_1 = require("./EventOdds");
const EventWeatherData_1 = require("./EventWeatherData");
let Event = class Event {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => EventLineup_1.EventLineup, lineup => lineup.event),
    __metadata("design:type", EventLineup_1.EventLineup)
], Event.prototype, "lineup", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => EventWeatherData_1.EventWeatherData, weather => weather.event),
    __metadata("design:type", EventWeatherData_1.EventWeatherData)
], Event.prototype, "weather", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => EventOdds_1.EventOdds, odds => odds.event),
    __metadata("design:type", EventOdds_1.EventOdds)
], Event.prototype, "odds", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "leagueId", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Array)
], Event.prototype, "homePreviousEvents", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Array)
], Event.prototype, "awayPreviousEvents", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], Event.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Event.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Event.prototype, "messageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Event.prototype, "messagePrimeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Event.prototype, "isFinished", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Event.prototype, "goalsOnFirstHalf", void 0);
Event = __decorate([
    (0, typeorm_1.Entity)('events')
], Event);
exports.Event = Event;
