import { Router } from 'express';

import { GetUpcomingEventsController } from '../modules/bet/useCases/getUpcommingEvents/getUpcomingEventsController';

const betsRoutes = Router();
const getUpcomingEventsController = new GetUpcomingEventsController();
// const listUserController = new ListUserController();

betsRoutes.get('/upcoming-events', getUpcomingEventsController.handle);

export { betsRoutes };
