import express from 'express';

import * as userController from '../../src/user/auth.js'
import taskRoute from '../task/taskRouter.js';

const userRoute = express.Router()

userRoute.post('/register',userController.registerUser);
userRoute.post('/login',userController.loginUser);
userRoute.put('/update-user/:userId',userController.updateUser);

userRoute.use(taskRoute)

export default userRoute;