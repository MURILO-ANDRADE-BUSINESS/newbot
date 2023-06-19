import { Router } from 'express';

import { betsRoutes } from './bets.routes';
import { webhooksRoutes } from './sales.routes';
import { userRoutes } from './users.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/webhooks', webhooksRoutes);
routes.use('/bets', betsRoutes);

export { routes };
