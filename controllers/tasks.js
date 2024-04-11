import taskModel from "../models/tasks.js";
import moment from "moment"
const allControllers = {
    //creating new task
    createTask: async (req, res) => {
        try {
            const newTask = await taskModel.create(req.body)
            res.status(201).json({ task: newTask })
        }
        catch (error) {
            res.status(500).json({ error })
        }
    },
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
    getTasks: async (req, res) => {
        try {
            const getAllTasks = await taskModel.find({})
            res.status(200).json({ allTasks: getAllTasks })
        }
        catch (error) {
            res.status(500).json({ error })
        }
    },
    //updating task
    updateTask: async (req, res) => {
        try {
            const update = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
            if (!update) {
                return res.status(404).json({ message: `no task with id ${req.params.id}` })
            }
            res.status(200).json({ updatedTask: update })
        }
        catch (error) {
            res.status(500).json({ error })
        }
    },
    //get task by id
    getById: async (req, res) => {
        const id = req.params.id
        try {
            const getTask = await taskModel.findById(id)
            if (!getTask) {
                return res.status(404).json({ msg: `no task with id ${req.params.id}` })
            }
            res.status(200).json({ task: getTask })
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    //delete task
    removeTask: async (req, res) => {
        try {
            const removed = await taskModel.findByIdAndDelete(req.params.id)
            if (!removed) {
                return res.status(404).json({ msg: `no task with id ${req.params.id}` })
            }
            res.status(200).json({ msg: `deleted task with id ${req.params.id}` })
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
     // modifying startDate and endDate 
//  modifyDate: async (req, res, next) => {
//     var startDate = new Date(req.body.startDate).toLocaleDateString()
//     var endDate = new Date(req.body.endDate).toLocaleDateString()

//     if (req.body.startDate) {
//         req.body.startDate = startDate
//     }
//     if (req.body.endDate) {
//         req.body.endDate = endDate
//     }
//     next();
// }
    //duration
    setDuration: async (req, res, next) => {
        var startDate = moment(req.body.startDate)
        var endDate = moment(req.body.endDate)
        const differenceInMilliseconds = endDate.diff(startDate);
        var differenceInSeconds =Math.round(differenceInMilliseconds / 1000);
        var minutes = Math.round(differenceInSeconds / 60);
        var hours = Math.round(minutes / 60);
        var days = Math.round(hours / 24);
        if (differenceInSeconds < 60) {
            req.body.duration = differenceInSeconds
            req.body.durationType = "seconds"
        }
        else if (differenceInSeconds >= 60 && differenceInSeconds < 3600) {
            req.body.duration = minutes
            req.body.durationType = "minutes"
        }
        else if (differenceInSeconds >= 3600 && differenceInSeconds < 86400) {
            req.body.duration = hours
            req.body.durationType = "hours"
        }
        else {
            req.body.duration = days
            req.body.durationType = "days"
        }
        next()
    },
// seting completedDate and time 
complete:async(req,res,next)=>{
   var  completeDate=new Date(req.body.completedDate).toLocaleDateString()
   var  completeTime=new Date(req.body.completedDate).toLocaleTimeString()
    if(req.body.completedDate){
req.body.completedDate=completeDate
req.body.completedTime=completeTime
    }
    next()
},
//seting status
setStatus:async(req,res,next)=>{
    const taskId=req.params.id
    const date=await taskModel.findById(taskId)
    var startDate;
    var endDate;
    var completedDate;
    var duration;
    var durationType;
if(req.body.completedDate ){
 var startDate=moment(date.startDate)
 var endDate=moment(date.endDate)
 var completedDate=moment(req.body.completedDate)
 var today=moment()
 var differenceWithToday=today.diff(endDate)
  var differenceWithTodayinHours=Math.round(((differenceWithToday/1000)/60)/60)
var differenceInMilliseconds=startDate.diff(endDate)
var differenceInHours=Math.round(((differenceInMilliseconds/1000)/60)/60)
if(completedDate<startDate){
    throw new Error("completed date can not be great than startdate")
}
}
if(!req.body.completedDate){
    if(differenceWithTodayinHours>24){
        req.body.status="Over-due"
    }
    if(endDate>today && differenceWithTodayinHours<24){
        req.body.status="Late"
    }
}

next()
}
}
export default allControllers