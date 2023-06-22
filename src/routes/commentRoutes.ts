import { Router } from "express";
import { addComment } from "../controllers/commentsController";
import { tokenVerify } from "../middlewares/tokenVerification";


const commentRoutes=Router()
commentRoutes.post('',tokenVerify,addComment)



export default commentRoutes