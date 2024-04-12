import express from "express";
import allControllers from "../controllers/tasks.js";
const router=express.Router()
router.route('/tasks').post(allControllers.setTime,allControllers.createTask).get(allControllers.getTasks)
router.route('/tasks/:id').patch(allControllers.setTime,allControllers.complete,allControllers.updateTask).get(allControllers.getById).delete(allControllers.removeTask)
export default router