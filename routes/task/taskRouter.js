import express from 'express';

import * as taskController from '../../src/task/taskController.js';

const taskRoute = express.Router()

taskRoute.post('/add-task', taskController.addTask);
taskRoute.put('/edit-task/:taskId', taskController.editTask);
taskRoute.delete('/delete-task/:taskId', taskController.deleteTask);

taskRoute.get('/getAllTask', taskController.getAllTask);
taskRoute.get('/getAllTask/:userId', taskController.getTaskByUserId);

export default taskRoute;