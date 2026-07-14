import Faculty from '../models/Faculty.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const register = async(req,res)=>{
    try {
        const {name ,email ,password} = req.body;

        if(!name || !email || !password ){
            return res.status(400).json({message : "Please enter the data of required fields!!"})
        }

        const existUser = await Faculty.findOne({email});

        if(existUser){
            return res.status(400).json({message : "User Already exists!!"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt)

        const user = await Faculty.create({...req.body, password : hashpassword});
        return res.status(201).json({message : "User Created Successfully.."})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message})
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "Enter your details in the fields!!"})
        }

        const user = await Faculty.findOne({email});

        if(!user) 
            return res.status(404).json({message : "User not Found!!"})

        const isValid = await bcrypt.compare(password,user.password)

        if(!isValid)
            return res.status(400).json({message : "Invalid Password"})
            
        const payload = {
            id: user.id,
            name: user.name,
            role: user.role
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : '1h'})

        return res.status(200).json({message : "User Login Successfully..", token, user: payload})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message})
    }
}

export const getAllFaculty = async(req,res)=>{
    try {
        const data = await Faculty.find({})
        return res.status(200).json({success : true , message : 'Get All Data..',data})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message})
    }
}

export const updateFaculty = async(req,res)=>{
    try {
        const {id} = req.params;

        const data = await Faculty.findByIdAndUpdate(id,req.body,{new : true});
        return res.status(200).json({success : true , message : 'User Data is Updated..',data})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message})
    }
}

export const deleteFaculty = async(req,res)=>{
    try {
        const {id} = req.params;

        const data = await Faculty.findByIdAndDelete(id);
        return res.status(200).json({success : true , message : 'User Data is Deleted..' })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message})
    }
}
