import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import router from "./routes/tasks.js";
import customError from "./errors/CustomError.js";
import errorHandler from "./middlewares/ErrorHandler.js";
dotenv.config()
const app=express()
app.use(express.json())
app.use(router)
app.all('*',(req,res,next)=>{
    const err=new customError(`Can't find ${req.originalUrl} on this Server`,404)
    next(err)
})
const databaseString=process.env.MONGODB_URL
const port=process.env.PORT
mongoose.connect(databaseString)
.then(()=>{
    console.log("database connected")
    app.listen(port,()=>{
        console.log(`server running on port ${port}`)
    })
})
.catch((error)=>{
    console.log(error.message)
})

app.use(errorHandler)