import { Router } from "express";
import { deleteAttendance, getAttendanceByDate, getAttendanceById, makeAttendance } from "../controllers/attendance.controller.js"

const attendanceRouter = Router();

attendanceRouter.post('/make',makeAttendance)
attendanceRouter.get('/get-by-id/:id',getAttendanceById)
attendanceRouter.get('/get-by-date/:date',getAttendanceByDate)
attendanceRouter.delete('/delete/:id',deleteAttendance)


export default attendanceRouter;