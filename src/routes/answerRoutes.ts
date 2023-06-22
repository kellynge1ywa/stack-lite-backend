import { Router } from "express";
import { addAnswer, getAllAnswers, getOneAnswer } from "../controllers/answersController";
import { tokenVerify } from "../middlewares/tokenVerification";


const answerRoutes=Router()
answerRoutes.post('',tokenVerify,addAnswer)
answerRoutes.get('/all',tokenVerify,getAllAnswers)
answerRoutes.get('/:Answer_id',tokenVerify,getOneAnswer)



export default answerRoutes