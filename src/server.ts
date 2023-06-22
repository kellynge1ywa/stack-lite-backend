// const express=require('express')

import express, { json } from 'express';

import userRoutes from './routes/userRoutes';
import question_routes from './routes/questionRoutes';
import answerRoutes from './routes/answerRoutes';
import commentRoutes from './routes/commentRoutes';


const app=express()
app.use(json())

app.use('/users',userRoutes)
app.use('/questions',question_routes)
app.use('/answers',answerRoutes)
app.use('/comments',commentRoutes)



app.listen(5500,()=>{
    console.log("Server running...");
})

module.exports=app