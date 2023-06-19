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
exports.EventOdds = void 0;
const typeorm_1 = require("typeorm");
const Event_1 = require("./Event");
let EventOdds = class EventOdds {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EventOdds.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventOdds.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Event_1.Event, event => event.odds),
    __metadata("design:type", Event_1.Event)
], EventOdds.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], EventOdds.prototype, "data", void 0);
EventOdds = __decorate([
    (0, typeorm_1.Entity)('event_odds')
], EventOdds);
exports.EventOdds = EventOdds;
