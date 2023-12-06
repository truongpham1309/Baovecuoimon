import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import user from "./../models/user"

dotenv.config();
const { SECRET_CODE } = process.env
export const checkPermission = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.token.split(" ")[1];

        if(!token) {
            return res.status(404).json({
                message: "You must be logged in!",
            })
        }

        const decoded = jwt.verify(token, SECRET_CODE);
        if(!decoded) {
            return res.status(404).json({
                message: "Token has expired!",
            })
        }

        const checkUser = await user.findById(decoded.id);

        if(!checkUser) {
            return res.status(404).json({
                message: "Token is not correct!",
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server Error",
        })
    }   
}