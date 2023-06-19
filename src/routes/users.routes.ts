import { Router } from 'express';

import { AuthUserController } from '../modules/user/useCases/authUser/authUserController';
import { CreateUserController } from '../modules/user/useCases/createUser/createUserController';
import { FindUserByEmailController } from '../modules/user/useCases/findByEmail/findUserByEmailController';
import { ResetPasswordController } from '../modules/user/useCases/resetPassword/resetPasswordControllet';
import { SendEmailController } from '../modules/user/useCases/sendConvite/resetPasswordControllet';
import { UpdateUserController } from '../modules/user/useCases/updateUser/updateUserController';

const userRoutes = Router();
const findUserByEmailController = new FindUserByEmailController();
const createUserController = new CreateUserController();
const udateUserController = new UpdateUserController();
const authUserController = new AuthUserController();
const resetPasswordController = new ResetPasswordController();
const sendEmailController = new SendEmailController();

userRoutes.post('/create', createUserController.handle);

userRoutes.put('/update', udateUserController.handle);

userRoutes.post('/auth', authUserController.handle);

userRoutes.get('/find/:id', findUserByEmailController.handle);

userRoutes.post('/request-reset', resetPasswordController.handle);

userRoutes.post('/send', sendEmailController.handle);

export { userRoutes };
