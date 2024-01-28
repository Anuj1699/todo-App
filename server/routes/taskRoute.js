import express from "express";
import { addTask, updateTask, deleteTask } from './../controllers/taskController.js';

const router = express.Router();

router.post("/addTask", addTask);
router.patch("/updateTask/:id", updateTask);
router.delete("/deleteTask/:id", deleteTask);

export default router; 