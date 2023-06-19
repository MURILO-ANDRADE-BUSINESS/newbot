import { Router } from 'express';

// import { FindUserByEmailController } from '../modules/user/useCases/findByEmail/findUserByEmailController';
// import { ListUserController } from '../modules/user/useCases/listUsers/listUserController';
import { CreateEduzzController } from '../modules/webhooks/useCases/Eduzz/EduzzController';
import { FindSalesByUserController } from '../modules/webhooks/useCases/findSalesByUser/findSalesByUserController';

const webhooksRoutes = Router();
const findSalesByUserController = new FindSalesByUserController();
const createEduzzController = new CreateEduzzController();
// const listUserController = new ListUserController();

webhooksRoutes.post('/eduzz', createEduzzController.handle);
webhooksRoutes.get('/sales/:id', findSalesByUserController.handle);

export { webhooksRoutes };
