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
exports.UpcomingEventOdds = void 0;
const typeorm_1 = require("typeorm");
const UpcomingEvent_1 = require("./UpcomingEvent");
let UpcomingEventOdds = class UpcomingEventOdds {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UpcomingEventOdds.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UpcomingEventOdds.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UpcomingEvent_1.UpcomingEvent, event => event.odds),
    __metadata("design:type", UpcomingEvent_1.UpcomingEvent)
], UpcomingEventOdds.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], UpcomingEventOdds.prototype, "data", void 0);
UpcomingEventOdds = __decorate([
    (0, typeorm_1.Entity)('upcoming_events_odds')
], UpcomingEventOdds);
exports.UpcomingEventOdds = UpcomingEventOdds;
