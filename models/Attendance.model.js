import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum:['Present','Absent'],
        default: 'Absent',
        required: true
    },
    date:{
        type: Number,
        required: true
    }

},{
    timestamps : true
});

const Attendance = mongoose.model('Attendance',attendanceSchema)

export default Attendance;