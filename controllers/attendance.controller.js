import Attendance from '../models/Attendance.model.js'

export const makeAttendance = async(req,res)=>{
    try {
        const attendance = await Attendance.create(req.body)
        return res.status(201).json({message : "Attendance Marked Successfully..",data: attendance})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message})
    }
}

export const getAttendanceById = async(req,res)=>{
    try {
        const {id} = req.params
        const attendance = await Attendance.findById(id);
        
        return res.status(200).json({message : "Attendance by id..",data: attendance})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message})
    }
}

export const getAttendanceByDate = async(req,res)=>{
    try {
        const {date} = req.params;
        const parsedDate = Number(date);
        const attendance =  await Attendance.find({ date: parsedDate })
        return res.status(200).json({message : "Attendance by date..",data: attendance})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message})
    }
}

export const deleteAttendance = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await Attendance.findByIdAndDelete(id);
        return res.status(200).json({success : true , message : 'Attendance Deleted..'})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message})
    }
}