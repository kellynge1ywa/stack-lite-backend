import { Router } from "express";
import { addQuestion, deleteQuestion, getAllQuestion, getOneQuestion, updateQuestion } from "../controllers/questionsController";
import { tokenVerify } from "../middlewares/tokenVerification";


const question_routes=Router()
question_routes.post('',tokenVerify,addQuestion)
question_routes.get('/all',tokenVerify,getAllQuestion)
question_routes.get('/:Question_id',tokenVerify,getOneQuestion)
question_routes.put('/:Question_id',tokenVerify,updateQuestion)
question_routes.delete('/:Question_id',tokenVerify,deleteQuestion)



export default question_routes