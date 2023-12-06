import { signInValid, signUpValid } from "../validations/authValid"
import user from "./../models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_CODE } = process.env;


export const register = async (req, res) => {
    try {

        const { error } = signUpValid.validate(req.body, {abortEarly: false});

        if(error) {
            const errors = error.details.map(err => err.message);
            return res.status(404).json({
                message: errors,
            })
        }

        const checkEmail = await user.findOne({ email: req.body.email});

        if(checkEmail){
            return res.status(404).json({
                message: "Email is existing!",
            })
        }

        const hashPassword = await bcryptjs.hash(req.body.password, 10);

        if(!hashPassword) {
            return res.status(404).json({
                message: "Hash password failed!",
            })
        }

        req.body.password = undefined;

        const data = await user.create({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })

        if(!data){
            return res.status(404).json({
                message: "Register failed!",
            })
        }

        return res.status(200).json({
            message: 'Register successfully',
            data: {
                email: data.email,
                username: data.username,
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server error",
        })
    }
}

export const login = async (req, res) => {
    try {

        const { error } = signInValid.validate(req.body, {abortEarly: false});

        if(error) {
            const errors = error.details.map(err => err.message);
            return res.status(404).json({
                message: errors,
                name: "Body is required!",
            })
        }

        const checkEmail = await user.findOne({ email: req.body.email});

        if(!checkEmail){
            return res.status(404).json({
                message: "Email is not registered",
            })
        }

        const checkPassword = await bcryptjs.compare(req.body.password, checkEmail.password);

        if(!checkPassword) {
            return res.status(404).json({
                message: "Password is not correct!",
            })
        }

        const accessToken = jwt.sign({id: checkEmail._id}, SECRET_CODE, { expiresIn: "1d"});

        if(!accessToken){
            return res.status(404).json({
                message: "Create token failed!",
            })
        }

        return res.status(200).json({
            message: 'Login successfully',
            token: accessToken,
            data: {
                email: checkEmail.email,
                username: checkEmail.username,
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server error",
        })
    }
}