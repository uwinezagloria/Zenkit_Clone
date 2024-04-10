
import mongoose from "mongoose"

const taskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name of task is required"]
    },
description:{
    type:String,
    required:[true,"add describition to  your task"]
},
startDate:{
    type:String,
    required:[true,"startdate is required"]
},
startTime:{
    type:String
},
endDate:{
    type:String,
    require:[true,"endDate is required"]
},
endTime:{
    type:String
},
status:{
    type:String,
    enum:["Todo","Over-due","Completed","In-progress","Late"],
    default:"Todo"
},
duration:{
    type:String,
},
durationType:{
    type:String,
    enum:["hours","days","minutes","seconds"],
}


})
const taskModel=mongoose.model("todo",taskSchema)
export default taskModel