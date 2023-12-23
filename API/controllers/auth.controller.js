import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const signup = async (req,res, next)=>{
    // console.log(req.body);
    const {username, email, password} = req.body;
    const newUser = new User ({ username, email, password});
    try{
        await newUser.save()
        console.log(req.body);
        res.status(201).json('User Created Success')
    }catch(error){
        next(errorHandler(550, 'error from the function'))
    }
};