"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.betsRoutes = void 0;
const express_1 = require("express");
const getUpcomingEventsController_1 = require("../modules/bet/useCases/getUpcommingEvents/getUpcomingEventsController");
const betsRoutes = (0, express_1.Router)();
exports.betsRoutes = betsRoutes;
const getUpcomingEventsController = new getUpcomingEventsController_1.GetUpcomingEventsController();
// const listUserController = new ListUserController();
betsRoutes.get('/upcoming-events', getUpcomingEventsController.handle);
