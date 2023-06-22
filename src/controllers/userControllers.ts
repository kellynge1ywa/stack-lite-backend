import { Request, RequestHandler, Response } from "express";
import mssql from 'mssql';
import { sqlConfig } from "../config";
import{v4 as uid} from 'uuid'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { userRegistrationSchema } from "../helpers/adminValidations";
import path from 'path'

dotenv.config({path:path.resolve(__dirname,'../../.env')})
import jwt from 'jsonwebtoken'

interface ExtendedRequest extends Request{
    body:{
        Fullname:string,
        Email:string,
        Username:string,
        User_password:string,
        Confirm_password:string
    }
    params:{
    User_id:string


    }
}

interface Users{
    User_id:string
    Fullname:string,
    Email:string,
    Username:string,
    User_password:string,
    Confirm_password:string,
    User_role:string,
    Email_sent:number,
    Reset_password:number,
    Deleted:number
}



export const regUser=async (req:ExtendedRequest,res:Response)=>{
    try {
       

        const {Fullname, Email,Username,User_password}=req.body
        // // console.log(req.body)

        const {error}=userRegistrationSchema.validate(req.body)

        if(error){
            return res.status(404).json(error.details[0].message)
        }

         //generate random ids
         let UserId=uid()
        //password encryption
        let userPassword=await bcrypt.hash(User_password,10)
        
        //database connection
        const pool=await mssql.connect(sqlConfig)

        //request
        await pool.request()
        .input('User_id',UserId)
        .input('Fullname',Fullname)
        .input('Email',Email)
        .input('Username',Username)
        .input('User_password',userPassword)
        // .input('Confirm_password',Confirm_password)

        .execute('registerUser')

        return res.status(201).json({message:"Registration successfully"})

    } catch (error:any) {
        //error
        return res.status(500).json(error.message)
        
    }
}

//display all users

export const displayAllUsers:RequestHandler=async (req,res)=>{
    try {
        const pool=await mssql.connect(sqlConfig)
        // await pool.request().query('SELECT * FROM users.user_table')
        let user:Users[]= await((await pool.request().execute('GetAllUser')).recordset)
        return res.status(200).json(user)
        
    } catch (error:any) {
        return res.status(500).json(error.message)

        
    }
}

//display one user by email

export const displayOneUser:RequestHandler<{Email:string}>=async(req,res)=>{
    try {
        const {Email}=req.params
        const pool=await mssql.connect(sqlConfig)

        let user:Users=await((await pool.request()
        .input('Email',Email)
        .execute('GetUserByEmail')).recordset[0])

        if(user){
            return res.status(200).json(user)
        }

        return res.status(404).json({message:"User not found"})

        
    } catch (error:any) {
        return res.status(500).json(error.message)

        
    }
}

//display one user by id

export const displayOneUserById:RequestHandler<{User_id:string}>=async(req,res)=>{
    try {
        const {User_id}=req.params
        const pool=await mssql.connect(sqlConfig)

        let user:Users=await((await pool.request()
        .input('User_id',User_id)
        .execute('GetUserById')).recordset[0])

        if(user){
            return res.status(200).json(user)
        }

        return res.status(404).json({message:"User not found"})

        
    } catch (error:any) {
        return res.status(500).json(error.message)

        
    }
}


//update user

export const UpdateUser=async (req:ExtendedRequest,res:Response)=>{
    try {
        const {Fullname,Email,Username,User_password}=req.body
        let userPassword=await bcrypt.hash(User_password,10)

        const {User_id}=req.params
        // let UserId=uid()



        const pool=await mssql.connect(sqlConfig)
        let user:Users=await((await pool.request()
        .input('User_id',User_id)
        .execute('GetUserById')).recordset[0])

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        await pool.request()
        .input('User_id',User_id)
        .input('Fullname',Fullname)
        .input('Email',Email)
        .input('Username',Username)
        .input('User_password',userPassword)
        
        
        .execute('updateUser')

        return res.status(201).json({message:"User updated successful"})

         
        
    } catch (error:any) {
        return res.status(500).json(error.message)

        
    }
}


//delete users

export const deleteUser=async (req:Request<{User_id:string}>,res:Response)=>{
    try {
        const {User_id}=req.params
        const pool=await mssql.connect(sqlConfig)
        let user:Users=await((await pool.request()
        .input('User_id',User_id)
        .execute('GetUserById')).recordset[0])

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        await pool.request()
        .input('User_id',User_id)
        .execute('delete_user')

        return res.status(201).json({message:"User deleted successfully"})
        
    } catch (error:any) {
        return res.status(500).json(error.message)

        
    }
}

//login user endpoint

export const loginUser=async (req:Request,res:Response)=>{
    try {

        const pool=await mssql.connect(sqlConfig)

        const{Email,userPassword}=req.body
        let user:Users[]=await((await pool.request()
        .input('Email',Email)
        .execute('GetUserByEmail')).recordset)

        if(!user[0]){
            return res.status(404).json({message:"User not found"})

        }

        let validPassword=bcrypt.compare(userPassword,user[0].User_password)
        if(!validPassword){
            return res.status(404).json({message:"Enter correct password"})
        }

        //Generate payload
        const payload=user.map(userl=>{
            const{User_password,Confirm_password,Deleted,Reset_password,Email_sent,User_role,...rest}=userl
            return rest
        })

        //token verification
        const token=jwt.sign(payload[0],process.env.SECRET_KEY as string,{expiresIn:'3600s'})


        return res.json({message:"You've successfully logged in",token})
        
    } catch (error:any) {
        return res.status(500).json(error.message)

        
    }
}