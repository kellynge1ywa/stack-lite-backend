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
        Comment_id:string
        User_id:string
        Answer_id:string
        Comments:string
    }
    info?:codedData
    params:{
        Comment_id:string
       }
}
interface comments{
    Comment_id: string
    User_id:string
    Answer_id:string
    Comments:string
    Deleted:number
}

//add comments
export const addComment=async (req:ExtendedRequest,res:Response)=>{
    try {
        const pool=await mssql.connect(sqlConfig)

        const Comment_id=uid()

        const{Answer_id,Comments}=req.body

        await pool.request()
        .input('Comment_id',Comment_id)
        .input('Answer_id',Answer_id)
        .input('User_id',req.info?.User_id)
        .input('Comments',Comments)
        .execute('commentsProcedure')

        return res.status(201).json({message:"You have commented to the selected answer"})
        
    } catch (error) {
        
    }
}


//get all comments

export const getAllComments:RequestHandler=async (req,res)=>{
    try {
        const pool=await mssql.connect(sqlConfig)

        let comment:comments[]=await(await pool.request().execute('getAllComments')).recordset
        return res.status(200).json(comment)
        
    } catch (error:any) {
        return res.status(500).json(error.message) 

        
    }
}
