import express from "express";
import allControllers from "../controllers/tasks.js";
import validateUser from "../middlewares/validation.js";
const router=express.Router()
router.route('/tasks').post( validateUser,allControllers.setTime,allControllers.createTask).get(allControllers.getTasks)
router.route('/tasks/:id').patch(validateUser,allControllers.setTime,allControllers.complete,allControllers.updateTask).get(allControllers.getById).delete(allControllers.removeTask)
export default router