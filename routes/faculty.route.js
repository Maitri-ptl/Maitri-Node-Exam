import { Router } from "express";
import { deleteFaculty, getAllFaculty, login, register, updateFaculty } from "../controllers/faculty.controller.js"
import { facultyAuth, verifyToken, verifyUser } from "../middlewares/auth.middleware.js";

const facultyRouter = Router();

facultyRouter.post('/register',register)
facultyRouter.post('/login',login)
facultyRouter.get('/get-all',verifyToken,facultyAuth,getAllFaculty)
facultyRouter.patch('/update/:id',verifyToken,verifyUser,updateFaculty)
facultyRouter.delete('/delete/:id',verifyToken,verifyUser,deleteFaculty)


export default facultyRouter;