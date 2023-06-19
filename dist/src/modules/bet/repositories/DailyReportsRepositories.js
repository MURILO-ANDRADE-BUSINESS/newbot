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
exports.DailyReportsRepository = void 0;
const typeorm_1 = require("typeorm");
const app_data_source_dev_1 = require("../../../../app-data-source-dev");
const DailyReport_1 = require("../../../entities/DailyReport");
class DailyReportsRepository {
    // private static INSTANCE: UserRepositories;
    constructor() {
        this.repository = app_data_source_dev_1.myDataSource.getRepository(DailyReport_1.DailyReport);
    }
    betweenDatesFilter(upperLimit, lowerLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.repository.find({
                where: {
                    date: (0, typeorm_1.Between)(lowerLimit, upperLimit),
                },
            });
            return event;
        });
    }
    getFromDB(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.repository.findOne({
                where: {
                    id,
                },
            });
            return event;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.repository.save(data);
            return event;
        });
    }
}
exports.DailyReportsRepository = DailyReportsRepository;
