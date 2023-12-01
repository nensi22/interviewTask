import express from 'express';
import userRoute from './user/userRoute.js';


const mainRoute = express.Router()

mainRoute.use(userRoute);

export default mainRoute