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
exports.Sale = exports.Type = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const afiliates_1 = require("./afiliates");
var Type;
(function (Type) {
    Type[Type["sale"] = 0] = "sale";
    Type[Type["refund"] = 1] = "refund";
})(Type = exports.Type || (exports.Type = {}));
let Sale = class Sale {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Sale.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Sale.prototype, "affiliateValue", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Object)
], Sale.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "invoice", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Sale.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: Type.sale }),
    __metadata("design:type", Boolean)
], Sale.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => afiliates_1.Afiliate, Afiliate => Afiliate.id),
    __metadata("design:type", afiliates_1.Afiliate)
], Sale.prototype, "afiliate", void 0);
Sale = __decorate([
    (0, typeorm_1.Entity)('sales'),
    __metadata("design:paramtypes", [])
], Sale);
exports.Sale = Sale;
