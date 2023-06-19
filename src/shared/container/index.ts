import { container, delay } from 'tsyringe';

import { AfiliatesRepositories } from '../../modules/Afiliates/repositories/ClientsRepository';
import { IClientRepository } from '../../modules/Afiliates/repositories/types/IClientsRepository';
import { DailyReportsPrimeRepository } from '../../modules/bet/repositories/DailyReportsPrimeRepositories';
import { DailyReportsRepository } from '../../modules/bet/repositories/DailyReportsRepositories';
import { EventsRepository } from '../../modules/bet/repositories/EventsRepositories';
import { MessagesRepository } from '../../modules/bet/repositories/MessagesRepositories';
import {
    IDailyReportsPrimeRepository,
    IDailyReportsRepository,
    IEventsRepository,
    IMessagesRepository,
    IUpcommingEventsBetanoRepository,
    IUpcommingEventsOddsRepository,
    IUpcommingEventsRepository,
} from '../../modules/bet/repositories/types/IBetsRepository';
import { UpcomingEventsOddsRepository } from '../../modules/bet/repositories/UpcomingEventsOddsRepositories';
import { UpcomingEventsRepository } from '../../modules/bet/repositories/UpcomingEventsRepositories';
import { UpcomingEventsBetanoRepository } from '../../modules/bet/repositories/UpcommingEventsBetanoRepositories';
import { IUserRepository } from '../../modules/user/repositories/types/IUserRepository';
import { UserRepositories } from '../../modules/user/repositories/UserRepositories';
import { IWebhookRepository } from '../../modules/webhooks/repositories/types/IWebhookRepository';
import { WebhookRepositories } from '../../modules/webhooks/repositories/WebhookRepository';

container.registerSingleton<IUserRepository>(
    'UserRepositories',
    delay(() => UserRepositories),
);
container.registerSingleton<IClientRepository>(
    'AfiliateRepositories',
    delay(() => AfiliatesRepositories),
);
container.registerSingleton<IWebhookRepository>(
    'WebhookRepositories',
    delay(() => WebhookRepositories),
);

container.registerSingleton<IEventsRepository>('Events', EventsRepository);
container.registerSingleton<IUpcommingEventsRepository>(
    'UpcomingEvents',
    delay(() => UpcomingEventsRepository),
);
container.registerSingleton<IUpcommingEventsBetanoRepository>(
    'BetanoEvents',
    delay(() => UpcomingEventsBetanoRepository),
);
container.registerSingleton<IUpcommingEventsOddsRepository>(
    'UpcomingEventsOdds',
    delay(() => UpcomingEventsOddsRepository),
);
container.registerSingleton<IMessagesRepository>(
    'Messages',
    delay(() => MessagesRepository),
);
container.registerSingleton<IDailyReportsRepository>(
    'DailyReports',
    delay(() => DailyReportsRepository),
);
container.registerSingleton<IDailyReportsPrimeRepository>(
    'PrimeReports',
    delay(() => DailyReportsPrimeRepository),
);
