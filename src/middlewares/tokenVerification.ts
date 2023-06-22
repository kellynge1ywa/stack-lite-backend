import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.resolve(__dirname,'../../.env')})

interface codedData{
    User_id:string
    Fullname:string,
    Email:string,
    Username:string,
}
interface ExtendedRequest extends Request{
    info?:codedData
}


export const tokenVerify=(req:ExtendedRequest,res:Response,next:NextFunction)=>{
    try {
        const token=req.headers['token'] as string

        //if no token is provided
        if(!token){
            return res.status(401).json({message:'Unauthorized'})
        }

        //when token is provided: ensure token is valid and  not expired
        const decodedData=jwt.verify(token,process.env.SECRET_KEY as string) as codedData
        req.info=decodedData
        
    } catch (error:any) {
        return res.status(403).json({message:error.message})
        
    }

    next()

}