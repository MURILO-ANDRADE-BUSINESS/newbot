"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const authUserController_1 = require("../modules/user/useCases/authUser/authUserController");
const createUserController_1 = require("../modules/user/useCases/createUser/createUserController");
const findUserByEmailController_1 = require("../modules/user/useCases/findByEmail/findUserByEmailController");
const resetPasswordControllet_1 = require("../modules/user/useCases/resetPassword/resetPasswordControllet");
const resetPasswordControllet_2 = require("../modules/user/useCases/sendConvite/resetPasswordControllet");
const updateUserController_1 = require("../modules/user/useCases/updateUser/updateUserController");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
const findUserByEmailController = new findUserByEmailController_1.FindUserByEmailController();
const createUserController = new createUserController_1.CreateUserController();
const udateUserController = new updateUserController_1.UpdateUserController();
const authUserController = new authUserController_1.AuthUserController();
const resetPasswordController = new resetPasswordControllet_1.ResetPasswordController();
const sendEmailController = new resetPasswordControllet_2.SendEmailController();
userRoutes.post('/create', createUserController.handle);
userRoutes.put('/update', udateUserController.handle);
userRoutes.post('/auth', authUserController.handle);
userRoutes.get('/find/:id', findUserByEmailController.handle);
userRoutes.post('/request-reset', resetPasswordController.handle);
userRoutes.post('/send', sendEmailController.handle);
