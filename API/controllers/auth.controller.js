import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) =>{
    const {email, password} = req.body;
    // console.log(email,password)
    try{
        const validUser = await User.findOne({email});
        if (!validUser)
            return next(errorHandler(404,'User not found!'));
        // const validPassword = (password,validUser.password)
        const validPassword = password === validUser.password
        if (!validPassword)
            return next(errorHandler(401, 'Wrong Credentials!'))
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET)
        const {password:pass, ...rest} = validUser._doc; 
        res
            // .cookie ('access_token',token,{httpOnly:true,expires: new Date(Date.now() + 60*60*1000)}
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    }catch(error)
    {
        next(error)
    }
}