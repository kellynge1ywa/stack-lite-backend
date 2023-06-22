import {Request,RequestHandler,Response} from "express"
import mssql from 'mssql'
import {sqlConfig} from "../config";
import {v4 as uid} from 'uuid'

interface codedData{
    User_id:string
    Fullname:string,
    Email:string,
    Username:string,
}

interface ExtendedRequest extends Request{
    body:{
        Question:string
        User_id:string
        Tags:string
        Body:string
    }
    info?:codedData
    params:{
        Question_id:string
       }
}
interface questions{
    Question_id: string
    User_id:string
    Question:string
    Tags:string
    Body:string
    Deleted:number
}

//add questions

export const addQuestion=async (req:ExtendedRequest,res:Response)=>{
    try {
        let Question_id=uid()

        const pool=await mssql.connect(sqlConfig)

        const {Question,Tags,Body}=req.body

        await pool.request()
        .input('Question_id',Question_id)
        .input('Question',Question)
        .input('User_id',req.info?.User_id)
        .input('Tags',Tags)
        .input('Body',Body)
        .execute('questionsUser')

        return res.status(201).json({message:'Question added successfully'})
        
    } catch (error:any) {
        return res.status(500).json(error.message) 
    }
}



//get all questions

export const getAllQuestion:RequestHandler=async (req,res)=>{
    try {
        const pool=await mssql.connect(sqlConfig)

        let question:questions[]=await(await pool.request().execute('getAllQuestions')).recordset
        return res.status(200).json(question)
        
    } catch (error:any) {
        return res.status(500).json(error.message) 

        
    }
}

//get one question
export const getOneQuestion:RequestHandler<{Question_id:string}>=async(req,res)=>{
    try {
        const {Question_id}=req.params
        const pool=await mssql.connect(sqlConfig)
        let question:questions=await((await pool.request()
        .input('Question_id',Question_id)
        
        .execute('getOneQuestion')).recordset[0])

        if(!question){
            return res.status(404).json({message:"Question not found"}) 
        }

        return res.status(201).json(question)
        
    } catch (error:any) {
        return res.status(500).json(error.message) 

        
    }
}

//update question
export const updateQuestion=async(req:ExtendedRequest,res:Response)=>{
    try {
        const {Question_id}=req.params
        const pool=await mssql.connect(sqlConfig)

        const {Question,Tags,Body}=req.body

        let question:questions=await((await pool.request()
        .input('Question_id',Question_id)
        .execute('getOneQuestion')).recordset[0])
        if(!question){
            return res.status(404).json({message:"User not found"})
        }
        await pool.request()
        .input('Question_id',Question_id)
        .input('Question',Question)
        .input('User_id',req.info?.User_id)
        .input('Tags',Tags)
        .input('Body',Body)

        .execute('UpdateQuestion')

        return res.status(201).json({message:'Question updated successfully'})
        
    } catch (error:any) {
        return res.status(500).json(error.message) 

        
    }
}

//Delete question

export const deleteQuestion:RequestHandler<{Question_id:string}>=async(req,res)=>{
    try {
        const {Question_id}=req.params
        const pool=await mssql.connect(sqlConfig)
        let question:questions=await((await pool.request()
        .input('Question_id',Question_id)
        
        .execute('getOneQuestion')).recordset[0])

        if(!question){
            return res.status(404).json({message:"Question not found"}) 
        }
        await pool.request()
        .input('Question_id',Question_id)
        .execute('delete_question')

        return res.status(201).json({message:"Selected question was successfully deleted"})
        
    } catch (error:any) {
        return res.status(500).json(error.message) 

        
    }
}