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

    editUser = async (req, res) => {
        let data = {};
        try {
            const userId = req.params.id;
            const updatedUser = await User.findOne({ where: { id: userId } });
            if (!updatedUser) {
                data["error"] = "User not found."
                return res.status(404).json(data);
            }
            await updatedUser.update(req.body);
            await updatedUser.reload();
            const formatedUser = {
                id: updatedUser.id,
                userName: updatedUser.userName,
                profileImage: updatedUser.profileImage,
                email: updatedUser.email,
                mobile: updatedUser.mobile,
            }
            data = { user: formatedUser };
            return res.status(200).json(data);
        } catch (error) {
            data["error"] = 'Internal Server Error';
            return res.status(500).json(data);
        }
    }

    deleteUser = async (req, res) => {
        let data = {};
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);
            if (!user) {
                data["error"] = "User not found."
                return res.status(404).json(data);
            }
            if (!await user.destroy()) {
                data["error"] = `"Error deleting the user ${user.userName}."`
                return res.status(404).json(data);
            }
            data["message"] = `User ${user.userName} successfully deleted.`
            return res.status(200).json(data);
        } catch (error) {
            data["error"] = 'Internal Server Error';
            return res.status(500).json(data);
        }
    }
}