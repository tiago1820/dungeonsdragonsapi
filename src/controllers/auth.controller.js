import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants/index.js";
import { User } from "../db.js";

export class AuthController {
    generateToken = (user) => {
        return jwt.sign({ user: user }, JWT_SECRET_KEY);
    }

    registerUser = async (req, res) => {
        let data = {};
        try {
            const { userName, email, password } = req.body;
            let existUser = await User.findOne({ where: { email } });
            if (existUser) {
                data = { error: `There is already a user with the email ${email}` };
                return res.status(400).json(data);
            }
            const user = await User.create({ userName, email, password });
            const token = this.generateToken(user);
            data = { token, isAuth: true, message: "Successfully registered." };
            res.status(201).json(data);
        } catch (error) {
            data = { error: "Internal server error." };
            return res.status(400).json(data);
        }
    }
}