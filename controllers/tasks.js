import taskModel from "../models/tasks.js";
import moment from "moment"
import asyncWrapper from "../middlewares/async.js";
import customError from "../errors/CustomError.js";
import {validationResult} from "express-validator";
const allControllers = {
    updateTask: asyncWrapper(async (req, res, next) => {
        const error=validationResult(req)
        const err=new customError(error.array()[0].msg,400)
        if(!error.isEmpty()){
           return  next(err)
        }
        const update = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!update) {
            const error = new customError("Not Found", 404)
            return next(error)
        }
        //setting status
        var startDate = moment(update.startDate)
        var endDate = moment(update.endDate)
        if (startDate.isAfter(endDate)) {
            return res.status(400).json({ msg: "endDate must be after startDate" })
        }
        if (!update.completedDate) {
            if (moment().add(24, 'hours').isAfter(endDate)) {
                update.status = "Over-due"
            }
            if (moment().isAfter(endDate)) {
                update.status = "Late"
            }
            if (moment().isAfter(startDate) && moment().isBetween(startDate, endDate)) {
                update.status = "In-progress"

            }

        }
        var completedDate = moment(update.completedDate)

        if (update.completedDate) {
            update.status = "Completed"
            //Updating Duration and Duration Type
            var differenceInMilliseconds = completedDate.diff(startDate)
            var differenceInSeconds = Math.round(differenceInMilliseconds / 1000)
            var minutes = Math.round(differenceInSeconds / 60)
            var hours = Math.round(minutes / 60)
            var days = Math.round(hours / 24)
            if (differenceInSeconds < 60) {
                update.duration = differenceInSeconds
                update.durationType = "seconds"
            }
            else if (differenceInSeconds >= 60 && differenceInSeconds < 3600) {
                update.duration = minutes
                update.durationType = "minutes"
            }
            else if (differenceInSeconds >= 3600 && differenceInSeconds < 86400) {
                update.duration = hours
                update.durationType = "hours"
            }
            else {
                update.duration = days
                update.durationType = "days"
            }

        }
        res.status(200).json({ updatedTask: update })
    }),

    //creating new task
    createTask: asyncWrapper(async (req, res,next) => {
               const error=validationResult(req)
               const err=new customError(error.array()[0].msg,400)
               if(!error.isEmpty()){
               return next(err)
               }
        const newTask = await taskModel.create(req.body)
        res.status(201).json({ task: newTask })
    }),
    //setting endtime and startime
    setTime: async (req, res, next) => {
        var startTime = new Date(req.body.startDate).toLocaleTimeString()
        var endTime = new Date(req.body.endDate).toLocaleTimeString()
        if (req.body.startDate) {
            req.body.startTime = startTime
        }
        if (req.body.endDate) {
            req.body.endTime = endTime

        }
        next()
    },
    //getting all tasks
    getTasks: asyncWrapper(async (req, res) => {
        const getAllTasks = await taskModel.find({})
        res.status(200).json({ allTasks: getAllTasks })
    }),
    //updating task

    //get task by id
    getById: asyncWrapper(async (req, res, next) => {
        const id = req.params.id
        const getTask = await taskModel.findById(id)
        if (!getTask) {
            const error = new customError("Not Found", 404)
            return next(error)
        }
        res.status(200).json({ task: getTask })
    }),
    //delete task
    removeTask: asyncWrapper(async (req, res, next) => {
        const removed = await taskModel.findByIdAndDelete(req.params.id)
        if (!removed) {
            const error = new customError("Not Found", 404)
            return next(error)
        }
        res.status(200).json({ msg: `deleted task with id ${req.params.id}` })

    }),

    // marking task completedDate and time 
    complete: async (req, res, next) => {
        var completeTime = new Date(req.body.completedDate).toLocaleTimeString()
        if (req.body.completedDate) {
            req.body.completedTime = completeTime
        }
        next()
    },
}
export default allControllers