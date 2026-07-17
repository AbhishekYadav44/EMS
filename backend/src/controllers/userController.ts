import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";



export const register = async ( req: Request, res: Response) => {

    try {

        const { name,  email,  password,  phone,  department,  designation, salary,role} = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            department,
            designation,
            salary,
            role
        });


        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });


    } catch(error) {

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Server error"
        });

    }

};




export const login = async (req: Request, res: Response) => {

    try {
        const { email, password} = req.body;

        const user = await User.findOne({email})


        if(!user){

            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );


        if(!isMatch){

            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            });

        }

        const token = jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn:"7d"
            }
        );


        return res.status(200).json({
            success:true,
            message:"Login successful",

            token,

            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }

        });


    } catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Server error"
        });

    }

};