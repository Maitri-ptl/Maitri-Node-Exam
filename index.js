import express from "express";
import 'dotenv/config';
import db from './configs/database.js'
import facultyRouter from "./routes/faculty.route.js";
import attendanceRouter from "./routes/attendance.route.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/faculty', facultyRouter)
app.use('/api/attendance', attendanceRouter)

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Started..");
        console.log(`http://localhost:${port}`);
    }
})
