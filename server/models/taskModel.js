import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["TODO", "IN PROGRESS", "COMPLETED"],
        default: "TODO"
    }
},{timestamps: true});

const taskModel = mongoose.model("task", taskSchema);

export default taskModel;