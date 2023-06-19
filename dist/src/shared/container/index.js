"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const ClientsRepository_1 = require("../../modules/Afiliates/repositories/ClientsRepository");
const DailyReportsPrimeRepositories_1 = require("../../modules/bet/repositories/DailyReportsPrimeRepositories");
const DailyReportsRepositories_1 = require("../../modules/bet/repositories/DailyReportsRepositories");
const EventsRepositories_1 = require("../../modules/bet/repositories/EventsRepositories");
const MessagesRepositories_1 = require("../../modules/bet/repositories/MessagesRepositories");
const UpcomingEventsOddsRepositories_1 = require("../../modules/bet/repositories/UpcomingEventsOddsRepositories");
const UpcomingEventsRepositories_1 = require("../../modules/bet/repositories/UpcomingEventsRepositories");
const UpcommingEventsBetanoRepositories_1 = require("../../modules/bet/repositories/UpcommingEventsBetanoRepositories");
const UserRepositories_1 = require("../../modules/user/repositories/UserRepositories");
const WebhookRepository_1 = require("../../modules/webhooks/repositories/WebhookRepository");
tsyringe_1.container.registerSingleton('UserRepositories', (0, tsyringe_1.delay)(() => UserRepositories_1.UserRepositories));
tsyringe_1.container.registerSingleton('AfiliateRepositories', (0, tsyringe_1.delay)(() => ClientsRepository_1.AfiliatesRepositories));
tsyringe_1.container.registerSingleton('WebhookRepositories', (0, tsyringe_1.delay)(() => WebhookRepository_1.WebhookRepositories));
tsyringe_1.container.registerSingleton('Events', EventsRepositories_1.EventsRepository);
tsyringe_1.container.registerSingleton('UpcomingEvents', (0, tsyringe_1.delay)(() => UpcomingEventsRepositories_1.UpcomingEventsRepository));
tsyringe_1.container.registerSingleton('BetanoEvents', (0, tsyringe_1.delay)(() => UpcommingEventsBetanoRepositories_1.UpcomingEventsBetanoRepository));
tsyringe_1.container.registerSingleton('UpcomingEventsOdds', (0, tsyringe_1.delay)(() => UpcomingEventsOddsRepositories_1.UpcomingEventsOddsRepository));
tsyringe_1.container.registerSingleton('Messages', (0, tsyringe_1.delay)(() => MessagesRepositories_1.MessagesRepository));
tsyringe_1.container.registerSingleton('DailyReports', (0, tsyringe_1.delay)(() => DailyReportsRepositories_1.DailyReportsRepository));
tsyringe_1.container.registerSingleton('PrimeReports', (0, tsyringe_1.delay)(() => DailyReportsPrimeRepositories_1.DailyReportsPrimeRepository));