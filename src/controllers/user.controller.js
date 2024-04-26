import { User } from "../db.js";

export class UserController {

    findCurrentUser = async (req, res) => {
        let data = {};
        try {
            const userId = await req.user.user.id;
            const currentUser = await User.findByPk(userId, {
                attributes: { exclude: ["password"] },
                raw: true
            });
            data = { currentUser }
            return res.status(200).json(data);
        } catch (error) {
            data["error"] = "Internal Server Error";
            return res.status(500).json(data);
        }
    }
}