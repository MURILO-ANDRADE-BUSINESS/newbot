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
exports.UpcomingEvent = void 0;
const typeorm_1 = require("typeorm");
const EventLineup_1 = require("./EventLineup");
const UpcomingEventOdds_1 = require("./UpcomingEventOdds");
let UpcomingEvent = class UpcomingEvent {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], UpcomingEvent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], UpcomingEvent.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UpcomingEvent.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UpcomingEvent.prototype, "leagueId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => EventLineup_1.EventLineup, lineup => lineup.upcomingEvent),
    __metadata("design:type", EventLineup_1.EventLineup)
], UpcomingEvent.prototype, "lineup", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UpcomingEventOdds_1.UpcomingEventOdds, odds => odds.event),
    __metadata("design:type", UpcomingEventOdds_1.UpcomingEventOdds)
], UpcomingEvent.prototype, "odds", void 0);
UpcomingEvent = __decorate([
    (0, typeorm_1.Entity)('upcoming_events')
], UpcomingEvent);
exports.UpcomingEvent = UpcomingEvent;
