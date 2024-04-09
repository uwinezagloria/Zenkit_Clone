import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import router from "./routes/tasks.js";
dotenv.config()
const app=express()
app.use(express.json())
app.use(router)
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
    console.log(error)
})
// const startDate = new Date("2024-03-19T13:56:00.767Z");
// const endDate = new Date("2024-04-09T12:56:00.767Z");

// const differenceInMilliseconds = endDate - startDate;
// console.log(differenceInMilliseconds/1000)

console.log()
