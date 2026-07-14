import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type : String,
        enum: ['Faculty','Student'],
        default : 'Student'
    }
});

const Faculty = mongoose.model('Faculty',facultySchema)

export default Faculty;