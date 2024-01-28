import taskModel from './../models/taskModel.js';

export const addTask = async (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: "Enter All Field" });
    }
    try {
        const task = await taskModel.create({
            title: title,
            description: description
        });
        return res.status(201).json({message: "Task Created Sucessfully", task: task});
    } catch (error) {
        next(error);
    }
}

export const updateTask = async(req,res,next) => {
    const { id } = req.params;
    const updatedData = req.body;
    if(Object.keys(updatedData).length === 0){
        return res.status(400).json({message: "Nothing to Update"});
    }

    try {
        const taskUpdate = await taskModel.findByIdAndUpdate(id, updatedData, {new: true});
        return res.status(201).json({task: taskUpdate});
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async(req,res,next) => {
    const { id } = req.params;

    try {
        const taskDelete = await taskModel.findByIdAndDelete(id);
        if (!taskDelete) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        return res.status(201).json({message: "Deleted Sucessfully", task: taskDelete});
    } catch (error) {
        next(error);
    }
}