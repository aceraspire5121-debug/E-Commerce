
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";
import { User } from "../models/userModel.js";
export const registerUser=async (req,res)=>{
    try{
 const {name,email,phoneNumber,password}=req.body;
 if(!name || !email || !phoneNumber || !password){
   return res.status(400).json({success:false,message:"All fields are required"})
}
 const userExist=await User.findOne({$or:[{email},{phoneNumber}]})
 if(userExist)
    return res.status(400).json({success:false,message:"User already exist"})
const hashedPassword=await bcrypt.hash(password,10)
const newUser=await User.create({name,email,phoneNumber,password:hashedPassword})
newUser.password=undefined
res.status(201).json({success:true,message:"Account successfully created",newUser})
    }catch(error)
    {
        res.status(500).json({success:false,message:error.message})
    }
}
export const loginUser=async (req,res)=>{
    try{
 const {email,password}=req.body;
 if(!email || !password)
   return res.status(400).json({success:false,message:"All fields are required"})
const userExist=await User.findOne({email})
if(!userExist)
   return res.status(400).json({success:false,message:"No Account found"})
const checkedPassword=await bcrypt.compare(password,userExist.password)
if(!checkedPassword)
  return res.status(400).json({success:false,message:"Password is incorrect"})
const token=jwt.sign({id:userExist._id,role:userExist.role},process.env.JWT_SECRET,{expiresIn:"1d"})
res.status(200).json({success:true,token,user:{
      id:userExist._id,
      name:userExist.name,
      email:userExist.email,
      role:userExist.role
   }})
    }catch(error)
    {
        res.status(500).json({success:false,message:error.message})
    }
}