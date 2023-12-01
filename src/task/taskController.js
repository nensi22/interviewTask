import Task from "../../models/tasks.js";
import User from "../../models/users.js";

export const getAllTask = async (req, res) => {
  try {
    const taskData = await Task.findAll({});
    res.status(200).json({ success: true, taskData: taskData });
  } catch (error) {
    console.log("error getAllTask : ", error);
  }
};

export const getTaskByUserId = async (req, res) => {
  try {
    const {userId} = req.params;

    const user = await User.findByPk(userId);
    if( !user ) {
        res.status(401).json({message : "user not found"})
    }

    const taskData = await Task.findAll({where: {user_id: userId}});

    res.status(200).json({ success: true, taskData: taskData });

  } catch (error) {
    console.log("error getTaskByUserId : ", error);
  }
};

export const addTask = async (req,res) => {
    try{
        const {user_id , taskName} = req.body;

        const user = await User.findByPk(user_id);
        if( !user) {
            res.status(401).json({message : "user not found"})
        }

        const newTask = await Task.create({
            user_id: user_id,
            taskName: taskName
        })

        res.status(201).json({ success: true, message: 'Task added successfully', task: newTask });
    } 
    catch(error) {
        console.log('error addTask : ', error)
    }
}

export const editTask = async (req,res) => {
    try{
        const {taskId} = req.params;
        const {user_id , taskName} = req.body;

        const task = await Task.findByPk(taskId);
        if( !task) {
            res.status(401).json({message : "task not found"})
        }

        if(user_id){
            const user = await User.findByPk(user_id);
            if( !user ) {
                res.status(401).json({message : "user not found"})
            }
        }

        task.user_id = user_id || task.user_id;
        task.taskName = taskName || task.taskName;

        await task.save();
        res.status(200).json({ success: true, message: 'task edited successfully', task: task });
    } 
    catch(error) {
        console.log('error editTask : ', error)
    }
}

export const deleteTask = async (req,res) => {
    try{
        const {taskId} = req.params;

        const task = await Task.findByPk(taskId);
        if( !task) {
            res.status(401).json({message : "task not found"})
        }

        await task.destroy();
        res.status(200).json({ success: true, message: 'task deleted successfully', task: task });
    }
    catch(error) {
        console.log('error deleteTask : ', error)
    }
}