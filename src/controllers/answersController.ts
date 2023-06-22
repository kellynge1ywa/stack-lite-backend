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
        Answer_id:string
        User_id:string
        Question_id:string
        Answers:string
    }
    info?:codedData
    params:{
        Answer_id:string
       }
}
interface answers{
    Answer_id: string
    User_id:string
    Question_id:string
    Answers:string
    Deleted:number
}

//add answer
export const addAnswer=async(req:ExtendedRequest,res:Response)=>{
    try {
        const Answer_id=uid()

        const pool=await mssql.connect(sqlConfig)

        const{Question_id,Answers}=req.body

        await pool.request()
        .input('Answer_id',Answer_id)
        .input('User_id',req.info?.User_id)
        .input('Question_id',Question_id)
        .input('Answers',Answers)
        .execute('answersProcedure')

        return res.status(200).json({message:"You've answered the selected question"})
        
    } catch (error:any) {
        return res.status(500).json(error.message) 

        
    }
}


//get all answers

export const getAllAnswers:RequestHandler=async (req,res)=>{
    try {
        const pool=await mssql.connect(sqlConfig)

        let answer:answers[]=await(await pool.request().execute('getAllAnswers')).recordset
        return res.status(200).json(answer)
        
    } catch (error:any) {
        return res.status(500).json(error.message) 

        
    }
}

//get one answer
export const getOneAnswer:RequestHandler<{Answer_id:string}>=async(req,res)=>{
    try {
        const {Answer_id}=req.params
        const pool=await mssql.connect(sqlConfig)
        let answer:answers=await((await pool.request()
        .input('Answer_id',Answer_id)
        
        .execute('getOneAnswer')).recordset[0])

        if(!answer){
            return res.status(404).json({message:"Answer not found"}) 
        }

        return res.status(201).json(answer)
        
    } catch (error:any) {
        return res.status(500).json(error.message) 

        
    }
}
