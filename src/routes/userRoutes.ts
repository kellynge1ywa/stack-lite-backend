import { Router } from "express";
import { deleteUser, displayAllUsers, displayOneUser, displayOneUserById, loginUser, regUser, UpdateUser } from "../controllers/userControllers";

const userRoutes=Router()

userRoutes.post('', regUser)
userRoutes.post('/login', loginUser)
userRoutes.get('',displayAllUsers)
userRoutes.get('/:Email', displayOneUser)
userRoutes.get('/one/:User_id', displayOneUserById)
userRoutes.put('/:User_id', UpdateUser)
userRoutes.delete('/:User_id',deleteUser)




export default userRoutes;




// http://localhost:5500/user